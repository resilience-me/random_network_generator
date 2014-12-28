
var RippleWallet = require('./node_modules/ripple-wallet/lib/wallet.js');

var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds049150.mongolab.com:49150/basicincome_co");   


Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * 30)]
}



var wallet = RippleWallet.getRandom();


var people = []
for (i=0; i<30; i++){
  var address = wallet.getAddress(i);
people.push(address)
  
  
}
console.log(people)
  console.log();

var myRandomElement = people.randomElement()

console.log()
var i = 0
loop()
function loop(){
  
   var address = people[i].value
  console.log(address)
  create_collection(address)
}
 


function create_collection(address){
   console.log('Adding to MongoDB:', address);
    
    function one(address){
     db.collection(address).save({
        query: {type: "bot"}, 
    }, 
        function(err,doc){
            console.log(doc)
            two(address)
        }) // a fake bot account
    }  
     
    function two(address){    
     db.collection(address).save({
        query: {type: "contract", currency: "RES", taxRate: 0.02}, 
    }, 
        function(err,doc){
            console.log(doc)
            three(address)
        })    
    }
    function three(address){
     db.collection(address).save({
        query: {type: "passport", network: "BitNation"}, 
    }, 
        function(err,doc){
            console.log(doc)
        next(address)
        }) 
    }
    one(address)
}


function next(address){
  console.log(address)

    function one(address){    
    // upsert dividend_pathways
    db.collection(address).findAndModify({
        query: {type: "dividend_pathway", account: myRandomElement.value, currency: "RES", taxRate: 0.02}, 
        update:{$inc:{total_pathway:Number(Math.floor( Math.random() * 2000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
          console.log(err)
            console.log(doc)
            two(address)
        })
    }
        function two(address){
    // upsert safety_net pathway (mirror of dividend pathway)
    db.collection(address).findAndModify({
        query: {type: "safety_net_pathway", account: myRandomElement.value, currency: "RES", taxRate: 0.02}, 
        update:{$inc:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
            three(address)
        })
}
        function three(address){
   // upsert safety net (sum of all safety_net_pathways)
    db.collection(address).findAndModify({
        query: {type: "total_safety_net", currency: "RES", taxRate: 0.02}, 
        update:{$inc:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
                    again()

        })
}
one(address)
  


function again(){
  if(i<people.length){
i++
loop()
}

}
}

    

