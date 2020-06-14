module.exports = ({ sequelize, DataTypes: { STRING, INTEGER } }) => {
  const Place = sequelize.define(
    'place',
    {
      room: STRING,
      drawer: STRING,
      row: STRING,
    },
    {},
  );
  Place.associate = (models) => {
    Place.hasMany(models.book);
  };
  return Place;
};
