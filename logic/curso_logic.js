const Curso = require('../models/curso_model');
const Joi = require('@hapi/joi');

// Esquema de validación para crear o actualizar un curso
const cursoSchema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[A-Za-z0-9\s]{3,100}$/),
    descripcion: Joi.string()
        .max(500)
        .optional()
        .pattern(/^[A-Za-z0-9\s.,!?]{0,500}$/),
    alumnos: Joi.array()
        .items(Joi.string().email())
        .required(),
    calificacion: Joi.number()
        .min(0)
        .max(10)
        .required()
});


//Funcion asincrona para crear cursos
async function crearCurso(body) {
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });

    return await curso.save();

}


//Funcion asincronica para actulizar cursos
async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, { new: true });
    return curso;
}


// Función para desactivar un curso
async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return curso;
}


//funcion asincrona para listar los cursos activos
async function listarCursosActivos() {
    let cursos = await Curso.find({ "estado": true });
    return cursos;
}


module.exports = {
    cursoSchema,
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
};

