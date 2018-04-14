var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
   host: "localhost",
   port: 3306,
   user: "root",
   //password: "password",
   database: 'greatBay'
});


connection.connect(function(err){
   if(err) throw(err);
   console.log(`connected as id ${connection.threadId}`);
});


inquirer.prompt([
  {
    name: "answer",
    type: "list",
    message: "What would you like to do?",
    choices: ["Post an item", "Bid on item"]
  },
]).then(function(answer) {
    console.log(answer);

    if (answer == "Post an item") {
        console.log("post something");
    }
    else {
        console.log("do the bid thing");
    }
});