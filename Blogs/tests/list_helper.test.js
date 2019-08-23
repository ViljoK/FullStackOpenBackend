const listHelper = require('../utils/list_helper')
const oneBlog = [
    {
        title: 'Ruoka',
        author: 'Teppo',
        url: 'ruokaa.fi',
        likes: 13,
    }
]

const manyBlogs = [
    {
        title: 'Ruoka',
        author: 'Jussi',
        url: 'ruokaa.fi',
        likes: 13,
    },
    {
        title: 'Ruoka',
        author: 'Jussi',
        url: 'ruokaa.fi',
        likes: 2,
    },
    {
        title: 'Ruoka',
        author: 'Teppo',
        url: 'ruokaa.fi',
        likes: 15,
    },
    {
        title: 'Ruoka',
        author: 'Riku',
        url: 'ruokaa.fi',
        likes: 4,
    },
    {
        title: 'Ruoka',
        author: 'Teppo',
        url: 'ruokaa.fi',
        likes: 8,
    },
    {
        title: 'Ruoka',
        author: 'Teppo',
        url: 'ruokaa.fi',
        likes: 5,
    },
]

describe('total likes', () => {

    test('only one blog', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(13)
    })

    test('empty bloglist', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('many blogs', () => {
        const result = listHelper.totalLikes(manyBlogs)
        expect(result).toBe(47)
    })
})

describe('favorite', () => {

    test('only one blog', () => {
        const result = listHelper.favoriteBlog(oneBlog)
        expect(result).toBe(oneBlog[0])
    })

    test('empty bloglist', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })

    test('many blogs', () => {
        const result = listHelper.favoriteBlog(manyBlogs)
        expect(result).toBe(manyBlogs[2])
    })
})

describe('most blogs', () => {

    test('only one blog', () => {
        const result = listHelper.mostBlogs(oneBlog)
        expect(result).toEqual({
            author: 'Teppo',
            count: 1,
        })
    })

    test('empty bloglist', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })

    test('many blogs', () => {
        const result = listHelper.mostBlogs(manyBlogs)
        expect(result).toEqual({
            author: 'Teppo',
            count: 3,
        })
    })
})

describe('most likes', () => {

    test('only one blog', () => {
        const result = listHelper.mostLikes(oneBlog)
        expect(result).toEqual({
            author: 'Teppo',
            count: 13,
        })
    })

    test('empty bloglist', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual({})
    })

    test('many blogs', () => {
        const result = listHelper.mostLikes(manyBlogs)
        expect(result).toEqual({
            author: 'Teppo',
            count: 28,
        })
    })
})
