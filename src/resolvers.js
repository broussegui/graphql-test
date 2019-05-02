const fetch = require('node-fetch')

const get = async (name, id = null) => {
  let data = []
  if (id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${name}?id=${id}`)
    data = await response.json()
  } else {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${name}`)
    data = await response.json()
  }
  return data
}

const getWith = async (name, join, id = null) => {
  let datas = await get(name, id)
  let joinDatas = []
  if (id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}/${join}`)
    joinData = await response.json()
  } else {
    joinData = await get(join)
  }

  const joinKey = name.slice(0, -1) + 'Id'

  datas = datas.map((data) => ({
    ...data,
    [join]: joinData.filter(joinData => joinData[joinKey] === data.id)
  }))

  return datas
}


const resolvers = {
  Query: {
    users: async (_, { id }, ctx, info) => { 
      let users = await getWith('users', 'todos')

      const posts = await getWith('posts', 'comments')
      users = users.map((user) => ({
        ...user, 
        posts: posts.filter(post => post.userId === user.id)
      }))

      const albums = await getWith('albums', 'photos')
      users = users.map((user) => ({
        ...user, 
        albums: albums.filter(album => album.userId === user.id)
      }))

      return users
    },
    albums: async (_, { id }) => {
      return await getWith('albums', 'photos', id)
    },
    photos: async (_, { id }) => {
      return await get('photos', id)
    },
    todos: async (_, { id }) => {
      return await get('todos', id)
    },
    comments: async (_, { id }) => {
      return await get('comments', id)
    },
    posts: async (_, { id }) => {
      return await getWith('posts', 'comments', id)
    }
  },
}

module.exports = resolvers