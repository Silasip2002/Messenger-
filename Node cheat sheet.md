

## 1.Create Express server (server)

```shell
npm install express-generator -g

express --view=pug server

cd server 

npm install
```

```shell
# create nodemon  auto restart server 

1. npm install nodemon --save-dev 

2. change the package.json  "start":"nodemon ./bin/www"

3. npm start

# server starting....
```



## 2.basic Routing (serve) 

```js
var express = require ("express")
var app = express();

// constom AIP
app.post('/register',(req,res) => {
    console.log(res.body)
    const {username,password} = req.body
    if(username === "admin"){
        res.send({code:1, msg:'the user name is existing!'});
    }else{
        res.send({code:0, data:{id:"abc",username,password}})
    }
})

// end of custom API 

module.exports = app; 
```

## 3.Mongo DB

### 3.0 DB Information

```javascript
Cloud address : https://cloud.mongodb.com/v2/5f1c1c154f59762ba10e374c#metrics/replicaSet/5f1c1cf16e8b32405e0b916c/explorer/messenge

with akimotopark gmail

DBaccount : admin	
DBpassword : 2ijRe0aoQ4lpAeOH
dbname : messenger

//example 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:2ijRe0aoQ4lpAeOH@cluster0.8jhpm.mongodb.net/messenger?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

```

### 3.1 Install mongoose and entyption 

```shell
npm install -save mongoose blueimp-md5
```

### 3.2 Connect DB

```javascript
const mongoose = require('mongoose');
const uri = "mongodb+srv://2ijRe0aoQ4lpAeOH:2ijRe0aoQ4lpAeOH@cluster0.8jhpm.mongodb.net/messenger?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("The database has connected successful!");
});

```

### 3.3. Schema and Model

```javascript
// create a schema 
const userSchema = new mongoose.schema({
  name:{type::"String",required:true},
  password:{type::"String",required:true},
  sex:{type::"String",required:true},
})

//create a model 
const UserModel = new mongoose.model("User",userSchema);
```

### 3.4. CRUD

```javascript
//3. CURD
function createUser () {
    const userModel = new UserModel({username:"kiwi",password:"lovesilas",sex:"women"})

    userModel.save((error,data)=> {
        if(!error){
            console.log("A new user has been created." + data);
        } else{
            console.log("The new user creation fail. " + error)
        }
    })
}
// createUser();


function findAllUser (){
    UserModel.find((error,data)=>{
        if(!error){
            console.log("All user information :" + data)
        }else{
            console.log("Teh error :" + error)
        }
    })
}
// findAllUser()

var _id = {_id:"5f1cea9b5a610a7ba370e6f1"}
function findUser(_id){
    UserModel.findById(_id, (error,data) => {
        if(!error){
            console.log("The user information :" + data)
        }else{
            console.log("Teh error :" + error)
        }
     })
}
// findUser(_id);

function updateUser(_id){
    UserModel.findByIdAndUpdate(_id,{username:"hazel"}, (error,old_data)=>{
        if(!error){
            console.log("The user has been updated : " + findUser(_id))
        }else{
            console.log("Teh error :" + error)
        }
    })
}
// updateUser(_id);


function deleteUser(_id){
    UserModel.findByIdAndRemove(_id, (error,data)=>{
        if(!error){
            console.log("The user : " + data.username +  " has been deleted!");
        }else{
            console.log("The delete was faile : " + error);
        }
    })
}
deleteUser(_id)

```

## 4 Functions (server)

### Register

```javascript
//Regirster a new account 
app.post("/register",(req,res)=> {
    // get the user infromation 
    const {username,password,sex} = req.body;
    // check in the db
    Usermodel.findOne({username}, (error,userData) => {
        if(user === null){ // if  no data then we can create a new user.
                new Usermodel({username,sex, password:md5(password)}).save((error,user)=>{
                if(!error){
                    res.cookie("user_id",userData._id, {maxAge:1000*60*60*30});
                    res.send ({code:0,meg:userData});
                }else{
                    res.send({code:1, msg:"Error during the save() : " + error})
                }
            });
        }else {
            res.send({code:1, msg:"The user is existing" + error})
        }
    })
})

```

### Login 

```javascript
app.post("/login",(req,res)=> {
    // get the user infromation 
    const {username,password} = req.body;
    // check in the db
    Usermodel.findOne({username,password:md5(password)}, (error,userData) => {
        if(userData === null){ // if  no data then we can create a new user.
            res.send({code:1, msg:"The user name or password is wrong"})
        }else {
            res.cookie("user_id",userData._id, {maxAge:1000*60*60*30});
            res.send ({code:0,meg:"Welcome back !" + userData.username});
        }
    })
})
```



## 5. Connect  Frontend and Backend (clinet)

### Install dependences 

```shell
npm install -save axios 
```



Set the Ajax 

```

```

Set Reduce

```

```



### Set Proxy 

set proxy for corrss domina : because the frontned and backend with different domains.

Set the proxy in the path : clinet folder / package.json 

````
"proxy" : "http://locahost:4000"
````



