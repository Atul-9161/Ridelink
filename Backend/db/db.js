const dns = require("dns");

// FIX: Force public DNS servers to bypass the Node.js 24 SRV resolution bug

const mongoose = require('mongoose');
dns.setServers(["8.8.8.8", "1.1.1.1"]);


function connectToDB() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log('Connected to DB');
    }).catch(err => {
        console.log(err);
    });
}

module.exports = connectToDB;