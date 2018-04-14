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
    name: "option",
    type: "list",
    message: "What would you like to do?",
    choices: ["Post an item", "Bid on item"]
  },
]).then(function(answer) {
    console.log(answer);

    if (answer.option == "Post an item") {
        console.log("post something");
    }
    else {
        console.log("do the bid thing");
    }
});

function postItem() {
   
 

    inquirer.prompt([
       {
           type: "input",
           message: "What would you like  to post",
           name: "name"
   
           
       },
   ]).then(function (user) { 
          
           var query =connection.query( 
               "INSERT INTO itemTable SET ?",
           
               {
                   name: user.name 
                 }, function (err,res){
       
                   console.log(res.affectedRows + " Item Added!\n");
           
                 }     
           );
       });
          
   
       inquirer.prompt([
           {
               type: "input",
               message: "What is the price?",
               price: "price"
       
       
               
           },
       ]).then(function (user) { 
              
               var query =connection.query( 
                   "INSERT INTO itemTable SET ?",
               
                   {
                       price: user.price 
                     }, function (err,res){
           
                       console.log(res.affectedRows + " Item Added!\n");
                       
                     }     
               );
           });
              
       }
       