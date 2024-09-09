const express = require('express');
const usuarioController = require('../controllers/usuarios');
const router = express.Router();

// Listar usuarios activos
/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos los usuarios activos
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', usuarioController.listarUsuariosActivos);

// Listar cursos del usuario
/**
 * @swagger
 * /usuarios/{usuarioId}/cursos:
 *   get:
 *     summary: Lista todos los cursos de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de cursos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:usuarioId/cursos', usuarioController.listarCursosDeUsuario);

// Crear un usuario sin cursos
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/', usuarioController.crearUsuario);

// Crear un usuario con cursos
/**
 * @swagger
 * /usuarios/{email}/cursos:
 *   post:
 *     summary: Agrega cursos a un usuario por email
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
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
 *         description: Cursos agregados al usuario exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/:email/cursos', usuarioController.agregarCursosAUsuario);

// Guardar una colección de usuarios
/**
 * @swagger
 * /usuarios/coleccion:
 *   post:
 *     summary: Crea una colección de usuarios
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Colección de usuarios creada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post('/coleccion', usuarioController.guardarColeccionUsuarios);

// Actualizar un usuario
/**
 * @swagger
 * /usuarios/{email}:
 *   put:
 *     summary: Actualiza un usuario por email
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:email', usuarioController.actualizarUsuario);

// Eliminar (desactivar) usuario
/**
 * @swagger
 * /usuarios/{email}:
 *   delete:
 *     summary: Desactiva (elimina lógicamente) un usuario por email
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Usuario desactivado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:email', usuarioController.desactivarUsuario);

module.exports = router;
