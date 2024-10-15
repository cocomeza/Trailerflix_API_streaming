'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /** función es para hacer cambios en la base de datos
     * aca agrego comandos para alterar la base de datos 
     *
     * Ejemplo:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /** función es para deshacer los cambios que hiciste en la función up .
     * aca agrego comandos para deshacer  la cambios hechos en la funcion up
     *
     * Ejemplo:
     * await queryInterface.dropTable('users');
     */
  }
};
