var Coffee = require('../models/coffee');

exports.emptyCoffee = function(req,res){
    res.status(200).json({message: "You are dangerously running low on Coffee!"})
};

// Create endpoint /api/coffee for POSTS
exports.postCoffees = function(req,res){
// Create a new instance of the Coffee model
    var caffeine = new Coffee();
// Set the coffee properties that came from the POST data
    caffeine.name = req.body.name;
    caffeine.type = req.body.type;
    caffeine.quantity = req.body.quantity;
// Save the coffee and check for errors
    caffeine.save(function(err){

        if(err){
            res.status(301).send({err : "Something went Wrong"})
        }
        res.status(200).json({message : "One of the coffee's added to your collection !",data : caffeine})
    })
};

// Create endpoint /api/coffee for GET
exports.getCoffees = function(req,res){
// Use the Coffee model to find a specific coffee
    Coffee.find(function(err,items){
        
        if(err){
            res.send(err)
        }
        if(!err && res){
            res.status(200).json({message:"Yo! We finded our Coffee for tonights Chilling party",lookup : items})
        }
    })
};

// Create endpoint /api/coffee/:coffee_id for GET
exports.getCoffee = function(req,res){
// Use the Coffee model to find a specific coffee
    Coffee.findById(req.params.coffee_id,function(err,item){

        if(err){
            res.send(err)
        }
        if(item){
            res.status(200).json(item)
        }
    })
};

// Create endpoint /api/coffee/:coffee_id for PUT
exports.putCoffee = function(req,res){
    Coffee.findById(req.params.coffee_id,function(err,caffeine){
        if(err){
            res.send(err)
        }
        // Update the existing coffee quantity
        caffeine.quantity = req.body.quantity
        // Save the coffee and check for errors
        caffeine.save(function(err){
            if(err){
                res.send(err)
            }
            res.status(200).json({message: "Coffee Updated",data : caffeine})
        })
    })
};

// Create endpoint /api/coffee/:coffee_id for DELETE
exports.deleteCoffee = function(req,res){
    // Use the Coffee model to find a specific coffee and remove it
    Coffee.findByIdAndRemove(req.params.coffee_id,function(err,item){
        
        if(err){
            res.send(err)
        }
        if(!item){
            res.status(404).json({success : false,message : "Not Found" })
        }
        res.status(201).json({message : "Coffee Successfully Deleted"})
    })
};
