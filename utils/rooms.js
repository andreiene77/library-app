const rooms = {
  LECTURE_ROOM: {
    name: 'Lecture Room',
    drawers: {
      _21A: { name: '21A', noRows: 5 },
      _21B: { name: '21B', noRows: 5 },
      _22A: { name: '22A', noRows: 6 },
      _22B: { name: '22B', noRows: 6 },
      _22C: { name: '22C', noRows: 4 },
      _23A: { name: '23A', noRows: 7 },
      _23B: { name: '23B', noRows: 8 },
      _23C: { name: '23C', noRows: 3 },
      _23D: { name: '23D', noRows: 6 },
      _24A: { name: '24A', noRows: 5 },
      _24B: { name: '24B', noRows: 9 },
    },
  },
  MAIN_ROOM: {
    name: 'Main Room',
    drawers: {
      _11A: { name: '11A', noRows: 5 },
      _11B: { name: '11B', noRows: 5 },
      _12C: { name: '11C', noRows: 4 },
      _12A: { name: '12A', noRows: 6 },
      _12B: { name: '12B', noRows: 6 },
      _13A: { name: '13A', noRows: 7 },
      _13B: { name: '13B', noRows: 8 },
      _13C: { name: '13C', noRows: 3 },
      _13D: { name: '13D', noRows: 6 },
      _13E: { name: '13E', noRows: 6 },
      _14A: { name: '14A', noRows: 5 },
      _14B: { name: '14B', noRows: 9 },
      _14C: { name: '14C', noRows: 10 },
    },
  },
};
Object.freeze(rooms);

module.exports = rooms;
