var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var userSchema = require('../models/userSchema');
var connectionString = "mongodb://dishant:123456@ds053196.mlab.com:53196/coursegame";
var ObjectId = require('mongodb').ObjectID;

// localhost:3000/users
router.get('/', function(req, res, next) {
  MongoClient.connect(connectionString, function(err, db) {
    if(!err) {
      var collection = db.collection('User');
      collection.find().toArray(function(err, users) {
        if (err) {
          res.status(500);
    		  res.json({"Status":false,"Result":err});
        }
        else {
          res.status(200);
          res.send({"Status":true,"Result":users});
        }
      });
    }
  });
});


// localhost:3000/users/getById/:id
router.get('/getById/:id',function(req, res, next){
  MongoClient.connect(connectionString, function(err, db) {
    if(!err) {
      var collection = db.collection('User');
      var id = req.params.id;

      collection.findOne({"_id": new ObjectId(id)}, function(err, user) {
        if (err) {
          res.status(500);
    		  res.json({"Status":false,"Result":err});
        }
        else {
          res.status(200);
          res.send({"Status":true,"Result":user});
        }
      });
    }
  });
});


// localhost:3000/users/authenticate
router.post('/login',function(req, res, next){
  MongoClient.connect(connectionString, function(err, db) {
    if(!err) {
      var collection = db.collection('User');
      var email = req.body.email;
      var password = req.body.password;

      collection.findOne({"email": email, "password": password}, function(err, user) {
        if (err) {
          res.status(500);
    		  res.json({"Status":false,"Result":err});
        }
        else {
          if(!user) {
            res.status(404);
            res.send({"Status":false,"Result":"Authentication failed. User not found."});
          }
          else {
            res.status(200);
            res.send({"Status":true,"Result":user});
          }
        }
      });
    }
  });
});


// localhost:3000/users/insert
router.post('/register',function(req, res, next){
  MongoClient.connect(connectionString, function(err, db) {
    if(!err) {
      var collection = db.collection('User');
      var user = req.body;

    	collection.insert({
        name: req.body.name,
        type: req.body.type,
        programme: req.body.programme,
        year: req.body.year,
        webmailId: req.body.webmailId,
        institute: req.body.institute,
        username: req.body.username,
        password: req.body.password,
        contact: req.body.contact
      }, function(err, user) {
    		if (err) {
          res.status(500);
    		  res.json({"Status":false,"Result":err});
        }
        else {
          res.status(200);
          res.send({"Status":true,"Result":"Record inserted successfully.", "insertedUser": user.ops[0]});
        }
      });
    }
  });
});


// localhost:3000/users/update/:id
router.put('/update/:id', function(req, res, next){
  MongoClient.connect(connectionString, function(err, db) {
    if(!err) {
      var collection = db.collection('User');
      var id = req.params.id;
      var updatedUser = req.body;

      console.log(id);
      console.log(updatedUser);
      collection.findAndModify(
        {_id: ObjectId(id)},
        {$set: updatedUser},
        function(err, object) {
            if (err){
                res.status(500);
                res.json({"Status":false, "Result":err});
            }else{
                res.status(200);
                res.json({"Status":true, "Result":"Record updated successfully."});
            }
        });
    }
  });
});

// localhost:3000/users/delete/:id
router.delete('/delete/:id', function(req,res, next){
  MongoClient.connect(connectionString, function(err, db) {
    if(!err) {
      var collection = db.collection('User');
      var id = req.params.id;

      console.log(id);
      collection.remove({_id: ObjectId(id)},
        function(err, object) {
            if (err){
                res.status(500);
                res.json({"Status":false, "Result":err});
            }else{
                res.status(200);
                res.json({"Status":true, "Result":"Record deleted successfully."});
            }
        });
    }
  });
});

module.exports = router;
