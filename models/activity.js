mongoose = require('mongoose'),                                                                                                                        
      Schema = mongoose.Schema;                                                                          
var ActivitySchema = new Schema({                                                                       
    name : {type :String, index : {unique : true}},                                                                                      
    __v: {type: Number, select: false}                                                                 
});                                                                                                    
ActivitySchema.statics.random = function(res){
    this.count(function(err, count) {
        if (err) {
              return res.send(err);
            }
        var rand = Math.floor(Math.random() * count);
        this.findOne().skip(rand)
            .exec(function(err, activity){
                if(err) {
                    return res.send(err); 
                }
                console.log(activity); 
                if(!activity) activity = "netflix"; 
                message = activity.name +" and chill.";
                console.log(message); 
                res.send(message); 
        });
    }); 

}                                                                                                       
                                                                                                       
module.exports = mongoose.model('Activity',ActivitySchema);   

