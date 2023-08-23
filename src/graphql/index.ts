import {ApolloServer} from '@apollo/server'
import { User } from './user'

const createApolloServer = async () => {
    const gqlserver = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
            type Mutation {
                ${User.mutations}
            }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        }
    })

    // start the apollo server
    await gqlserver.start()

    return gqlserver
}

export default createApolloServer