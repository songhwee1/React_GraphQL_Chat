const express = require('express');
const router = express.Router();

const mysql = require('mysql2');

router.get('/', function(req, res, next) {
    res.render('sign/join');
});

router.post('/', function(req, res, next) {
    const user = require('../../model/user/addUser')(req.body);
    const sql = `INSERT INTO user(USERID, PASSWORD, NAME, SALT) VALUES  ("${user.userid}","${user.password}","${user.name}",${user.salt})`;

    mysql.query(sql, function(err, rows) {
        console.log(rows);
        if(!err) {res.send("회원가입 성공!")} else {res.send("회원가입 실패!")};
    })
});


module.exports = router;