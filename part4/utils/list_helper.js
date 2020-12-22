const blog = require('../models/blog')

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const reducer = (sum,item) => sum+item.likes
    return blogs.reduce(reducer,0)
}

const favoriteBlog = (blogs)=>{
    if (blogs.length >0){
        const favBlog = blogs.reduce((prev,curr)=>{
            if (curr.likes>prev.likes)
                return curr
            else return prev
        })
        delete favBlog.__v
        delete favBlog._id
        delete favBlog.url
        return favBlog
    } else return null
}

const mostBlogs = (blogs) => {
    if (blogs.length ==0) return null
    var authors = []
    var count = []
    for (let i =0;i<blogs.length;i++){
        let item = blogs[i]
        let authorIndex = authors.indexOf(item.author)     
        if (authorIndex!=-1) count[authorIndex]++
        else {authors.push(item.author);count.push(1)}
    }
    var topCount = 0
    var name = ''
    for (let i=0;i<count.length;i++){
        if (count[i]>topCount){
            topCount = count[i]
            name = authors[i]
        }
    }
    var author = {
        author:name,
        blogs:topCount
    }
    return author
}

const mostLikes= (blogs)=>{
    if (blogs.length ==0) return null
    var authors = []
    var count = []
    for (let i =0;i<blogs.length;i++){
        let item = blogs[i]
        let authorIndex = authors.indexOf(item.author)     
        if (authorIndex!=-1) count[authorIndex]+=item.likes
        else {authors.push(item.author);count.push(item.likes)}
    }
    var topCount = 0
    var name = ''
    for (let i=0;i<count.length;i++){
        if (count[i]>topCount){
            topCount = count[i]
            name = authors[i]
        }
    }
    var author = {
        author:name,
        likes:topCount
    }
    return author
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}