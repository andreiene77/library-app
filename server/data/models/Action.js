module.exports = ({ sequelize, DataTypes: { STRING, DATEONLY, BOOLEAN, BLOB } }) => {
  const Action = sequelize.define(
    'action',
    {
      type: {
        type: STRING, // oneOf: booking, borrowing, return
        allowNull: false,
      },
      deadline: {
        type: DATEONLY,
        allowNull: false,
      },
      state: {
        type: STRING, // oneOf: picked up, extended, overdue, returned, canceled
        allowNull: false,
      },
      confirmed: {
        type: BOOLEAN,
        allowNull: false,
      },
      proofImg: {
        type: BLOB,
      },
      proofText: {
        type: STRING,
      },
    },
    {},
  );
  Action.associate = (models) => {
    Action.belongsTo(models.book);
    Action.belongsTo(models.user);
  };
  return Action;
};
