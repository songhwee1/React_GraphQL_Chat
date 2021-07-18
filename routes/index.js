var express = require('express');
var router = express.Router();

const mysql = require('../config/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  mysql.query('select * from user', function(err, rows, fields) { // 쿼리문을 이용해 데이터를 가져온다.
    if(!err) { // 에러가 없다면
      res.send(rows); // rows 를 보내주자
    } else { // 에러가 있다면?
      console.log("err : " + err);
      res.send(err); // console 창에 에러를 띄워주고, 에러를 보내준다.
    }
  });
});

module.exports = router;