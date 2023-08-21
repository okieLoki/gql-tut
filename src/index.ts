import 'dotenv/config'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { prismaClient } from './lib/db'

const init = async () => {
    const app = express()
    const PORT = Number(process.env.PORT) || 3000

    app.use(express.json())

    const gqlserver = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
            type Mutation {
                createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello I am a gql server',
                say: (_, { name }: { name: string }) => `Hello ${name}`
            },
            Mutation: {
                createUser: async (_, {
                    firstName,
                    lastName,
                    email,
                    password
                }: {
                    firstName: string,
                    lastName: string,
                    email: string,
                    password: string
                }) => {
                    await prismaClient.user.create({
                        data: {
                            firstName,
                            lastName,
                            email,
                            password,
                            salt: 'random_salt'
                        }
                    })
                    return true
                }   
            }
        }
    })

    await gqlserver.start()

    app.use('/graphql', expressMiddleware(gqlserver))

    app.get('/', (req, res) => {
        res.json({
            message: 'Server is up and running'
        })
    })

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
}

init()



