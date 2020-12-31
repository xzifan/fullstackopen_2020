const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user',{ username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const item = await Blog.findById(request.params.id)
    if (item) {
        response.json(item)
    } else {
        response.status(404).end()
    }
})

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

blogsRouter.post('/', async (request, response) => {
    // const token = getTokenFrom(request)
    if (!request.token){
        return response.status(401).json({error:'Token missing'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
    const blog = new Blog({
        ...request.body,
        user:user._id
    })
    const res = await blog.save()
    console.log (blog,res)
    user.blogs = user.blogs.concat(res._id)
    await user.save()

    response.json(res)
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token){
        return response.status(401).json({error:'Token missing'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const item = await Blog.findById(request.params.id)
    if (item){
        if (user._id.toString() === item.user.toString()){
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        }           
        else response.status(400).json({error:'No acess to delete this blog'})
    }else response.status(404).json({error:'Item not found'})
})

blogsRouter.put('/:id', async (request, response) => {
    if (!request.token){
        return response.status(401).json({error:'Token missing'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'Token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const item = await Blog.findById(request.params.id)
    if(item){
        if (user._id.toString() === item.user.toString() || (request.body.title===item.title&&request.body.author===item.author&&request.body.url===item.url)){
            let res = await Blog.findByIdAndUpdate(request.params.id, request.body)
            response.status(200).json(res)
        }else response.status(400).json({error:'No acess to modify this blog'})
    }else response.status(404).json({error:'Item not found'})
        
})

module.exports = blogsRouter