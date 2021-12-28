let express = require("express");

let mongoose = require("mongoose");

// we have to do 3 steps=>


// 1 actually connecting mongodb with express

let connect = ()=>{

    return mongoose.connect("mongodb://127.0.0.1:27017/MovieAssignment")

}


// 2 build the schema


let userSchema = new mongoose.Schema({

    id: {type: Number, required: true},
    movieName: {type: String, required: true},
    movie_genre: {type: String, required: false},
    production_year: {type: Number, required: true},
    budget: {type: Number, required: true}

})

// 3 build the model (neat way to write db.movie => Movie )

let Movie = mongoose.model("movie", userSchema)

// console.log(Movie);



const app = express();


app.get("/movie", async (req, res)=>{

    let movies = await Movie.find().lean().exec() 
    //db.movie => mongoose object , lean() convets mongoos object to json obj and exec() return full promise 
    // console.log(movie);
    return res.send(movies);
});


app.listen(2345, async ()=>{
    

   await connect();
   
    console.log("listening on port 2345");

})