const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/database');

const Actor = sequelize.define('Actor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Actores', 
    timestamps: false
});

module.exports = Actor;
