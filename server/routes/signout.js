require('../typedefs');
const router = require('express').Router();
const wrap = require('../lib/wrap');

/**
 * Clear out session regardless of auth strategy
 * @param {Req} req
 * @param {Res} res
 */
async function handleSignout(req, res) {
  const { appLog, webhooks, params } = req;
  if (!req.session) {
    return res.utils.data('signout', {});
  }
  req.session.destroy(function (err) {
    if (err) {
      appLog.error(err);
    }
    res.utils.data('signout', {});
  });

  webhooks.signout(params.userEmail)
  return {}
}

router.get('/api/signout/:userEmail', wrap(handleSignout));

module.exports = router;
