'use strict';

var mysql = require("mysql");
var connection = mysql.createPool({
  host: "localhost",
  user: "dany",
  password: "emmaus",
  database: "eawadDB",
  multipleStatements: true
});

exports.registerUser = function(req, res) {
  var jDate = '1900-01-01';
  (function() {
      Date.prototype.toYMD = Date_toYMD;
      function Date_toYMD() {
          var year, month, day;
          year = String(this.getFullYear());
          month = String(this.getMonth() + 1);
          if (month.length == 1) {
              month = "0" + month;
          }
          day = String(this.getDate());
          if (day.length == 1) {
              day = "0" + day;
          }
          return year + "-" + month + "-" + day;
      }
  })();
  var date = new Date();
  jDate = date.toYMD();
  console.log(jDate.toString());
  connection.query('insert into Users values(\'' + req.body.uid + '\',\'' + req.body.name + '\',\'' + req.body.email + '\',\'' +
  req.body.contact + '\',\'' + jDate.toString() + '\')', function(err, rows) {
    if (!err) {
      res.json({
        success: true
      });
    }
  });
};

exports.addItem = function(req, res) {
  connection.query('select max(itemID) from Items', function(err, rows) {
    var uid = 1;
    if (!err) {
      if (rows.length > 0) {
        if (rows[0]['max(itemID)'] != null)
          uid = rows[0]['max(itemID)'] + 1;
      }
    }
    connection.query('insert into Items values(' + uid.toString() + ',\'' + req.body.itemName + '\',' + req.body.rate + ')', function(err, rows) {
      if (!err) {
        res.json({
          success: true
        });
      }
    });
  });
};

exports.editItem = function(req, res) {
  connection.query('update Items set itemName = \'' + req.body.itemName + '\', rate = ' + req.body.rate + ' where itemID = ' + req.body.itemID, function(err, rows) {
    if (!err) {
      res.json({
        success: true
      });
    }
  });
};

exports.deleteItem = function(req, res) {
  connection.query('delete from Items where itemID = ' + req.body.itemID, function(err, rows) {
    if (!err) {
      res.json({
        success: true
      });
    }
  });
};

exports.getItems = function(req, res) {
  connection.query('select * from Items', function(err, rows) {
    if (!err) {
      res.json({
        rows: rows
      });
    }
  });
};