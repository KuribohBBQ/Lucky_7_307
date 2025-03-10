const bcrypt = require('bcrypt');
const pwd = 'pass';

bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(pwd, salt))
    .then((hashedPassword) => {
        console.log(`Hashed password: ${hashedPassword}`);
    })
    .catch((err) => {
        console.error(err);
    });