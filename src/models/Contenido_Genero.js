const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');
const Contenido = require('./Contenido');
const Genero = require('./Genero');

const Contenido_Genero = sequelize.define('Contenido_Genero', {
    ContenidoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Contenido, // Referencio al modelo Contenido
            key: 'id'
        },
        field: 'contenido_id' // Nombre de la columna en la base de datos
    },
    GeneroId: {
        type: DataTypes.INTEGER,
        references: {
            model: Genero, // ReferencioS al modelo Genero
            key: 'id'
        },
        field: 'genero_id' // Nombre de la columna en la base de datos
    }
}, {
    tableName: 'Contenido_Genero',
    timestamps: false
});

module.exports = Contenido_Genero;
