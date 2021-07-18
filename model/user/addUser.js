const crypto = require('crypto');
const salt = () => (Math.round((new Date().valueOf() * Math.random()))) + "";
const getCrypto = (_salt, password) => (crypto.createHash("sha512").update(password + _salt).digest("hex"));

class AddUser { 
    constructor(data) {
        this.salt = salt(); 
        this.userid = data.userid;
        this.password = getCrypto(this.salt, data.password); 
        this.name = data.name;
    }
}

module.exports = (data) => new AddUser(data);