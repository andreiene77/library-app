/* eslint-disable no-unused-vars */
const { Router } = require('express');
const { USERS_ROUTE } = require('../../../utils/apiRoutes');
const UsersService = require('../services/UsersService');

const { POST, GET, PUT, DELETE } = USERS_ROUTE;

/**
 * @param {Router} router
 * @param {UsersService} service
 */
module.exports = function UsersController(router, service, { authenticateToken, adminOnly }) {
  router.post(POST.LOGIN(), async (req, res) => {
    try {
      const result = await service.loginUser(req.body.username, req.body.password);
      if (result === null) return res.sendStatus(401);

      const {
        user: { _id: id, username, email, firstName, lastName, phone, isAdmin, blocked },
        refreshToken,
        accessToken,
      } = result;
      return res.json({
        user: { id, username, email, firstName, lastName, phone, isAdmin, blocked },
        refreshToken,
        accessToken,
      });
    } catch (e) {
      console.error(e.stack);
      return res.sendStatus(500);
    }
  });

  router.post(POST.REGISTER(), async (req, res) => {
    try {
      const result = await service.registerUser(req.body);
      if (result === null) return res.sendStatus(401);

      const {
        user: { _id: id, username, email, firstName, lastName, phone, isAdmin },
        refreshToken,
        accessToken,
      } = result;
      return res.json({
        user: { id, username, email, firstName, lastName, phone, isAdmin },
        refreshToken,
        accessToken,
      });
    } catch (e) {
      console.error(e.stack);
      return res.sendStatus(500);
    }
  });

  router.get(GET.REFRESH_TOKEN(':token'), async (req, res) => {
    const refreshToken = req.params.token;
    try {
      const accessToken = await service.refreshToken(refreshToken);
      if (accessToken === null) return res.sendStatus(401);
      return res.json({ accessToken });
    } catch (e) {
      console.error(e.stack);
      return res.sendStatus(500);
    }
  });

  router.post(POST.LOGOUT(), authenticateToken, async (req, res) => {
    try {
      await service.logoutUser(req.user.username, req.body.refreshToken);
      res.sendStatus(204);
    } catch (e) {
      console.error(e.stack);
      res.sendStatus(500);
    }
  });

  router.post(POST.INVALIDATE_ALL_TOKENS(), authenticateToken, async (req, res) => {
    try {
      if (req.user && (await service.isAdmin(req.user.username))) await service.invalidateTokens(req.body.username);
      else await service.invalidateTokens(req.user.username);
      res.sendStatus(204);
    } catch (e) {
      console.error(e.stack);
      res.sendStatus(500);
    }
  });

  router.get(GET.ALL(), authenticateToken, adminOnly, async (_req, res) => {
    try {
      const users = await service.getAll();
      return res.json(
        users.map(({ _id: id, username, email, firstName, lastName, phone, isAdmin, blocked }) => ({
          id,
          username,
          email,
          firstName,
          lastName,
          phone,
          isAdmin,
          blocked,
        })),
      );
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  });

  router.get(GET.SELF(), authenticateToken, async (req, res) => {
    const user = await service.getByUsername(req.user.username);
    if (!user) return res.sendStatus(404);
    const { _id: id, username, email, firstName, lastName, phone, isAdmin, blocked } = user;
    return res.json({ _id: id, username, email, firstName, lastName, phone, isAdmin, blocked });
  });

  router.get(GET.BY_WORD(':word'), authenticateToken, adminOnly, async (req, res) => {
    try {
      res.json(await service.getByWord(req.params.word));
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post(POST.ONE(), authenticateToken, adminOnly, async (req, res) => {
    try {
      const { _id: id, username, email, firstName, lastName, phone, isAdmin } = await service.saveUser(req.body);
      res.json({ id, username, email, firstName, lastName, phone, isAdmin });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.BLOCK_USER(), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.blockUser(req.body.id);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.UNBLOCK_USER(), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.unblockUser(req.body.id);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.OTHER(), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.updateUser(req.body);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.SELF(), authenticateToken, async (req, res) => {
    try {
      await service.updateSelfUser(req.user.username, req.body);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.delete(DELETE(':id'), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.deleteUser(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(404);
    }
  });

  return router;
};
