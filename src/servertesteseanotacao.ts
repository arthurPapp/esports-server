import express, { response } from 'express';

//criando a api em si
const app = express();

// criando a 1 rota
//no parametro get() 1 parametro se passa o endereço que o usuario vai acessar após a barra do host ex https://www.minhaapi.com/ads
// no 2 parametro passamos a função que o user vai acessar
//a function recebe 2 parametreos request e response, ela precisa devolver algo
// request -> busco dados vindo da requisição
//response -> responde a requisição
//dentro do json posso usar qualquer tipo primitivo
app.get('/ads', (request, response) => {
    // return response.send('Acessou ads!')
    return response.json([
        { id: 1, name: 'anuncio1' },
        { id: 2, name: 'anuncio2' },
        { id: 3, name: 'anuncio3' },
        { id: 4, name: 'anuncio4' }
    ])
});

//passamos a porta para o node diferenciar a porta
//aqui tbm indico que é para a api ficar excultando ate eu pedir que ela pare 

app.listen(8888)


//estudar TypeScript para adicionar ao js(TypeScript e uma linguagem de tipagem estatica)
//vamos usar o typeScript nesse projeto (npm i typescript)
//o node não entende typescript nativamente por isso usamos só como ferramenta de desenvolvimento
//mudo o nome do arquivo para .ts
// ao usar o TypeScript pracisamos usar um arquivo de configuracao para criar esse arquivo usamos o camando npx tsc --init que ira execultar o arquivo tsc
// no arquivo tsconfig.json trocar o module:commonjs por ES2020

//para startar a api rodar npm rum build(caso a pasta build seja apagada) e depois npm run dev

//tsconfig descomentar rootDir e auterar para a pasta onde estão os arquivos de inicio "rootDir": "./src",  e outDir onde ira criar os arquivos de build  "outDir": "./build",


//como o express não e nativo typeScript e preciso instalar o @types/express (sempre verificar na net)


// sempre q eu att o arquivo vai ser preciso reiniciar o node, pra isso instalamos ts-node-dev -D

//no arquivo tsconfig.json voltar o module:commonjs para usar o tsnd src/server.ts


// httpCodes começão com 2 sucesso, 3 redirecionamento , 4 erro gerado pela api, 500 ou derivado erros inesperados


// no arq packge.json usamos --exit-child  para q sempre q restartar att a connexão tbm

//Parametros usado em request
//Query : vem apos ? ex ?page=2 usado para dados não sensiveis
//Route: parametro de url não nomeados ads/5
//Body: dados sensiveis