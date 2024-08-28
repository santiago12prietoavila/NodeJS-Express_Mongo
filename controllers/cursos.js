const express = require('express');
const logic = require('../logic/curso_logic');
const ruta = express.Router();

/*
ruta.get('/', (req, res) => {
    res.json('Respuesta a peticion GET de CURSOS funcionando correctamente...');

});
*/


// Endpoint de tipo GET para el recurso CURSOS
ruta.get('/', (req, res) => {  // Cambié POST por GET
    let resultado = logic.listarCursosActivos();

    resultado.then(cursos => {
        res.json(cursos);
    }).catch(err => {
        res.status(400).json(err);
    });
});


// Endpoint de tipo POST para el recurso CURSOS
ruta.post('/', (req, res) => {
    let resultado = logic.crearCurso(req.body);

    resultado.then(curso => {
        res.json({ curso });
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
});




// Endpoint de tipo PUT para el recurso CURSOS
ruta.put('/:id', (req, res) => {
    let resultado = logic.actualizarCurso(req.params.id, req.body);  // Aquí debes asegurarte de usar 'logic'

    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    });
});


// Endpoint para desactivar un curso (DELETE)
ruta.delete('/:id', (req, res) => {
    let resultado = logic.desactivarCurso(req.params.id);  // Asegúrate de usar 'logic.desactivarCurso'

    resultado.then(curso => {
        res.json(curso);
    }).catch(err => {
        res.status(400).json(err);
    });
});


module.exports = ruta;