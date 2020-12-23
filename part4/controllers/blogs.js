const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const res = await blog.save()
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