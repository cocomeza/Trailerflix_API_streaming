const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

const Contenido_Actor = sequelize.define('Contenido_Actor', {
    contenido_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'Contenido',
        key: 'id'
    }
    },
    actor_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'Actores',
        key: 'id'
    }
    }
}, {
    tableName: 'Contenido_Actor',
    timestamps: false
});

module.exports = Contenido_Actor;