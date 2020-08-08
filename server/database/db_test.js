const mongoose = require('mongoose');
const uri = "mongodb+srv://2ijRe0aoQ4lpAeOH:2ijRe0aoQ4lpAeOH@cluster0.8jhpm.mongodb.net/messenger?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("We have connected mongo db");
});


//2. define the modeul 
//2.1  define a schema  (document)
const userSchema = mongoose.Schema({
    username: {type:"String",require:true},
    password: {type:"String",require:true},
    sex : {type:"String",require:true}
})

//2.2 deine a model  (collection)
const UserModel = mongoose.model('user',userSchema)

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




