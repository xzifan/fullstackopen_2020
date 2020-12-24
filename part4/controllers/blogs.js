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

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogsRouter.post('/', async (request, response) => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    
    const blog = new Blog({
        ...request.body,
        user:user._id
    })
    const res = await blog.save()
    user.blogs = user.blogs.concat(res._id)
    await user.save()

    response.json(res)
})

blogsRouter.delete('/:id', async (request, response) => {
    const item = await Blog.findByIdAndRemove(request.params.id)
    if (item)
        response.status(204).end()
    else response.status(404).end()
})

blogsRouter.put('/:id', async (request, response) => {
    let res = await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.json(res)
})

module.exports = blogsRouter