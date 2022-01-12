
 const getAll = (model, page) => async(req, res)=>{

    try {

        const items = await model.find().lean().exec();

        // return res.status(200).send(items);

         return res.render(page, {

            items: items,

         } )
        
    } catch (e) {

        return res.status(500).send(e.message)

    }

 }

 const post = (model) => async(req, res)=>{

    try {

        console.log(req.body);

        const item = await model.create(req.body);

        return res.status(201).send(item);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

 }


 const getOne = (model) => async(req, res)=>{

    try {
        const item = await model.findById(req.params.id).lean().exec();


        return res.status(200).send(item);
        
    } catch (e) {
        return res.status(500).send(e.message)
    }

 }

 const updateOne = (model, page)=> async(req, res)=>{

    try {
        const item = await model.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();

        // return res.status(200).send(item);

        const items = await model.find().lean().exec();

        return res.render(page, {items: items})
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

 }

 const deleteOne = (model) => async(req, res)=>{


    try {
        const item = await model.findByIdAndDelete(req.params.id).lean().exec();

        return res.status(200).send(item);
        
    } catch (e) {
        return res.status(500).send(e.message);
    }

 }


 module.exports = (model, page = null)=>({

    get: getAll(model, page),
    post: post(model),
    getOne: getOne(model),
    updateOne: updateOne(model, page),
    deleteOne: deleteOne(model)
    
 });