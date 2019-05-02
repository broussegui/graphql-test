const { GraphQLServer } = require('graphql-yoga')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

/*const typeDefs = `
  type Query {
    hello(name: String): String
  }
`*/

const opts = {
  port: 4000 //configurable port no
}



const server = new GraphQLServer({ typeDefs, resolvers, opts })
server.start(() => console.log(`Server is running at http://localhost:${opts.port}`))