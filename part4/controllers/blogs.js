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
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    let item = {
        content: body.content,
        important: body.important,
    }

    let res = await Blog.findByIdAndUpdate(request.params.id, item, { new: true })
    response.json(res)
})

module.exports = blogsRouter