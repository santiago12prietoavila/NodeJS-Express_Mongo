const express = require('express');
const cursoController = require('../controllers/cursos'); // Importa el controlador
const router = express.Router(); // Define el enrutador

// Listar todos los cursos activos

/**
 * @swagger
 * /cursos:
 *   get:
 *     summary: Lista todos los cursos activos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       404:
 *         description: No se encontraron cursos activos
 */
router.get('/', cursoController.listarCursosActivos);

// Obtener curso por Id

/**
 * @swagger
 * /cursos/{id}:
 *   get:
 *     summary: Obtiene un curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Detalles del curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso no encontrado
 */
router.get('/:id', cursoController.obtenerCursoPorId);

// Obtener los usuarios para un curso

/**
 * @swagger
 * /cursos/{id}/usuarios:
 *   get:
 *     summary: Obtiene los usuarios registrados en un curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de usuarios inscritos en el curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Curso no encontrado
 */
router.get('/:id/usuarios', cursoController.obtenerUsuariosPorCurso);

// Crear un curso

/**
 * @swagger
 * /cursos:
 *   post:
 *     summary: Crea un nuevo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/', cursoController.crearCurso);

// Crear Colección de Cursos

/**
 * @swagger
 * /cursos/coleccion:
 *   post:
 *     summary: Crea una colección de cursos
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Colección de cursos creada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/coleccion', cursoController.guardarColeccionCursos);

// Actualizar curso

/**
 * @swagger
 * /cursos/{id}:
 *   put:
 *     summary: Actualiza un curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Curso no encontrado
 */
router.put('/:id', cursoController.actualizarCurso);

// Eliminar Curso

/**
 * @swagger
 * /cursos/{id}:
 *   delete:
 *     summary: Desactiva (elimina lógicamente) un curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso desactivado exitosamente
 *       404:
 *         description: Curso no encontrado
 */
router.delete('/:id', cursoController.desactivarCurso);

module.exports = router;
