/* eslint-disable no-undef */

const { delay } = require('../utils');

module.exports = (app) => {
  const verify_url = require('../data/verify/verifyUrl.json')
  const sessionInfo = require('../data/verify/sessionInfo.json')

  app.post('/verify-url', async (req, res) => {
      await delay(2000);
      res.status(200).json(verify_url);
  });
  app.post('/reset-password', async (req, res) => {
    await delay(2000);
    res.json({
      "is_success": true,
      "code": "200",
      "message": "Ok",
      "data": []
    });
  });

  app.post('/forgot-password', async (req, res) => {
    await delay(2000);
    res.json({
      "is_success": true,
      "code": "200",
      "message": "Ok",
      "data": []
    });
  });
  app.get('/get-authorization', async (req, res) => {
    await delay(2000);
    res.status(200).json(sessionInfo);
  });
}
