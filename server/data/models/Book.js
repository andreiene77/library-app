module.exports = ({ sequelize, DataTypes: { STRING, INTEGER } }) => {
  const Book = sequelize.define(
    'book',
    {
      code: STRING,
      name: {
        type: STRING,
        allowNull: false,
      },
      author: {
        type: STRING,
        allowNull: false,
      },
      publHouse: STRING,
      year: INTEGER,
      genre: STRING,
      copies: INTEGER,
    },
    {},
  );
  Book.associate = (models) => {
    Book.hasMany(models.action);
    Book.belongsTo(models.place);
  };
  return Book;
};
