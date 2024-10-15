const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

const Contenido = sequelize.define('Contenido', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    temporadas: {
        type: DataTypes.INTEGER,
        allowNull: true 
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    trailer: {
        type: DataTypes.STRING,
        allowNull: true 
    }
}, {
    tableName: 'Contenidos',
    timestamps: false
});

module.exports = Contenido;
