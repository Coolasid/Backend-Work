

const mongoose = require("mongoose");
const express = require("express");


const connect = ()=>{

    return mongoose.connect("mongodb://127.0.0.1:27017/library")

};

//AUTHOR SCHEMA AND MODEL=>

const authorSchema = new mongoose.Schema({

    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age:{ type: Number, required:false},
    

},{
    versionKey: false,
    timestamps: true
})

const Author = mongoose.model("author", authorSchema);



//BOOKS SCHEMA AND MODEL=>

const booksSchema = new mongoose.Schema({

    title: { type: String, required: true},
    content: { type: String, required: true},
    yearOfPublished: {type: Number, required: false, default:2021},
    authorIds:[{type: mongoose.Schema.Types.ObjectId, ref:"author", required: true}],
    sectionId:{ type: mongoose.Schema.Types.ObjectId, ref:"section", required: true},
    checked:{ type: Boolean, required:true, default:false}
    

},{
    versionKey: false,
    timestamps:true
})

const Book = mongoose.model("book", booksSchema);




//SECTION SCHEMA AND MODEL=>

const sectionSchema = new mongoose.Schema({


    sectionName: { type: String, required: true},

},{

    versionKey: false,
    timestamps: true

});

const Section = mongoose.model("section", sectionSchema);



const app = express();

app.use(express.json());


//--------------CRUD on SECTION----------------



app.post("/section", async(req, res)=>{

    try {

        const section = await Section.create(req.body)

        return res.status(201).send(section);
        
    } catch (error) {
        return res.status(500).send(error.message);
    }


})

app.get("/section", async(req,res)=>{


    try {

        const sections = await Section.find().lean().exec();

        return res.status(200).send(sections);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

// app.get("/section/Maths", async(req, res)=>{




// })



//------------CRUD on Author---------------


app.post("/author", async(req, res)=>{


    try {

        const author = await Author.create(req.body);

        return res.status(201).send(author);
        
    } catch (e) {
        
        return res.status(500).send(e.message);
    }

})

app.get("/author", async(req, res)=>{

    try {
        const authors = await Author.find().lean().exec();

        return res.status(200).send(authors);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})




//---------------BOOKS CRUD--------------


app.post("/book", async(req, res)=>{

    try {

        const book = await Book.create(req.body);

        return res.status(200).send(book);
        
    } catch (e) {
        return res.status(500).res(e.message);
    }


})


app.get("/book", async(req, res)=>{


    try {

        const books = await Book.find().populate({path:"authorIds", select:{firstName:1, lastName:1}}).populate({path:"sectionId", select:{sectionName:1}}).lean().exec();

        return res.status(200).send(books);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

app.delete("/book/:id", async(req, res)=>{

    try {

        const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

        return res.send(200).send(book);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }


})

app.patch("/book/:id", async(req, res)=>{


    try {
        
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

        return res.status(200).send(book);

    } catch (e) {
        return res.status(500).send(e.message);
    }
})




//-----------find books that are checked out----------

app.get("/checkOutBooks", async(req, res)=>{


    try {
        
        const checkOutBooks = await Book.find({checked: { $eq:true}}).lean().populate({path:"authorIds", select:{firstName:1, lastName:1, _id:0}}).populate({path:"sectionId", select:{sectionName:1, _id:0}}).exec()


        return res.status(200).send(checkOutBooks)
    } catch (e) {
        return res.status(500).send(e.message);
    }

})


//-----------------find all books written by an author-----------


app.get("/allBooksOfAnAuthor/:id", async(req, res)=>{

    try {
        
        const allBooksOfAnAuthor = await Book.find({authorIds: { $eq: req.params.id}}).populate({path:"authorIds", select:{firstName:1, lastName:1} }).populate({path:"sectionId", select:{sectionName:1}}).lean().exec();

        return res.status(200).send(allBooksOfAnAuthor);

    } catch (e) {
        return res.status(500).send(e.message);
    }

})


//----------------------find books in a section--------------

app.get("/books/:id", async(req, res)=>{

    try {

            const books = await Book.find({sectionId: { $eq: req.params.id}}).lean().exec();

            return res.status(200).send(books);
        
        
    } catch (e) {
        return res.status(500).send(e.message);
    }


})


//---------------------------find books in a section that are not checked out------


app.get("/notCheckoutBooks", async(req, res)=>{


    try {
        
        const presentBooks = await Book.find({checked: { $eq: false}}).lean().exec();

        return res.status(200).send(presentBooks);
    } catch (e) {
        return res.status(500).send(e.message);
    }


})



//--------------------------find books of 1 author inside a section---------------


app.get("/booksOfAnAuthor/:id1/:id2", async(req, res)=>{

// console.log(req.params.id);
    try {
        
        const books = await Book.find({ $and: [{ sectionId: { $eq: req.params.id1}}, { authorIds: { $eq: req.params.id2}} ]}).lean().exec();


        return res.status(200).send(books);


    } catch (e) {
        return res.status(500).send(e.message);
    }

})






app.listen(2345, async()=>{


    try {

        await connect();

        console.log("listening on port 2345");
        
    } catch (error) {
        console.log(error.message);
    }

})