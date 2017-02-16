'use strict';
var express = require('express'),
  app = express(),
  http = require('http'),
  httpServer = http.Server(app);


var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
 // support json encoded bodies


app.use( bodyParser.urlencoded( {
    extended: true
} ) );

app.use(bodyParser.json());


var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/lostpeople', function(err, db) {
  if(!err) {
    console.log("We are connected");
  }else{

  	 console.log(err);
  }
})

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email : String,
    name : String,
    password : String
});


mongoose.model('Document', UserSchema);
var User = mongoose.model('Document');





app.get('/', function(req, res) {
  res.sendFile(__dirname + 'public/index.html');
});



 app.post('/register', function(req, res) {
      
       var user = new User();       

       user.email = req.body.email;
       user.name = req.body.userName;
       user.password = req.body.userPass;


          User.find({email: req.body.email}, function(err, docs){

          	  // console.log(docs);
               if(err) console.log(err);

                 console.log(docs.length)
                      

                  if(docs.length<1){
                           user.save(function(err, user_Saved){
						    if(err){
						        throw err;
						        console.log(err);
						    }else{
						        console.log('saved!');
						        res.send(user);
						    }
						})
                  }else{

                     res.send("already registered");

                  }

          })


            
       
         /*user.findOne({email: req.body.email}, function(err, result) {
			       if(err) console.log(err);

			         if(result == null) {
			           res.send('invalid username', 
					    {'Content-type' : 'text/plain'}, 
			                    403);
			         }
				 else {
			           console.log(result);
			           res.send("already registered")
			         }
			    });*/

       

      
       /*user.save(function(err, user_Saved){
		    if(err){
		        throw err;
		        console.log(err);
		    }else{
		        console.log('saved!');
		        res.send(user);
		    }
		});*/
      
});


app.post('/login', function(req, res) {
      
       var user = new User();       

       user.email = req.body.loginEmail;
       user.password = req.body.userPass;

          User.find({email: req.body.loginEmail}, function(err, docs){
          	  // console.log(docs);
               if(err) console.log(err);

                 console.log(docs.length)
                        
                 if(docs.length<1){

                  	 res.send("user not registered with the system");
                           
                  }else{



                       console.log(docs[0].password)


                       if(String(docs[0].password)==String(req.body.loginPass)){

                       	    res.send("registered user found");
                       }else{

                       	    res.send("user name or password is invalid");
                       }

                  }

          })


         
});


app.listen(3000);