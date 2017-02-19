
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

mongoose.Promise = global.Promise;
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
                    welcomeEmail(req.body.email);
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

                       	   
                            res.send({name:docs[0].name})

                       }else{

                       	    res.send("user name or password is invalid");
                       }

                  }

          })
   
});


app.post('/resetpassword', function(req, res) {
      
       var user = new User(); 
       var randompassword = Math.random().toString(36).substring(7)      

       user.email = req.body.resetEmail;
        
       User.update({email: req.body.resetEmail},{password:randompassword}, function(err, docs){
              // console.log(docs);
        if(err){ 
          console.log(err)
        }else{
            if((docs.nModified!=0)){

            passwordResetEmail(req.body.resetEmail,randompassword);

            res.send("new Password has been send to your email id") 
            }
            else{
              res.send("email is not registered with the system for password reset") 
            } 
        }


Math.random().toString(6).substring(3);
                
               // res.send(docs)                   
                 /*if(docs.length<1){

                     res.send("user not registered with the system");
                           
                  }else{

                      {{password:'123'}}
                      res.send("password update 12");

                  }*/

          })

            /*User.findOneAndUpdate({ email: user.email }, { username: 'starlord88' }, function(err, user) {
            if (err) throw err;

            // we have the updated user returned to us
            console.log(user);
          });*/
   
});






var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "lostpeopleofindia@gmail.com",
       pass: "gkv12345"
   }
});




 function welcomeEmail(emailAddress){

  smtpTransport.sendMail({  //email options
     from: "delveinnovation@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
     to: emailAddress, // receiver
     subject: "Registration complete", // subject
     text: "Thanks a lot for the registration of lostpeopleofindia." // body
  }, function(error, response){  //callback
     if(error){
         console.log(error);
     }else{
         console.log("Message sent: " + response.message);
     }
     
     smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
  });

}

function passwordResetEmail(emailAddress, newpassword){

  smtpTransport.sendMail({  //email options
     from: "delveinnovation@gmail.com", // sender address.  Must be the same as authenticated user if using Gmail.
     to: emailAddress, // receiver
     subject: "Password reset", // subject
     text: "your new password is "+newpassword // body
  }, function(error, response){  //callback
     if(error){
         console.log(error);
     }else{
         console.log("Message sent: " + response.message);
     }
     
     smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
  });

}



app.listen(3000);