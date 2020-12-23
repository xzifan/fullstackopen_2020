const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (let blog of helper.initialBlogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('return all blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the first blog is about React patterns', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('React patterns')
})

test('blogs should change the default unique identifier as id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blog = blogsAtStart[0]
    console.log(blogsAtStart[0],blog)
    const result = await api
        .get(`/api/blogs/${blog.id}`)
        .expect(200)

    const processedBlog = JSON.parse(JSON.stringify(blog))

    expect(result.body).toEqual(processedBlog)
})

test('a specific blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const deleteBlog = blogsAtStart[0]
    console.log(blogsAtStart[0],"delete",deleteBlog)

    await api
        .delete(`/api/blogs/${deleteBlog.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(deleteBlog.title)
})
describe('test adding a blog',()=>{
    test('blogs should be created with http POST requests', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'jest',
            likes: 0,
            url: 'www.randomurl.com'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
    
        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(b=>b.title)
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain(
            'async/await simplifies making async calls'
        )
    })

    test('0 as default value for likes', async()=>{
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'jest',
            url: 'www.randomurl.com'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)

        const blogs = await helper.blogsInDb()
        expect(blogs[helper.initialBlogs.length].likes).toBe(0)
    })
    test('400 Bad Request for objects with undefined url or title', async()=>{
        await api.post('/api/blogs').send({
            title:'a blog with no url'
        }).expect(400)

        await api.post('/api/blogs').send({
            url:'www.ablogwithouttitle.com'
        }).expect(400)

        await api.post('/api/blogs').send({}).expect(400)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})