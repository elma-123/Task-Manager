const bcrypt = require("bcrypt");

bcrypt.hash("elma123", 10)
.then(console.log);