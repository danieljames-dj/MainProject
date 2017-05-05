'use strict';

module.exports = function(app) {
  var restapis = require('../controllers/restapis');

  // todoList Routes
  app.route('/registerUser')
    .post(restapis.registerUser);

  app.route('/addItem')
  	.post(restapis.addItem);

  app.route('/editItem')
  	.post(restapis.editItem);

  app.route('/deleteItem')
  	.post(restapis.deleteItem);

  app.route('/getItems')
  	.post(restapis.getItems);
};