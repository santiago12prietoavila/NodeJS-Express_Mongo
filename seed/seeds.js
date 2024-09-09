const mongoose = require('mongoose');
const Curso = require('../models/curso_model');
const Usuario = require('../models/usuario_model');

// Semilla de Cursos
const cursosData = [
    {
        titulo: "Introducción a React.JS",
        descripcion: "Curso básico sobre React.JS",
        estado: true,
        imagen: "https://example.com/react.png",
        alumnos: 20,
        calificacion: 4.7
    },
    {
        titulo: "Desarrollo Web con HTML y CSS",
        descripcion: "Curso completo sobre desarrollo web",
        estado: true,
        imagen: "https://example.com/html_css.png",
        alumnos: 15,
        calificacion: 4.8
    },
    {
        titulo: "Node.js desde Cero",
        descripcion: "Curso completo de backend con Node.js",
        estado: true,
        imagen: "https://example.com/nodejs.png",
        alumnos: 30,
        calificacion: 4.9
    }
];

// Semilla de Usuarios
const usuariosData = [
    {
        nombre: "Juan Pérez",
        email: "juan.perez@example.com",
        password: "awfsas392992232",
        estado: true,
        cursos: [] // Inicialmente vacío, pero se puede agregar después
    },
    {
        nombre: "Ana López",
        email: "ana.lopez@example.com",
        password: "awfasdas2222232",
        estado: true,
        cursos: []
    },
    {
        nombre: "Carlos García",
        email: "carlos.garcia@example.com",
        password: "awfaw23232",
        estado: true,
        cursos: []
    }
];

async function seedDatabase() {
    console.log('Iniciando la siembra de datos...');
    try {
        // Crear cursos si no existen
        for (const cursoData of cursosData) {
            const cursoExistente = await Curso.findOne({ titulo: cursoData.titulo });
            console.log(`Buscando curso: ${cursoData.titulo}`);
            if (!cursoExistente) {
                await Curso.create(cursoData);
                console.log(`Curso "${cursoData.titulo}" creado.`);
            } else {
                console.log(`Curso "${cursoData.titulo}" ya existe.`);
            }
        }
        // Crear usuarios si no existen
        for (const usuarioData of usuariosData) {
            const usuarioExistente = await Usuario.findOne({ email: usuarioData.email });
            console.log(`Buscando usuario: ${usuarioData.email}`);
            if (!usuarioExistente) {
                await Usuario.create(usuarioData);
                console.log(`Usuario "${usuarioData.email}" creado.`);
            } else {
                console.log(`Usuario "${usuarioData.email}" ya existe.`);
            }
        }
        console.log('Semillas completadas.');
    } catch (err) {
        console.error('Error al crear semillas:', err);
    }
}


module.exports = seedDatabase;