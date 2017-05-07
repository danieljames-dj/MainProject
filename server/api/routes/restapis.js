'use strict';

module.exports = function(app) {
  var restapis = require('../controllers/restapis');

  // todoList Routes
  app.route('/registerUser')
    .post(restapis.registerUser);

  app.route('/registerEmployee')
    .post(restapis.registerEmployee);

  app.route('/approvedEmployee')
    .post(restapis.approvedEmployee);

  app.route('/updateEmployee')
    .post(restapis.updateEmployee);

  app.route('/addItem')
  	.post(restapis.addItem);

  app.route('/editItem')
  	.post(restapis.editItem);

  app.route('/deleteItem')
  	.post(restapis.deleteItem);

  app.route('/getItems')
  	.post(restapis.getItems);

  app.route('/getEvents')
  	.post(restapis.getEvents);

  app.route('/getEventsUser')
  	.post(restapis.getEventsUser);

  app.route('/updateEvents')
  	.post(restapis.updateEvents);

  app.route('/getEmployees')
  	.post(restapis.getEmployees);

  app.route('/uploadLocation')
  	.post(restapis.uploadLocation);

  app.route('/getImageList')
  	.post(restapis.getImageList);

  app.route('/addEvent')
  	.post(restapis.addEvent);

  app.route('/getEmpStat')
  	.post(restapis.getEmpStat);

  app.route('/setEmpStat')
  	.post(restapis.setEmpStat);

  app.route('/getPickupDetailsUser')
  	.post(restapis.getPickupDetailsUser);

  app.route('/getPickupDetailsEmployee')
  	.post(restapis.getPickupDetailsEmployee);

  app.route('/cancelPickup')
  	.post(restapis.cancelPickup);

  app.route('/finishPickup')
  	.post(restapis.finishPickup);

  app.route('/bookPickup')
  	.post(restapis.bookPickup);
};