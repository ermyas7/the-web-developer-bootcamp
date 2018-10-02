var request = require("request");

request("https://q0ak%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(error, response, body){
   const parsedBody = JSON.parse(body);
   if(!error && response.statusCode == 200){
        console.log(parsedBody.query.results.channel.item.condition.temp);    
   }else{
       console.log(error);
   }   
    
    });

// request.listen(process.env.PORT, function(){
//     console.log("server running");
// })