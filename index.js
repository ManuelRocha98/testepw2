const express = require('express');
//para usar o req.body, body parsing
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    /* res.header('Access-Control-Allow-Origin', '*'); */
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

//Queremos JSON
app.use(bodyParser.json());

//Penso não ser necessário o cors, foi inserido na altura ao tentar corrigir um erro não relacionado
/* const cors = require('cors');
app.use(cors()) */

//rotas têm de vir no fim, senão há erros
const routesRouter = require("./routes/routes.router");

app.use(routesRouter);


app.listen(port, () => console.log(`We're live on port ${port}`));