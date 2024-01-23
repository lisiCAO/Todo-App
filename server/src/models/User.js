module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
      },
      email: {
          type: DataTypes.STRING(320),
          allowNull: false,
          validate: { isEmail: true }
      },
      password: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: { len: [8, 100] }
      },
  }, {
      timestamps: false, 
  });

  User.associate = (models) => {
        User.hasMany(models.Todo, { foreignKey: 'ownerId' });
    };

  return User;
};
