const con = require("../database/connection");


function getRoutes(req, res) {
    con.query(`SELECT * FROM tp2_percurso`, (qError, result) => {
        if (!qError) {
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function addRoutes(req, res) {
    let origin = req.sanitize(req.body.origin);
    let destination = req.sanitize(req.body.destination);
    let time = req.sanitize(req.body.time);
    let cost = req.sanitize(req.body.cost);
    let schedule = req.sanitize(req.body.schedule);


    con.query(`INSERT INTO tp2_percurso (origem, destino, custo, tempo, horario) VALUES ('${origin}', '${destination}', '${time}', '${cost}', '${schedule}')`, (qError, result) => {
        if (!qError) {
            console.log("success");
            return res.send(result);
        } else {
            console.log(qError);
        }
    })
}

function getRouteByID(req, res) {
    let id_route = req.sanitize(req.params.id);

    con.query("SELECT * FROM route WHERE id_percurso = ?", id_route, function (qError,
        result) {
        if (!qError) {
            return res.json(result[0]);
        } else
            console.log(qError);
    });
}

function updateRoute(req, res) {
    let id_route = req.sanitize(req.params.id);
    let cost = req.sanitize(req.body.cost);

    con.query("UPDATE tp2_percurso SET custo = ? WHERE id_percurso = ?", [cost, id_route], function (qError,
        result) {
        if (!qError) {
            res.send(result);
        } else
            console.log(qError);
    });
}


function deleteRoute(req, res) {
    let id_route = req.sanitize(req.params.id);
    con.query("DELETE from tp2_percurso WHERE id_percurso = ?", id_route, function (qError,
        result) {
        if (!qError) {
            return res.json(result);
        } else
            console.log(qError);
    });
}

module.exports = {
    getRoutes,
    getRouteByID,
    addRoutes,
    updateRoute,
    deleteRoute
}