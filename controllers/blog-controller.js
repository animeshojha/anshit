const Blog = require("../model/Blog");

const getAllBlogs = async(req,res)=>{
    let blogs;
    try{
        blogs = await Blog.find();
        if(!blogs){
            return res.status(404).json({message:"No blogs found"})
        }
        return res.status(200).json({blogs})

    }
    catch(err){
        return console.log(err);
    }
   
}

const addBlog = async(req,res)=>{
    const {title,description,image,user}=req.body;
   
    const blog= new Blog({
        title,
        description,
        image,
        user
    });
    try{
       await blog.save();
    }catch(err){
        return console.log(err);
    }
    return res.status(200).json({blog})
};

const updateBlog = async(req,res)=>{
    const {title,description}=req.body;
    const blogId = req.params.id
    let blog;
    try{
        blog = await Blog.findOneAndUpdate(blogId,{
            title,description
        })
    } catch (err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update the blog"})
    }
    return res.status(200).json({blog})
}


module.exports = {
    getAllBlogs,
    addBlog,
    updateBlog
  };
  