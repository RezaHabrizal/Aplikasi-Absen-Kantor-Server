const { gql } = require('apollo-server-express')
const {Karyawan} = require('../models')

const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	type Karyawan {
		_id: ID
		name: String
		email: String
	}

	# type ResultQueryBlog {
	# 	deletedCount: Int
	# }

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		karyawan: [Karyawan]
		findOne(_id: ID): Karyawan
	}

	# input BlogInput {
	# 	blogName: String
	# 	blogDescription: String
	# 	blogDate: String
	# }

	# type Mutation {
	# 	addBlog(newBlog: BlogInput): Blog
	# 	deleteOne(_id: ID): ResultQueryBlog
	# 	updateOne(_id: ID, input: BlogInput): Blog
	# }
`

const resolvers = {
  Query: {
    karyawan: () => {
      return Karyawan.findAll()
      .then((data) => {
        console.log(data)
        return data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}