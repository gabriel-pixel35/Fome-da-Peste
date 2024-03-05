const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: DataTypes.STRING,
        city: DataTypes.STRING,
        cpf: DataTypes.STRING,
        age: DataTypes.INTEGER,
        sex: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "users",
      }
    );
  }
}

module.exports = User;
