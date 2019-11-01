const Blog = require('../models/blog')

const initialBlogs = [
    {
        author: 'Jussi J',
        title: 'RuokaBlogi',
        url: 'ruokaa.fi',
        likes: 4,
        userId: '5dbc29eaa5abee6d15c98af4',
    },
    {
        author: 'Jussi J',
        title: 'Kalahommia',
        url: 'kalaa.fi',
        likes: 6,
        userId: '5dbc29eaa5abee6d15c98af4',
    },
    {
        author: 'Jarmo K',
        title: 'AutoiluBlogi',
        url: 'jarmoajelee.fi',
        likes: 14,
        userId: '5dbc2a0ba5abee6d15c98af5',
    },
    {
        author: 'Keijo K',
        title: 'Metsästysjuttuja',
        url: 'metsalle.fi',
        likes: 2,
        userId: '5dbc2a0ba5abee6d15c98af5',
    },
]

const insertBlog = {
    author: 'Kalle K',
    title: 'Sienestys',
    url: 'sienimetsalle.fi',
    userId: '5dbc2a0ba5abee6d15c98af5',
}

const invalidBlog = {
    author: 'Kalle K',
    likes: 12,
}

const nonExistingId = async () => {
    const blog = new Blog(initialBlogs[0])
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

module.exports = {
    initialBlogs,
    insertBlog,
    invalidBlog,
    nonExistingId,
    blogsInDb,
}