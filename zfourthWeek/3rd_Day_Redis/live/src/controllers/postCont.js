const express = require("express");

const router = express.Router();

const Post = require("../model/postModel");

const redis = require("../configs/redis");


router.post("", async(req, res)=>{

    try {
        
        const post = await Post.create(req.body);

        const posts = await Post.find().lean().exec(); 

        redis.set("posts", JSON.stringify(posts)); //setting all posts in redis

        return res.status(201).send(post);

    } catch (e) {
        return res.status(500).send(e.message)
    }

})

//FLUSHALL=> to delete all keys;
//KEYS * => to get all the keys;
//GET nameOfKeys => to get all data inside the key a perticular key



router.get("", async (req, res) => {
  try {
    redis.get("posts", async function(err, posts){  //getting all posts

      if(err) return res.status(500).send({message: err.message});

      if(posts){  

        const allPosts = JSON.parse(posts);  //if posts is present then get all posts and parse them 

        return res.status(200).send({posts:allPosts, redis:true}); // if redis is true then all the posts are comming from redis

      }else{

        const posts = await Post.find().lean().exec(); //else first we find all the posts 

        redis.set("posts", JSON.stringify(posts)); //then set to redis
        return res.status(200).send({posts:posts, redis:false}) //then show the posts from the db and here redis is false means data is shown from database not from redis

      }

    })
  } catch (e) {
    return res.status(500).send(e.message);
  }
});



router.get("/:id", async (req, res) => {
  try {

      redis.get(`posts:${req.params.id}`, async function(err, post){

        if(err) console.log(err.message);

        if(post){
          const fetchPost = JSON.parse(post);
          return res.status(200).send({post: fetchPost, redis:true})
        }else{

          try {
            const post =  await Post.findById(req.params.id).lean().exec();
            redis.set(`posts:${req.params.id}`, JSON.stringify(post));

            return res.status(200).send({post:post, redis:false})
            
          } catch (e) {
              console.log(e.message);
          }


        }

      })
  } catch (e) {
    return res.status(500).send(e.message);
  }
});


router.patch("/:id", (req, res) => {
  try {

    redis.get(`posts:${req.params.id}`, async function(err, fetchPost){

      if(err) console.error(err.message);

      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {new:1}).lean().exec();

      redis.set(`posts.${req.params.id}`, JSON.stringify(post));

      const posts = await Post.find().lean().exec();

      redis.set("posts", JSON.stringify(posts))
      return res.status(201).send(post);

    })
  } catch (e) {
    return res.status(500).send(e.message);
  }
});


router.delete("/:id",  (req, res) => {
  try {

    redis.get(`posts.${req.params.id}`, async function(err, fetchPost){


      if(err) console.error(err.message);

      const post = await Post.findByIdAndDelete(req.params.id);

      redis.del(`posts:${req.params.id}`);

      const posts = await Post.find().lean().exec();

      redis.set("posts", JSON.stringify(posts));

      return res.status(200).send(post)

    })

  } catch (e) {
    return res.status(500).send(e.message);
  }
});


router.post("/:id/likes", (req, res)=>{

  try {

    redis.get(`posts.${req.params.id}.likes`, async function(err, likeCount){

      if(err) console.log(err.message);;

      const post = await Post.findById(req.params.id).lean().exec();

      if(likeCount){

        likeCount = +likeCount;

        likeCount += 1;

        redis.set(`posts.${req.params.id}.likes`, likeCount);

        post.likes = likeCount;

        return res.status(201).send({post, redis:true})

      }else{

        likeCount = 1;
        redis.set(`posts.${req.params.id}.likes`, likeCount);

        post.likes = likeCount;

        return res.status(201).send({post, redis:false});

      }


    })
    
  } catch (e) {
    return res.status(500).send(e.message)
  }



})




module.exports = router;
