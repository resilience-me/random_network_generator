var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds049150.mongolab.com:49150/basicincome_co");   


function get_collections(callback){
    var accounts = []
    db.getCollectionNames(function(err, names) { 
        for(var i=0;i<names.length;i++){
            if(names[i].length===34)
            accounts.push(names[i])
        }
        callback(accounts)
    });
}

get_collections(do_something)

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * 30)]
}

var some_random_accounts = []
function add_some_random_accounts(accounts){
    some_random_accounts.push(accounts.randomElement())
    
    
}


function do_something(accounts){
    console.log(accounts)
    
for(var i =0;i<3;i++){
            add_some_random_accounts(accounts)

    }
    console.log(some_random_accounts)
    
    var account = accounts.randomElement()
for(var i =0;i<some_random_accounts.length;i++){
    create_connections("rNBQcV6k1iyvAWZ3MkZmHSFT5gpo8ZDXBi", some_random_accounts[i])

}
    }


    function create_connections(account, destination){    
        
        
        console.log(account)
                console.log(destination)

    // upsert dividend_pathways
    db.collection(destination).findAndModify({
        query: {type: "dividend_pathway", account: account, currency: "RES", taxRate: 0.02}, 
        update:{$inc:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })
        
    // upsert safety_net pathway (mirror of dividend pathway)
    db.collection(account).findAndModify({
        query: {type: "safety_net_pathway", account: destination, currency: "RES", taxRate: 0.02}, 
        update:{$inc:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })

        
   // upsert safety net (sum of all safety_net_pathways)
    db.collection(account).findAndModify({
        query: {type: "total_safety_net", currency: "RES", taxRate: 0.02}, 
        update:{$inc:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })
   
    }