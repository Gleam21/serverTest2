var express = require('express');
var router = express.Router();
var crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* 회원가입 */
router.post('/signup', function(req, res, next) {
  var id = req.body.username;
  var password = req.body.password;
  var nickname = req.body.name;

  var db = req.app.get('database');

  if (db == undefined) {
    res.json({message:'503 Server Error, 회원가입 실패'});
    return;
  }

  var validate = userValidation(id, password);
  if (validate == false) {
    res.json({message:'400 Bad Request, 회원가입 실패'});
  }

  var usersCollection = db.collection('users');

  usersCollection.count({'username':id}, function(err, result) {
    var cryptoPassword = crypto.createHash('sha512').update(password).digest('base64');
    if (err) throw(err);

    if (result > 0) {
      res.json({message: '401 Bad Request, 회원가입 실패'});
      return;
    } else {
      usersCollection.insertOne({'username': id, 
      'password': cryptoPassword, 'name': nickname}, function(err, result) {
        if (err) throw(err);
        if (result.ops.length > 0)
          res.json(result.ops[0]);
        else
          res.json({message:'503 Server Error, 회원가입 실패'});
      });
    }
  });
});
var userValidation = function(username, password) {
  if (username == '' || password == '') {
    return false;
  }
  if (username.length <= 6 || username.length >= 12) {
    return false;
  }
  if (password.length <= 8 || password.length >= 20) {
    return false;
  }  
  if (name.length <= 4 || name.length >= 20) {
    return false;
  }
  return true;
}

 

 

/* 로그인 */
router.post('/login', function(req, res, next) {

  var id = req.body.username;
  var password = req.body.password; 
  var db = req.app.get('database');

  var users = db.collection('users');

  
  users.findOne({id:req.username,password : req.password}, 
  
  function(err, user) {
    if (users != null){
      res.json("로그인 성공") ;     
    } 
    else{
      res.json("로그인 실패");
      
  }
 


});
  
});

 
 


module.exports = router;