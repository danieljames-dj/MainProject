'use strict';

module.exports = function(app) {
  var restapis = require('../controllers/restapis');

  // todoList Routes
  app.route('/registerUser')
    .post(restapis.registerUser);
};