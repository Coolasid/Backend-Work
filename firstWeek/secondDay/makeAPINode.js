let http = require("http");

let server = http.createServer((req, res) =>{


    if( req.url == "/users" && req.method == "GET"){

        res.write("GET Welcome");
        res.end();

    }else if(req.url == "/users" && req.method == "POST"){

        res.write("POST Welcome")
        res.end();
    }

})


server.listen(8000, () =>{


    console.log("listening on port");

});