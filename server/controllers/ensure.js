const connect = require('connect-ensure-login');
const AccessError = require('../errors/AccessError');

/** Auth Functions */

function admin(req, res, next) {
  if (!req.user.isAdmin) {
    throw new AccessError();
  }

  next();
}

function choreographer(req, res, next) {
  if (!req.user.isChoreographer && !req.user.isAdmin) {
    throw new AccessError();
  }

  next();
}

function sameUser(req, res, next) {
  const id = req.params.user_id;
  if (id != req.user._id && !req.user.isAdmin) {
    throw new AccessError();
  }

  next();
}

function noop(req, res, next) {
  next();
}

function _ensureWrap(fn) {
  const baseEnsure = connect.ensureLoggedIn('/login');
  return (req, res, next) => {
    baseEnsure(req, res, () => {
      // if user is logged in, proceed to further check
      fn(req, res, next);
    });
  };
}

module.exports = {
  loggedIn: _ensureWrap(noop),
  choreographer: _ensureWrap(choreographer),
  admin: _ensureWrap(admin),
  sameUser: _ensureWrap(sameUser)
};
