var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds049150.mongolab.com:49150/basicincome_co");   

var SWARM_ACCOUNT = "rNBQcV6k1iyvAWZ3MkZmHSFT5gpo8ZDXBi"
var ACCOUNT = "rNBQcV6k1iyvAWZ3MkZmHSFT5gpo8ZDXBi"
var ACCOUNTS = []
ACCOUNTS.push(ACCOUNT)

var c = 0
swarm(ACCOUNT)
function swarm(account){
 db.collection(SWARM_ACCOUNT).find({ type:"safety_net_pathway" },function (err, doc){
        
    
        console.log(doc)
        
        for(var i =0;i<doc.length;i++){
            next(doc[i].account)
        }
        console.log(ACCOUNT)

        c++
        if(c<1){
            
for(var i=0;i<ACCOUNTS.length;i++){
            swarm()
}
        }
        else next_thing()
        })
}   
        
function next(account){
ACCOUNTS.push(account)

}


function next_thing(){
    console.log(ACCOUNTS)
    
    for(var i=0;i<ACCOUNTS.length;i++){
        create_connections(ACCOUNT, ACCOUNTS[i])
    }
}




    function create_connections(account, destination){    
        
        
        console.log(ACCOUNT)
                console.log(destination)

    // upsert dividend_pathways
    db.collection(destination).findAndModify({
        query: {type: "dividend_pathway", account: account, currency: "RES", taxRate: 0.02}, 
        update:{$set:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })
        
    // upsert safety_net pathway (mirror of dividend pathway)
    db.collection(account).findAndModify({
        query: {type: "safety_net_pathway", account: destination, currency: "RES", taxRate: 0.02}, 
        update:{$set:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })

        
   // upsert safety net (sum of all safety_net_pathways)
    db.collection(account).findAndModify({
        query: {type: "total_safety_net", currency: "RES", taxRate: 0.02}, 
        update:{$set:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })
   
   
   // upsert safety net (sum of all safety_net_pathways)
    db.collection(account).findAndModify({
        query: {type: "consumption_outside_network", currency: "RES", taxRate: 0.02}, 
        update:{$set:{total_amount:Number(Math.floor( Math.random() * 4000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
  db.collection(account).findAndModify({
        query: {type: "tax_blob", currency: "RES", taxRate: 0.02}, 
        update:{$set:{total_amount:Number(Math.floor( Math.random() * 2000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)

        })
        })
        
        
        
   
    }