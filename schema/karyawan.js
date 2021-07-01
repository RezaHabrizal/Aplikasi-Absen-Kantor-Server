const { gql } = require('apollo-server-express')
const EmployeeController = require('../controllers/EmployeeController')

const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	type Karyawan {
		id: Int
		name: String
		email: String
    divisi: String
    status: String
	}

  type History {
    id: Int
    email: String
    status: String
    createdAt: String
  }
	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		getAllKaryawan: [Karyawan]
		findOne(email: String): Karyawan
    findHistory(email: String): [History]
	}

  input KaryawanInput {
    email: String
    password: String
    name: String
    divisi: String
    status: String
  }

  type Mutation {
    findOneOrCreate(email: String, password: String): Karyawan
    updateOne(email: String, input: KaryawanInput): Karyawan
    updateProfile(email: String, name: String, divisi: String): Karyawan
    updateStatus(email: String, status: String): Karyawan
  }
`

const resolvers = {
  Query: {
    getAllKaryawan: () => {
      return EmployeeController.findAll()
    },
    findHistory: (_, args) => {
      return EmployeeController.findHistory(args.email)
    }
  },
  Mutation: {
    findOneOrCreate: (_, args) => {
      return EmployeeController.login(args.email, args.password)
    },
    updateProfile: (_, args) => {
      const input = {
        email: args.email,
        name: args.name,
        divisi: args.divisi
      }
      return EmployeeController.updateProfile(input)
    },
    updateStatus: (_, args) => {
      return EmployeeController.updateStatus(args.email, args.status)
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}