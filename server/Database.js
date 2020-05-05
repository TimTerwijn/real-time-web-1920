const mysql = require('mysql');
const User = require("../server/objects/User.js");

let connection;
let _host;
let _user;
let _password;
let _database;

function init(){
    //get login data

    try{
        //if user is on localhost
        const databaseLogin = require("./DatabaseLogin.js");
        _host = databaseLogin.host;
        _user = databaseLogin.user;
        _password = databaseLogin.password;
        _database = databaseLogin.database;
    }catch(error){
        //if user is on heroku
        //https://stackoverflow.com/a/55233621
        
        _host = process.env.db_host;
        _user = process.env.db_user;
        _password = process.env.db_password;
        _database = process.env.db_database;
    }
}

function start(){
    connection = mysql.createConnection({
        host     : _host,
        port     : '3306',
        user     : _user,
        password : _password,
        database : _database,
    });
}

function insertUser(user){
    start();

    const query = `
        INSERT INTO sp_users(id, username, x, velocity, maxSpeed) 
        VALUES ("${user.getId()}","${user.getUsername()}","${user.getX()}","${user.getVelocity()}","${user.getMaxSpeed()}")
    `;

    console.log(query);

    connection.query(query, function (error, results, fields) {
        if (error){
            throw error;
        }
        console.log("Database inserted a new user");
    });
}

function selectAllUsers(users){
    start();

    const query = `
        SELECT * FROM sp_users
    `;

    console.log("storing users in memory...");
    connection.query(query, function (error, results, fields) {
        if (error){
            throw error;
        }

        results.forEach(result => {
            const user = new User(
                result.id,
                result.username,
            )

            user.setX(result.x);
            user.setVelocity(result.velocity);
            user.setMaxSpeed(result.maxSpeed);

            users[user.getId()] = user;
        });

        console.log("users are stored in memory");
    });
}

module.exports = {
    insertUser,
    selectAllUsers,
}



//start function
init();