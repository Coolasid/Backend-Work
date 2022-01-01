const mongoose  = require("mongoose");
const express = require("express");



const connect = () => {

    return mongoose.connect("mongodb://127.0.0.1:27017/web13");

};


//USER SCHEMA AND MODEL=>

const userSchema = new mongoose.Schema({


    firstName: { type: String, required: true},
    lastName: { type: String, required: false},
    email:{ type: String, required: true},
    gender: { type: String, required: false, default:"Male"},
    age: { type: Number, required: true},

}, {

    versionKey: false,
    timestamps: true

});

const User = mongoose.model("user", userSchema); //user => users, 





//Tags Schema and model

const tagSchema = new mongoose.Schema({


    name: { type: String, required: true},

}, {

    versionKey: false,
    timestamps: true


});

const Tag = mongoose.model("tag", tagSchema);  //tag => tags





// POST schema and model 

const postSchema = new mongoose.Schema({

    title: { type: String, required: true},
    content: { type: String, required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" ,required: true},

    tagIds: [ { type: mongoose.Schema.Types.ObjectId, ref: "tag", required: true} ]

}, {

    versionKey: false,
    timestamps: true,

})

const Post = mongoose.model("post", postSchema);



 

// comment Schema and model => 

const commentSchema = new mongoose.Schema({


    body: { type: String, required: true},
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true}
 
}, {

    versionKey: false,
    timestamps: true,

})


const Comment = mongoose.model("comment", commentSchema);



const app = express();

app.use(express.json());

/*-------REST API CRUD

get /usrs => get all users --- DONE
post /users => create a user
get /users/:id => get a single user
patch /users/:id => update a single user
delete /users/:id => delete a single user


*/


//----------------------- UESRS CRUD ----------------------------

app.get("/users", async (req, res) => {


try {

    const users = await User.find().lean().exec();

    return res.send(users);

}catch(err){
    return res.status(500).json({error: err.message});
}

});


app.post("/users", async(req, res) =>{

    // console.log(req.body);

    try{

        const user = await User.create(req.body);
        
        return res.status(201).send(user);

    }catch(err){

        return res.status(500).send(err.message);
    }


})

app.get("/users/:id", async(req, res)=>{

    try{

        const user = await User.findById(req.params.id).lean().exec();

        return res.status(200).send(user);

    }catch(err){

        return res.status(500).send(err.message);

    }

})


app.patch("/users/:id", async(req, res)=>{


    try{

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

        return res.status(201).send(user)

    }catch(err){
        return res.status(500).send(err.message);
    }

})


app.delete("/users/:id", async(req, res)=>{

    try{

        const user = await User.findByIdAndDelete(req.params.id).lean().exec()

        return res.status(200).send(user);
    }catch(err){

        return res.status(500).send(err.message); 
    }

})


// ---------------- TAGS CRUD --------------------


app.post("/tags", async(req, res) => {


    try{

        const tags = await Tag.create(req.body)
        
        return res.status(201).send(tags);

    }catch{

        return res.status(500).send(err.message);
    }

})

app.get("/tags", async(req, res)=>{

    try{

        const tags = await Tag.find().lean().exec();

        return res.status(200).send(tags);

        
    } catch (error) {
        
        return res.status(500).send(error.message);
    }

})

app.get("/tags/:id", async(req, res) => {


    try {

        const tags = await Tag.findById(req.params.id).lean().exec();

        return res.status(200).send(tags);
        
    } catch (error) {
        
        return res.status(500).send(error.message);
    }
})


app.patch("/tags/:id", async(req, res) => {

    try {

        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

        return res.status(200).send(tag);
        
    } catch (error) {
        
        return res.status(500).send(error.message);
    }

})


app.delete("/tags/:id", async(req, res)=>{

    try {

        const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(tag);
        
    } catch (error) {
        
        return res.status(500).send(error.message);
    }

})



//------------------POST CRUD --------------


app.post("/posts", async(req,res)=>{


    try {
        
        const post = await Post.create(req.body);

        return res.status(200).send(post);

    } catch (error) {
        
        res.status(500).send(error.message);
    }

})


app.get("/posts", async(req, res)=>{


    try {

        const posts = await Post.find().populate({ path:"userId", select: { firstName:1}}).populate({path:"tagIds", select:{ name:1}}). lean().exec();

        return res.status(200).send(posts);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }

})


app.get("/posts/:id", async(req, res) => {


    try {

        const post = await Post.findById(req.params.id).populate("userId").populate("tagIds").lean().exec();

        return res.status(200).send(post);

    } catch (err) {
        return res.status(500).send(err.message);
    }

})











app.listen(2345, async()=>{


    try{

        await connect();

        console.log("listening on port 2345");

    }catch(e){

        console.log(e.message);

    }

})