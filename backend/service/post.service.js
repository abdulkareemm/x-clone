
import Post from "../models/Post.js"

export const savePost = async (text,img,id)=>{
const newPost = new Post({
    user:id,
    text,
    img
})
await newPost.save()
return newPost
}