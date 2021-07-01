'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Karyawan, {foreignKey: "karyawanEmail"})
    }
  };
  History.init({
    karyawanEmail: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};