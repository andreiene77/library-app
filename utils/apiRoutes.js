const BOOKS_ROUTE = {
  BASE: '/books',
  GET: {
    ALL: () => BOOKS_ROUTE.BASE,
    BY_WORD: (word) => `${BOOKS_ROUTE.BASE}/${word}`,
    BY_NAME_AUTHOR: (name, author) => `${BOOKS_ROUTE.BASE}/${name}/${author}`,
    BY_QUOTE: (quote) => `${BOOKS_ROUTE.BASE}/${quote}`,
  },
  POST: {
    ONE: () => `${BOOKS_ROUTE.BASE}/one`,
    MANY: () => `${BOOKS_ROUTE.BASE}/many`,
  },
  PUT: () => BOOKS_ROUTE.BASE,
  DELETE: (id) => `${BOOKS_ROUTE.BASE}/${id}`,
};

const USERS_ROUTE = {
  BASE: '/users',
  GET: {
    ALL: () => USERS_ROUTE.BASE,
    BY_WORD: (word) => `${USERS_ROUTE.BASE}/word/${word}`,
    BY_ID: (id) => `${USERS_ROUTE.BASE}/id/${id}`,
    BY_USERNAME: (username) => `${USERS_ROUTE.BASE}/username/${username}`,
    SELF: () => `${USERS_ROUTE.BASE}/self`,
    REFRESH_TOKEN: (token) => `${USERS_ROUTE.BASE}/token/${token}`,
  },
  POST: {
    REGISTER: () => `${USERS_ROUTE.BASE}/register`,
    LOGIN: () => `${USERS_ROUTE.BASE}/login`,
    LOGOUT: () => `${USERS_ROUTE.BASE}/logout`,
    INVALIDATE_ALL_TOKENS: () => `${USERS_ROUTE.BASE}/invalidate`,
    ONE: () => `${USERS_ROUTE.BASE}/one`,
    MANY: () => `${USERS_ROUTE.BASE}/many`,
  },
  PUT: {
    BLOCK_USER: () => `${USERS_ROUTE.BASE}/blockUser`,
    UNBLOCK_USER: () => `${USERS_ROUTE.BASE}/unblockUser`,
    OTHER: () => `${USERS_ROUTE.BASE}/other`,
    SELF: () => `${USERS_ROUTE.BASE}/self`,
  },
  DELETE: (id) => `${USERS_ROUTE.BASE}/${id}`,
};

const ACTIONS_ROUTE = {
  BASE: '/actions',
  GET: {
    ALL: () => ACTIONS_ROUTE.BASE,
    SELF: () => `${ACTIONS_ROUTE.BASE}/self`,
    BY_USER: (id) => `${ACTIONS_ROUTE.BASE}/user/${id}`,
    BY_BOOK: (id) => `${ACTIONS_ROUTE.BASE}/book/${id}`,
  },
  POST: {
    MANUAL: () => `${ACTIONS_ROUTE.BASE}`,
    USER_CREATE_BOOKING: () => `${ACTIONS_ROUTE.BASE}/createBooking`,
  },
  PUT: {
    MANUAL: () => ACTIONS_ROUTE.BASE,
    // CONFIRM_BOOKING,
    // ADMIN_CANCEL,
    USER_CANCEL_BOOKING: () => `${ACTIONS_ROUTE.BASE}/cancelBooking`,
    USER_PICKED_UP: () => `${ACTIONS_ROUTE.BASE}/userPickedUp`,
    ADMIN_CONFIRM_BORROW: () => `${ACTIONS_ROUTE.BASE}/adminConfirmBorrow`,
    ADMIN_DENY_BORROW: () => `${ACTIONS_ROUTE.BASE}/adminDenyBorrow`,
    USER_REQUEST_EXTEND_BORROW: () => `${ACTIONS_ROUTE.BASE}/userRequestExtend`,
    ADMIN_ACCEPT_EXTEND: () => `${ACTIONS_ROUTE.BASE}/adminAcceptExtend`,
    ADMIN_DECLINE_EXTEND: () => `${ACTIONS_ROUTE.BASE}/adminDeclineExtend`,
    USER_RETURNED: () => `${ACTIONS_ROUTE.BASE}/userReturned`,
    ADMIN_CONFIRM_RETURN: () => `${ACTIONS_ROUTE.BASE}/adminConfirmReturn`,
    ADMIN_DENY_RETURN: () => `${ACTIONS_ROUTE.BASE}/adminDenyReturn`,
    // RETURN_DENY,
    // RETURN_CONFIRM,
  },
  DELETE: (id) => `${ACTIONS_ROUTE.BASE}/${id}`,
};

Object.freeze(BOOKS_ROUTE);
Object.freeze(USERS_ROUTE);
Object.freeze(ACTIONS_ROUTE);

module.exports = { BOOKS_ROUTE, USERS_ROUTE, ACTIONS_ROUTE };
