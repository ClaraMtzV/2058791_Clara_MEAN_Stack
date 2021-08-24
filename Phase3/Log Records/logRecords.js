class User{
    constructor(){
        this.getData()
    }
    getData(){
        let readline = require("readline-sync");
        this.first_name = readline.question("Please, enter your first name: ");
        this.last_name = readline.question("Please, enter your last name: ");
        this.username = readline.question("Please, enter a desired username: ");
        this.email = readline.questionEMail("Please, enter your email: ");
        this.password = readline.questionNewPassword("Please, enter your desired password: ", {min: 5});  
        let today = new Date();
        this.date_added = today.getMonth() + '-'+ today.getDate() + '-' + today.getFullYear() 
        + " at " + today.getHours() + ':' + today.getMinutes();
    }
}

class UserLog{
    constructor(){
        this.tempUser = new User;
        this.users = [];
    }
    storeNewUser(){
        let fs = require("fs");
        //if there's an empty json file, then create an empty object 
        //and put it there so we can append new users later using push function
        if (fs.readFileSync("users.json".toString()) == ""){
            fs.writeFileSync("users.json",JSON.stringify(this.users));
        }
        debugger;
        this.users = JSON.parse(fs.readFileSync("users.json".toString()));  
        this.users.push(this.tempUser);

        fs.writeFileSync("users.json",JSON.stringify(this.users));
        debugger;
        console.log("New user saved!");
    }
}

let newUsersLog = new UserLog();
newUsersLog.storeNewUser();






