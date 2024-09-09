const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Cursos y Usuarios', // Título para la documentación
        version: '1.0.0', // Versión de la API
        description: 'Documentación de la API para la gestión de cursos y usuarios' // Descripción
    },
    servers: [
        {
            url: 'https://localhost:3000/api', // Cambia esto por la URL de tu servidor
            description: 'Servidor de desarrollo'
        }
    ],
    tags: [
        {
            name: 'Cursos',
            description: 'Operaciones relacionadas con los cursos'
        },
        {
            name: 'Usuarios',
            description: 'Operaciones relacionadas con los usuarios'
        }
    ],
    components: {
        schemas: {
            Curso: {
                type: 'object',
                required: ['titulo', 'descripcion', 'estado'],
                properties: {
                    _id: { type: 'string', description: 'ID del curso' },
                    titulo: { type: 'string', description: 'Título del curso' },
                    descripcion: { type: 'string', description: 'Descripción del curso' },
                    estado: { type: 'boolean', description: 'Estado activo o inactivo del curso' },
                    imagen: { type: 'string', description: 'URL de la imagen del curso' },
                    alumnos: { type: 'number', description: 'Número de alumnos inscritos' },
                    calificacion: { type: 'number', description: 'Calificación promedio del curso' }
                },
                example: {
                    _id: '66d05dddb025aa6e32e1654b',
                    titulo: 'Introducción a React.JS',
                    descripcion: 'Curso básico sobre React.JS',
                    estado: true,
                    imagen: 'https://example.com/react.png',
                    alumnos: 20,
                    calificacion: 4.7
                }
            },
            Usuario: {
                type: 'object',
                properties: {
                    _id: { type: 'string', description: 'ID del usuario' },
                    nombre: { type: 'string', description: 'Nombre del usuario' },
                    email: { type: 'string', description: 'Correo electrónico del usuario' },
                    activo: { type: 'boolean', description: 'Estado activo o inactivo del usuario' }
                },
                example: {
                    _id: '1234567890',
                    nombre: 'Juan Perez',
                    email: 'juan.perez@example.com',
                    activo: true
                }
            }
        }
    }
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'] // Ruta a los archivos que contienen anotaciones de Swagger
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = {
    swaggerUi,
    swaggerSpec,
};
