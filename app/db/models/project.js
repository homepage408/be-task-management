'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // project.hasMany(models.task)
      // project.belongsTo(models.task)
    }
  };
  project.init({
    created_by: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    is_complete: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'project',
    paranoid:true
  });
  return project;
};