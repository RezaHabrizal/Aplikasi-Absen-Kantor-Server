const express= require('express')
const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema/karyawan')

async function startApolloServer() {
  const app = express()
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  await server.start()

  server.applyMiddleware({ app })

  await new Promise(resolve => app.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}

startApolloServer()