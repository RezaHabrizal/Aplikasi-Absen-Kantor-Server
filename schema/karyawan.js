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
    updatedAt: String
	}

  type History {
    id: Int
    email: String
    status: String
    createdAt: String
  }

  type Status {
    status: String
  }

  type Subscription {
    statusUpdated: Status
  }

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
    updateProfile(email: String, name: String, divisi: String, status:String): Karyawan
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
        divisi: args.divisi,
        status: args.status
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