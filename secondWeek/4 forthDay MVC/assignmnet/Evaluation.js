const mongoose = require("mongoose");
const express = require("express");


const connect = ()=> {

    return mongoose.connect("mongodb://127.0.0.1:27017/evaluation");


};


const app = express();

app.use(express.json());



//------------Creating User SCHEMA and MODEL---------------------


const userSchema = new mongoose.Schema({


    firstName:{ type: String, required: true},
    lastName: { type: String, required: true},
    gender: { type: String, required: true},
    DOB:{ type: Date, required: true},
    
}, {

    versionKey: false,
    timestamps:true
})


const User = mongoose.model("user", userSchema);


//------------------Creating Evaluation SCHEMA and MODEL----------

const evaluationSchema = new mongoose.Schema({

    DateOfEvaluation:{type: Date, required:true, default: Date.now },
    instructor: { type: String,  required:true },
    topicName:{ type: String, required: true},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    marks:{ type: Number, required: true}

},{

    versionKey:false,
    timestamps:true
})

const Evaluation = mongoose.model("evaluation", evaluationSchema);



//--------------------Creating Students SCHEMA and MODEL----------


const studentSchema = new mongoose.Schema({

    rollId: { type: String, required:true},
    currentBatch: { type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"user", required: true },
    evaluationIds : [{ type: mongoose.Schema.Types.ObjectId, ref: "evaluation", required: true}]


},{
    versionKey:false,
    timestamps:true
})

const Student = mongoose.model("student", studentSchema);

//=============================================================================




//-------------------Using CRUD on Users----------------------------



app.post("/user", async(req, res)=>{

    try {
        
        const user = await User.create(req.body);

        return res.status(201).send(user);


    } catch (e) {
        return res.status(500).send(e.message);
    }


})


app.get("/users", async(req, res)=>{


    try {
        
        const users = await User.find().lean().exec();

        return res.status(200).send(users);

    } catch (e) {
        return res.status(500).send(e.message);
    }

})


app.patch("/user/:id", async(req, res)=>{

    try {
        
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();


        return res.status(200).send(user);
    } catch (e) {
        return res.status(500).send(e.message);
    }

})



//----------------Using CRUD on Evaluation-----------------


app.post("/evaluation", async(req, res)=>{


    try {
        
        const eval = await Evaluation.create(req.body);

        return res.status(201).send(eval);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})



app.get("/evaluations", async(req, res)=>{

    try {
        
        const evals = await Evaluation.find().populate({path:"userId", select: {firstName: 1, lastName:1, _id:0}}).lean().exec();

        return res.status(200).send(evals);

    } catch (e) {
        return res.status(500).send(e.message);
    }

})


app.delete("/evaluation/:id", async(req, res)=>{

    try {
        
        const eval = await Evaluation.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(eval);
    } catch (e) {
        return res.status(500).send(e.message);
    }

})



//---------------------Using CRUD on Students-------------



app.post("/student", async(req, res)=>{


    try {
        
        const student = await Student.create(req.body);

        return res.status(201).send(student);
    } catch (e) {
        return res.status(500).send(e.message);
    }


})



app.get("/students", async(req, res)=>{


    try {
        
        const students = await Student.find().populate({ path:"evaluationIds", select: {topicName:1, marks:1}}).populate({path: "userId", select:{ firstName:1, lastName:1}}).lean().exec();

        return res.status(200).send(students);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

app.patch("/student/:id", async(req, res)=>{


    try {

        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();

        return res.status(200).send(student)

    } catch (e) {
        return res.status(500).send(e.message);
    }

})




//-------------------fetch all students who gave a particular evaluation-----


app.get("/evalGiven/D1", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "D1"}).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})


app.get("/evalGiven/D2", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "D2"}).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})



app.get("/evalGiven/D3", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "D3"}).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

app.get("/evalGiven/D4", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "D4"}).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

app.get("/evalGiven/C1", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "C1"}).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

app.get("/evalGiven/C2", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "C2"}).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})





//---------------------fetch the student with his personal details who scored the highest mark in the evaluation--------



app.get("/eval/D1", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "D1"}).sort({marks:-1}).limit(1).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})


app.get("/eval/D2", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "D2"}).sort({marks:-1}).limit(1).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})



app.get("/eval/D3", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "D3"}).sort({marks:-1}).limit(1).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

app.get("/eval/D4", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "D4"}).sort({marks:-1}).limit(1).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

app.get("/eval/C1", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "C1"}).sort({marks:-1}).limit(1).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})

app.get("/eval/C2", async(req, res)=>{


    try {

        const eval = await Evaluation.find({topicName: "C2"}).sort({marks:-1}).limit(1).populate({path:"userId", select:{firstName:1, lastName:1, _id:0}}).lean().exec();


        return res.status(200).send(eval);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

})









app.listen(2345, async()=>{


    try {
        
        await connect();

        console.log("Listening on port 2345");

    } catch (e) {
        console.log(e.message);
    }


})