import express, { response } from 'express';
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-to-minutes';
import { convertMinutesToHoursString } from './utils/convert-minutes-to-hours-string';
import cors from 'cors';

const app = express();

//informando ao express que vamos usar o formato json
app.use(express.json());
//depois passar o host do front para só ele conectar
app.use(cors());

// dentro do prisma possa passa parametro de conf como o log
const prisma = new PrismaClient({
    log:['query']
});

app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads:true
                }
            }
        }
    });
    return response.json(games); 
});


app.get('/games/:id/ads', async(request, response) => {
    const gameId = request.params.id;
    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            yearsPlaying: true,       
            weekDays: true,
            hourStart: true,
            hourEnd: true,
            useVoiceChannel: true,           
        },
        where: {
            gameId:gameId,
        },
        orderBy:{
            createdAt: 'desc',
        }
    })
    return response.json(ads.map(ad => {
        return {    
            //retorna os dados da msma forma mas eu faço um spredOperator no objeto e substituo uma info nesse objeto
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd),
        }
    }));
});

app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
           discord:true 
        },
        where: {
            id: adId,
        }
    });
    return response.json({
        discord: ad.discord,
    })
});

app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;
    
    //Validações
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name:body.name,
            yearsPlaying:body.yearsPlaying,
            discord:body.discord,
            weekDays:body.weekDays.join(','),
            hourStart:convertHourStringToMinutes(body.hourStart),
            hourEnd:convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel:body.useVoiceChannel
        }
    })

    return response.status(201).json([ad]); 
});

app.listen(8888);