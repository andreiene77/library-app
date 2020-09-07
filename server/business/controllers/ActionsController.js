/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const { Router } = require('express');
const { ACTIONS_ROUTE } = require('../../../utils/apiRoutes');
const ActionsService = require('../services/ActionsService');

const { GET, POST, PUT, DELETE } = ACTIONS_ROUTE;
/**
 * @param {Router} router
 * @param {ActionsService} service
 */
module.exports = function ActionsController(router, service, { authenticateToken, adminOnly }) {
  router.get(GET.ALL(), authenticateToken, adminOnly, async (_req, res) => {
    try {
      res.json(await service.getAll());
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.get(GET.SELF(), authenticateToken, async (req, res) => {
    try {
      const actions = await service.getActionsByUsername(req.user.username);
      if (actions === null) res.sendStatus(400);
      else res.json(actions);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.get(GET.BY_USER(':id'), authenticateToken, adminOnly, async (req, res) => {
    try {
      const action = await service.getActionByUserId(req.params.id);
      if (action === null) res.sendStatus(400);
      res.json(action);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.get(GET.BY_BOOK(':id'), authenticateToken, adminOnly, async (req, res) => {
    try {
      const action = await service.getActionByUserId(req.params.id);
      if (action === null) res.sendStatus(400);
      res.json(action);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post(POST.MANUAL(), authenticateToken, adminOnly, async (req, res) => {
    try {
      const action = await service.saveAction({
        userId: req.body.userId,
        bookId: req.body.bookId,
      });
      if (action === null) res.sendStatus(400);
      const { _id: id, createDate, lastUpdate, deadline, state, user, book } = action;
      res.json({ id, createDate, lastUpdate, deadline, state, user, book });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.post(POST.USER_CREATE_BOOKING(), authenticateToken, async (req, res) => {
    try {
      const action = await service.saveAction({
        bookId: req.body.bookId,
        username: req.user.username,
        deadline: req.body.deadline,
      });
      if (action === null) res.sendStatus(400);
      const { _id: id, createDate, lastUpdate, deadline, state, user, book } = action;
      res.json({ id, createDate, lastUpdate, deadline, state, user, book });
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.MANUAL(), authenticateToken, async (req, res) => {
    try {
      await service.updateAction(req.body);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(204);
    }
  });

  router.put(PUT.USER_CANCEL_BOOKING(), authenticateToken, async (req, res) => {
    try {
      await service.cancelBooking(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.ADMIN_ACCEPT_BOOKING(), authenticateToken, async (req, res) => {
    try {
      await service.bookingAccepted(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.ADMIN_DECLINE_BOOKING(), authenticateToken, async (req, res) => {
    try {
      await service.bookingDeclined(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.USER_PICKED_UP(), authenticateToken, async (req, res) => {
    try {
      await service.userPickUp(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.USER_REQUEST_EXTEND_BORROW(), authenticateToken, async (req, res) => {
    try {
      await service.userRequestExtend(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.USER_RETURNED(), authenticateToken, async (req, res) => {
    try {
      await service.userReturned(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.ADMIN_ACCEPT_EXTEND(), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.userRequestAccepted(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.ADMIN_DECLINE_EXTEND(), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.userRequestDeclined(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.ADMIN_CONFIRM_BORROW(), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.adminConfirmBorrow(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.ADMIN_CONFIRM_RETURN(), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.adminConfirmReturn(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.put(PUT.ADMIN_DENY_RETURN(), authenticateToken, adminOnly, async (req, res) => {
    try {
      await service.adminDenyReturn(req.body.id);
      res.sendStatus(204);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });

  router.delete(DELETE(':id'), authenticateToken, async (req, res) => {
    try {
      await service.deleteAction(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  });

  return router;
};
