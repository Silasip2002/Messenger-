var express = require ("express")
var app = express();
const  {Usermodel} = require("../database/models");
const md5 = require("blueimp-md5");


//Regirster a new account 
app.post("/register",(req,res)=> {
    // get the user infromation 
    const {username,password,sex} = req.body;
    // check in the db
    Usermodel.findOne({username}, (error,userData) => {
        if(userData === null){ // if  no data then we can create a new user.
                new Usermodel({username,sex, password:md5(password)}).save((error,newuser)=>{
                if(!error){
                    res.cookie("user_id",newuser._id, {maxAge:1000*60*60*30});
                    res.send ({code:0,meg: newuser.username + "has registered successfully."});
                }else{
                    res.send({code:1, msg:"Error during the save() : " + error})
                }
            });
        }else {
            res.send({code:1, msg:"The user is existing"})
        }
    })
})

app.post("/login",(req,res)=> {
    // get the user infromation 
    const {username,password} = req.body;
    // check in the db
    Usermodel.findOne({username,password:md5(password)}, (error,userData) => {
        if(userData === null){ // if  no data then we can create a new user.
            res.send({code:1, msg:"The user name or password is wrong"})
        }else {
            res.cookie("user_id",userData._id, {maxAge:1000*60*60*30});
            res.send ({code:0,data:userData,meg:"Welcome back !" + userData.username});
        }
    })
})
module.exports = app; 