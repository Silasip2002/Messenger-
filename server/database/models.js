// step 1 : connect data base 
const mongoose = require('mongoose');
const uri = "mongodb+srv://2ijRe0aoQ4lpAeOH:2ijRe0aoQ4lpAeOH@cluster0.8jhpm.mongodb.net/messenger?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("We have connected mongo db");
});

//step 2 : create model 
//step 2.1 : create schema 
const userSchema = mongoose.Schema(
    {
        username:{type:"String",required:true},
        password:{type:"String",required:true},
        sex:{type:"String",required:true},
        header:{type:"String"},
        power:{type:"String",required:false},
        level:{type:"Number",required:false},
        salary:{type:"Number",required:false}
    }
)
//step 2.2 create model 
const Usermodel = mongoose.model("User",userSchema);
exports.Usermodel = Usermodel;
