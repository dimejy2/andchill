var express = require('express');
var router = express.Router();
var Activity = require('../models/activity.js'); 

/* GET home page. */
//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});


router.route('/')
//adds a new activity to the database
.post(function(req, res){
    
    for(var i in req.body){
        console.log(i); 
        req.name = i; 
    }
     
    console.log(req.name); 
     var activity = new Activity(); 
     activity.name = req.name.toLowerCase(); 
        
     activity.save(function(err){
         if(err){                                                    
             if(err.code == 11000 ) {                                                                
                 return res.json({ success : false, message :'that activity is already in the database'}); 
             }                                                                                       
             return res.send(err);                                                                   
         }                                                                                           
         return res.json({ message : 'Activity Added'});    
     }); 

})
//retrieves a new activity from the database
.get(function(req, res){
    Activity.random(res); 
}); 


//gets all activities from the db
router.get('/all', function(req, res){
    //res.send('this has not been implemented yet and probably won\'t be :P'); 

    Activity.find().exec(function(err, allusers){
        if(err) res.send(err); 

        res.send(allusers); 
    }); 

}); 

router.delete('/all', function(req, res){
    Activity.remove({}, function(err){
        if(err) res.send(err); 
        res.send('all activities removed'); 
    })
}); 


module.exports = router;
