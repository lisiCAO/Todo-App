module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: { isEmail: true }
      },
      password: {
          type: DataTypes.STRING(51),
          allowNull: false,
          validate: { len: [6, 50] }
      },
  }, {
      timestamps: false, 
  });

  User.associate = (models) => {
        User.hasMany(models.todo, { foreignKey: 'ownerId' });
    };

  return User;
};
