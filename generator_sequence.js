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
    
    //get taxRate
     db.collection(address).save({
        query: {type: "contract", currency: "RES", taxRate: 0.02}, 
    }, 
        function(err,doc){
            console.log(doc)
        })    
    


    //get taxRate
     db.collection(address).save({
        query: {type: "passport", network: "BitNation"}, 
    }, 
        function(err,doc){
            console.log(doc)
        })    
        add(address)
}


function add(adress){
  

    function adddd(){    
    // upsert dividend_pathways
    db.collection(address).findAndModify({
        query: {type: "dividend_pathway", account: myRandomElement.value, currency: "RES", taxRate: 0.02}, 
        update:{$inc:{total_pathway:Number(Math.floor( Math.random() * 2000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })
        
    // upsert safety_net pathway (mirror of dividend pathway)
    db.collection(address).findAndModify({
        query: {type: "safety_net_pathway", account: myRandomElement.value, currency: "RES", taxRate: 0.02}, 
        update:{$inc:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })

        
   // upsert safety net (sum of all safety_net_pathways)
    db.collection(address).findAndModify({
        query: {type: "total_safety_net", currency: "RES", taxRate: 0.02}, 
        update:{$inc:{total_pathway:Number(Math.floor( Math.random() * 200000 ) )}}, 
        upsert: true,
        new: true
        
    }, 
        function(err,doc){
            console.log(doc)
        })
        again()
}

function again(){
  if(i<people.length){
i++
loop()
}
}
}

    

