const express = require('express');
const Usuario = require('../models/usuario_model');
const Joi = require('@hapi/joi');
const ruta = express.Router();

ruta.get('/', (req, res) => {
    res.json('Respuesta a petición GET de USUARIOS funcionando correctamente...');
});

// Validaciones para el objeto usuario
const updateSchema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóú ]{3,30}$/),

    password: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
        
});

// Validación para el email en la URL
const emailSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
        .required()
});

// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password
    });
    return await usuario.save();
}

// Endpoint de tipo POST para el recurso USUARIOS
ruta.post('/', async (req, res) => {
    let body = req.body;

    const { error, value } = schema.validate(body);
    if (!error) {
        try {
            let user = await crearUsuario(body);
            res.json({
                valor: user
            });
        } catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    } else {
        res.status(400).json({
            error: error.details[0].message
        });
    }
});


// Función asíncrona para actualizar un usuario
async function actualizarUsuario(email, body) {
    let usuario = await Usuario.findOneAndUpdate(
        { email: email },
        {
            $set: {
                nombre: body.nombre,
                password: body.password
            }
        },
        { new: true } // Retorna el documento actualizado
    );
    return usuario;
}

// Endpoint de tipo PUT para actualizar los datos del usuario
ruta.put('/:email', async (req, res) => {
    const { error: emailError } = emailSchema.validate({ email: req.params.email });
    if (emailError) {
        return res.status(400).json({
            error: emailError.details[0].message
        });
    }

    const { error, value } = updateSchema.validate({ 
        nombre: req.body.nombre,
        password: req.body.password
    });

    if (!error) {
        try {
            let resultado = await actualizarUsuario(req.params.email, req.body);
            if (!resultado) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json({ valor: resultado });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    } else {
        res.status(400).json({
            error: error.details[0].message
        });
    }
});



module.exports = ruta;
