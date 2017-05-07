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

exports.registerEmployee = function(req, res) {
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
  connection.query('insert into Employees values(\'' + req.body.uid + '\',\'' + req.body.name + '\',\'' + req.body.email + '\',\'' +
  req.body.contact + '\',' + req.body.salary.toString() + ',0,\'' + jDate.toString() + '\')', function(err, rows) {
    if (!err) {
      res.json({
        success: true
      });
    }
  });
};

exports.approvedEmployee = function(req, res) {
  connection.query('select * from Employees where regStat = 1 and email = \'' + req.body.email + '\'', function(err, rows) {
    if (!err && rows.length > 0) {
      res.json({
        success: true
      });
    } else {
      res.json({
        success: false
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

exports.getEvents = function(req, res) {
  connection.query('select ev.evID, ev.evDetails, ev.lat, ev.lng, em.name, em.contact from Events ev, Employees em where ev.eid=em.eid', function(err, rows) {
    if (!err) {
      res.json({
        rows: rows
      });
    }
  });
};

exports.getEventsUser = function(req, res) {
  connection.query('select ev.evID, ev.evDetails, ev.lat, ev.lng, em.name, em.contact from Events ev, Employees em where ev.eid=em.eid', function(err, rows) {
    if (!err) {
      connection.query('select * from Attendees where uid = \'' + req.body.uid + '\'', function(err, rowsNew) {
        console.log(rows);
        console.log(rowsNew);
        for (var i = 0; i < rows.length; i++) {
          rows[i].join = 0;
          for (var j = 0; j < rowsNew.length; j++) {
            if (rowsNew[j].evID == rows[i].evID)
              rows[i].join = 1;
          }
        }
        res.json({
          rows: rows
        });
      });
    }
  });
};

exports.updateEvents = function(req, res) {
  if (req.body.stat == 0) {
    connection.query('delete from attendees where evID = ' + req.body.evID + ' and uid = \'' + req.body.uid + '\'');
  } else {
    connection.query('insert into attendees values (' + req.body.evID + ',\'' + req.body.uid + '\')');
  }
};

exports.getEmployees = function(req, res) {
  connection.query('select * from Employees', function(err, rows) {
    if (!err) {
      res.json({
        rows: rows
      });
    }
  });
};

exports.getImageList = function(req, res) {
  var fs = require("fs");
  connection.query('select us.name, up.fileID, up.lat, up.lng from users us, uploads up where us.uid = up.uid', function(err, rows) {
    if (!err) {
      var read = function(rows, i) {
        fs.readFile("./pics/" + rows[i].fileID.toString(), 'utf8', function(err, data) {
          console.log(rows, i);
          if (rows[i]) {
            rows[i].image = data;
            x--;
          } else {
            x--;
          }
          if (x == 0) {
            res.json({
              rows: rows
            });
          }
        });
      }
      var x = rows.length;
      for (var i = 0; i < rows.length; i++) {
        console.log(rows[i]);
        read(rows, i);
      }
      if (x == 0) {
        res.json({
          rows: rows
        });
      }
    }
  });
};

exports.addEvent = function(req, res) {
  connection.query('select max(evID) from Events', function(err, rows) {
    var uid = 1;
    if (!err) {
      if (rows.length > 0) {
        if (rows[0]['max(evID)'] != null)
          uid = rows[0]['max(evID)'] + 1;
      }
    }
    connection.query('insert into Events values(' + uid.toString() + ',\'' + req.body.details + '\',' + req.body.lat + ',' + req.body.lng + ',\'' + req.body.uid + '\')', function(err, rows) {
      if (!err) {
        res.json({
          success: true
        });
      }
    });
  });
};

exports.updateEmployee = function(req, res) {
  if (req.body.regStat == true)
    connection.query('update Employees set regStat = 1 where eid = \'' + req.body.eid + '\'');
  else
    connection.query('update Employees set regStat = 0 where eid = \'' + req.body.eid + '\'');
};

exports.getEmpStat = function(req, res) {
  connection.query('select * from EmpStat where eid = \'' + req.body.uid + '\'', function(err, rows) {
    if (rows.length == 0) {
      res.json({
        success: false
      });
    } else {
      res.json({
        success: true,
        stat: rows[0].status
      });
    }
  });
};

exports.setEmpStat = function(req, res) {
  console.log(req.body);
  connection.query('delete from EmpStat where eid = \'' + req.body.eid + '\'', function(err, rows) {
    if (req.body.status != -1) {
      connection.query('insert into EmpStat values (\'' + req.body.eid + '\',' + req.body.status.toString() + ',' + req.body.lat + ',' + req.body.lng + ')');
    }
  });
};

exports.getPickupDetailsUser = function(req, res) {
  console.log(req.body);
  connection.query('select * from Transactions where status = 0 and uid = \'' + req.body.uid + '\'', function(err, rows) {
    if (rows.length > 0) {
      connection.query('select e.name as ename,e.contact as econ,u.name as uname,u.contact as ucon,t.amt,t.lat,t.lng from employees e,users u,transactions t where t.uid=u.uid and t.eid=e.eid and t.status=0 and u.uid = \'' + req.body.uid + '\'', function(err, rows) {
        console.log(rows);
        res.json({
          success: true,
          row: rows[0]
        });
      });
    } else {
      res.json({
        success: false
      });
    }
  });
};

exports.getPickupDetailsEmployee = function(req, res) {
  console.log(req.body);
  connection.query('select * from Transactions where status = 0 and eid = \'' + req.body.eid + '\'', function(err, rows) {
    if (rows.length > 0) {
      connection.query('select e.name as ename,e.contact as econ,u.name as uname,u.contact as ucon,t.amt,t.lat,t.lng from employees e,users u,transactions t where t.uid=u.uid and t.eid=e.eid and t.status=0 and e.eid = \'' + req.body.eid + '\'', function(err, rows) {
        console.log(rows);
        res.json({
          success: true,
          row: rows[0]
        });
      });
    } else {
      res.json({
        success: false
      });
    }
  });
};

exports.cancelPickup = function(req, res) {
  connection.query('select * from Transactions where status = 0 and uid = \'' + req.body.uid + '\'', function(err, rows) {
    if (rows.length >0) {
      connection.query('delete from Transactions where status = 0 and uid = \'' + req.body.uid + '\'', function(err, rowsNew) {
        res.json({
          success: true
        });
        console.log(rows[0]);
        connection.query('update Empstat set status = 1 where status = 0 and eid = \'' + rows[0].eid + '\'');
      });
    } else {
      res.json({
        success: false
      });
    }
  });
}

exports.finishPickup = function(req, res) {
  console.log(req.body);
  connection.query('update Transactions set status = 1, amt = ' + req.body.amt.toString() + ' where status = 0 and eid = \'' + req.body.eid + '\'', function(err, rows) {
    connection.query('delete from Empstat where eid = \'' + req.body.eid + '\'', function(err, rows) {
      res.json({
        success:true
      });
    });
  });
}

exports.uploadLocation = function(req, res) {
  var fs = require("fs");
  connection.query('select max(fileID) from Uploads', function(err, rows) {
    var uid = 1;
    if (!err) {
      if (rows.length > 0) {
        if (rows[0]['max(fileID)'] != null)
          uid = rows[0]['max(fileID)'] + 1;
      }
    }
    var writeStream = fs.createWriteStream("./pics/" + uid);
    writeStream.write(req.body.file);
    writeStream.end();
    connection.query('insert into Uploads values(' + uid.toString() + ',\'' + req.body.uid + '\',' + req.body.lat + ',' + req.body.lng + ')', function(err, rows) {
      if (!err) {
        res.json({
          success: true
        });
      }
    });
  });
  // console.log(req.body);
  // res.json({
  //   success: true
  // });
}

exports.bookPickup = function(req, res) {

  var tDate = '1900-01-01';
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
  tDate = date.toYMD();

  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
  console.log(req.body);
  connection.query('select * from EmpStat where status = 1', function(err, rows) {
    console.log(rows);
    if (rows.length == 0) {
      res.json({
        success: false
      });
    } else {
      var lowest = getDistanceFromLatLonInKm(req.body.lat, req.body.lng, rows[0].lat, rows[0].lng);
      var lowInd = 0;
      for (var i = 1; i < rows.length; i++) {
        var dist = getDistanceFromLatLonInKm(req.body.lat, req.body.lng, rows[i].lat, rows[i].lng);
        if (dist < lowest) {
          lowest = dist;
          lowInd = i;
        }
      }
      connection.query('select max(transID) from Transactions', function(err, rowsNew) {
        var uid = 1;
        if (!err) {
          if (rows.length > 0) {
            if (rows[0]['max(transID)'] != null)
              uid = rows[0]['max(transID)'] + 1;
          } else {
            res.json({
              success: false
            });
          }
        }
        if (!err) {
          var tDate = '1900-01-01';
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
          var tDate = date.toYMD();
        }
        console.log("HI", rows);
        connection.query('insert into Transactions values(' + uid.toString() + ',\'' + rows[lowInd].eid + '\',\'' + req.body.uid + '\',\'' + tDate + '\',' + req.body.amt + ',' + req.body.lat + ',' + req.body.lng + ',' + '0)', function(err, rowsNN) {
          res.json({
            success: true
          });
          connection.query('update EmpStat set status = 0 where eid = \'' + rows[lowInd].uid + '\'');
        });
      });
    }
  });
};