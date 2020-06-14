module.exports = ({ sequelize, DataTypes: { STRING, BOOLEAN } }) => {
  const User = sequelize.define(
    'user',
    {
      username: {
        type: STRING,
        allowNull: false,
      },
      password: {
        type: STRING,
        allowNull: false,
      },
      email: {
        type: STRING,
        allowNull: false,
      },
      firstName: STRING,
      lastName: STRING,
      contact: STRING,
      isAdmin: BOOLEAN,
    },
    {},
  );
  User.associate = (models) => {
    User.hasMany(models.action);
  };
  return User;
};
