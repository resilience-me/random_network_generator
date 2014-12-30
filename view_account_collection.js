var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds049150.mongolab.com:49150/basicincome_co");   

var ACCOUNT = "undefinedrBTK58wwB5yGKN9gj9gUbxicZxPgHMJGgH"


 db.collection(ACCOUNT).find({  },function (err, doc){
        
    
        console.log(doc)
 })