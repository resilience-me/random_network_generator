var RippleRestClient = require("ripple-rest-client")
var ripple = require('ripple-lib')
var Amount = require('ripple-lib').Amount;
var VaultClient = new ripple.VaultClient()
var remote = new ripple.Remote({
  // see the API Reference for available options
  servers: [ 'wss://s1.ripple.com:443' ]
})
remote.connect(function() {
  /* remote connected */
  remote.requestServerInfo(function(err, info) {
    // process err and info
  });
});
var AMOUNT = Amount.from_human('20XRP');
var Client = RippleRestClient.Client

var mongojs = require("mongojs")
var db = mongojs("mongodb://guest:guest@ds049150.mongolab.com:49150/basicincome_co");   





const options = {
  api: 'https://api.ripple.com/',
  account: 'rhWLSyUd1mpkjL1DsreSg2hZJAvnVdqfkd',
  secret: 'snNpKwUeVRtnZenjPtp2QHX1BUwjf' 
}// set the currency gateway
var client = new RippleRestClient(options);

var NAME = "jesper-zabell"
var EMAIL = "emailsare.obsolete@gmail.com"

//create account
function create_account(){
client.generateNewWallet(print)

function print(err, data){
    console.log(data)
    send_payment(data.address, data.secret) }
}

//fund account

function send_payment(destination, secret){
console.log("hej")
    remote.setSecret(options.account, options.secret);
    var transaction = remote.createTransaction('Payment', {
      account: options.account,
      destination: destination,
      amount: AMOUNT
    });
    transaction.on('resubmitted', function() {
    });
    transaction.submit(function(err, res) {
         if (err){
        console.log(err) 
         }
         else console.log(res);
    });
    
    name_account(secret, destination)
}
// name account
function name_account(secret, account){
    console.log("hej")
    var options = {
        username:"johanteppmark",
        password:"asd123",
        masterkey: secret,
        email: EMAIL
        //activateLink: 
    }
 VaultClient.register(options, function(err, blob){console.log(blob), add_to_test_accounts_list(blob.username, options.password, account, secret)})
 add_trust_line(account)
}
//create trustLines

function add_trust_line(account){

var params = {

api: 'https://api.ripple.com',
account:"rhWLSyUd1mpkjL1DsreSg2hZJAvnVdqfkd",
secret:"snNpKwUeVRtnZenjPtp2QHX1BUwjf",
limit:10000000,
currency:"RES",

counterparty: account}

client.setTrustLines(params, a)

function a(data){console.log(data)}

    
}


// add to test-accounts list

function add_to_test_accounts_list(username, password, address, secret){
 db.collection("test-accounts").save(
     
     { account: address, secret: secret, username:username, password:password}, 
        function(err,doc){
            console.log(doc)
        }) 
    }  
    
    
//email-activate manually:
//https://www.rippletrade.com/#/register/activate/ {activation link from email here}

/*
ACCOUNTS: 
ericSvensson
jensLekman
miamarianygren
bipedaljoe
norrsken-gay
carl-meiton
david-nordemar
skateking22
davidberta
johanteppmark
*/