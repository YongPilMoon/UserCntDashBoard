const fs = require('fs');
const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));


module.exports = users;


