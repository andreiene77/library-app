const actionStates = {
  BOOKING_REQUESTED: 'booking requested',
  PICK_UP_SCHEDULED: 'pick-up scheduled',
  CANCELED_BY_ADMIN: 'canceled by admin',
  CANCELED_BY_USER: 'canceled by user',
  CANCELED_BY_OVERDUE: 'canceled by overdue',
  BORROWED_AWAITING: 'borrowed (awaiting confirmation)',
  BORROWED_CONFIRMED: 'borrowed (confirmed)',
  BORROW_EXTEND_REQUEST: 'borrow extend requested',
  BORROW_EXTEND_ACCEPTED: 'borrow extend accepted',
  BORROW_EXTEND_DECLINED: 'borrow extend declined',
  RETURN_OVERDUE: 'return overdue',
  USER_RETURNED: 'user returned (awaiting confirmation)',
  RETURN_DENIED: 'return denied',
  RETURN_CONFIRMED: 'return confirmed',
};
Object.freeze(actionStates);

module.exports = actionStates;
