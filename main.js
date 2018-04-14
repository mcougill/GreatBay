var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Just55Smile",
    database: 'greatBay'
});


connection.connect(function (err) {
    if (err) throw (err);
    console.log(`connected as id ${connection.threadId}`);
});

// function bidItem() {
//     - Ask for user input on how much to bid
//     - compare user bid to current highest bid
//     - if userBid > curBid then
//         > Tell User you are new highest bidder
//         > update curBid to userBid
//     - if userBid <= curBid then
//         > Info user you failed
//         > Boot them back to selection screen
//  }

function bidItem() {
    console.log("User selected bidItem");
    var query = connection.query("SELECT * FROM itemTable", function (err, res) {
        if (err) throw err;
        console.log(res[0].name);
        var itemNameArr = [];
        for (var i = 0; i < res.length; i++) {
            itemNameArr.push(res[i].name);
        }
        inquirer.prompt([
            {
                name: 'itemName',
                type: "list",
                message: "Please select an item",
                choices: itemNameArr,
            },
            {
                name: 'userBid',
                type: "input",
                message: "How much would you like to bid?",
            }
        ]).then(function (answers) {
            var itemName = answers.itemName;
            var userBid = answers.userBid;
            // THIS IS WHERE YOU ARE SELECTING THE ITMA ND RETURN ITS HIGHEST BID BRO OK?
            connection.query("SELECT * FROM itemTable WHERE ?", {
                name: itemName
            }, function (err, res) {
                // OKAY MAN, YOU GOT THE VARS YOU NEED NOW LOL
                if (err) throw err;
                var highestBid = res[0].price;
                console.log(itemName + ' ' + userBid);
                if (userBid > highestBid) {
                    updateBid(itemName, userBid);
                } else {
                    // promptUser()
                }
            })
        })
    });
}

function updateBid(itemName, newHighBid) {
    console.log("Attempting to update highest bid");
    var query = connection.query(
        "UPDATE itemTable SET ? WHERE ?",
        [
            {
                price: newHighBid
            },
            {
                name: itemName
            }
        ],
        function (err, res) {
            console.log(res.affectedRows);
        }
    )
}

bidItem();