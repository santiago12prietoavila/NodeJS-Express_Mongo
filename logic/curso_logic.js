const Curso = require('../models/curso_model');


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
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
};

