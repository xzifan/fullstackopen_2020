const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('get blog data',()=>{
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
        const result = await api
            .get(`/api/blogs/${blog.id}`)
            .expect(200)
    
        const processedBlog = JSON.parse(JSON.stringify(blog))
    
        expect(result.body).toEqual(processedBlog)
    })
})

describe('test adding a blog ',()=>{
    let token = null
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()

        const res = await api.post('/api/login').send({ username: 'root', password: 'password' })
        token = res.body.token
    })
    test('blogs should be created with http POST requests with authentication', async () => {
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'jest',
            likes: 0,
            url: 'www.randomurl.com'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(200)
    
        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(b=>b.title)
        expect(blogsAtEnd).toHaveLength(1)
        expect(titles).toContain('async/await simplifies making async calls')
    })

    test('0 as default value for likes', async()=>{
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'jest',
            url: 'www.randomurl.com'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(200)

        const blogs = await helper.blogsInDb()
        expect(blogs[0].likes).toBe(0)
    })
    test('400 Bad Request for objects with undefined url or title', async()=>{
        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send({
            title:'a blog with no url'
        }).expect(400)

        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send({
            url:'www.ablogwithouttitle.com'
        }).expect(400)

        await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send({}).expect(400)
    })
})

describe('deleting a blog  ',()=>{
    var token = null
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()

        const res = await api.post('/api/login').send({ username: 'root', password: 'password' })
        token = res.body.token
    
        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'jest',
            url: 'www.randomurl.com'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
    })

    test('a specific existing blog can be deleted with its creator account', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDeleteId = blogsAtStart[0].id
        await api
            .delete(`/api/blogs/${blogToDeleteId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(0)
    })

    test('respond with 401 if not authorized', async ()=>{
        const id = await helper.nonExistingId()
        await api
            .delete(`/api/blogs/${id}`)
            .expect(401)
    })

    test('deletion cannot be done by user other than its creator', async()=>{
        const blogsAtStart = await helper.blogsInDb()
        const blog = blogsAtStart[0]

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'new_user', passwordHash })
        await user.save()
        
        const res = await api.post('/api/login').send({ username: 'new_user', password: 'secret' })
        const newtoken = res.body.token

        
        await api
            .delete(`/api/blogs/${blog.id}`)
            .set('Authorization', `Bearer ${newtoken}`)
            .expect(400)
    })
})

describe('updating a blog',()=>{
    let token = null
    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()

        const res = await api.post('/api/login').send({ username: 'root', password: 'password' })
        token = res.body.token

        const newBlog = {
            title: 'async/await simplifies making async calls',
            author: 'jest',
            url: 'www.randomurl.com'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
    })
    test('the likes of a specific existing blog can be increased by the creator', async()=>{
        const blogsAtStart = await helper.blogsInDb()
        const blog = blogsAtStart[0]
        const update = {
            likes:blog.likes+1
        }
        await api
            .put(`/api/blogs/${blog.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(update)
            .expect(200)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes).toBe(update.likes)
    })
    test('the title of a specific existing blog can be updated by the creator', async()=>{
        const blogsAtStart = await helper.blogsInDb()
        const blog = blogsAtStart[0]
        const update = {
            title:'new title for the blog'
        }
        await api
            .put(`/api/blogs/${blog.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(update)
            .expect(200)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].title).toBe(update.title)
    })

    test('update cannot be done by user other than its creator', async()=>{
        const blogsAtStart = await helper.blogsInDb()
        const blog = blogsAtStart[0]
        const update = {
            title:'new title for the blog',
            likes:1,
            url:''
        }
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'new_user', passwordHash })
        await user.save()

        const res = await api.post('/api/login').send({ username: 'new_user', password: 'secret' })
        const newtoken = res.body.token

        await api
            .put(`/api/blogs/${blog.id}`)
            .set('Authorization', `Bearer ${newtoken}`)
            .send(update)
            .expect(400)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})