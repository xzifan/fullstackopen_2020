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
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}