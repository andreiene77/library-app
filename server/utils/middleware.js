/* eslint-disable no-unused-vars */
const { verify } = require('jsonwebtoken');
const UsersService = require('../business/services/UsersService');

/**
 * @param {UsersService} usersService
 * @returns
 */
module.exports = function middleware(usersService) {
  return {
    authenticateToken: (req, res, next) => {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      if (token == null) return res.sendStatus(401);
      try {
        const user = verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        return next();
      } catch (err) {
        console.log('Auth error: ', err);
        return res.sendStatus(403);
      }
    },
    adminOnly: async (req, res, next) => {
      if (!(await usersService.isAdmin(req.user.username))) return res.sendStatus(403);
      return next();
    },
  };
};
