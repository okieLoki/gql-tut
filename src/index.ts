import 'dotenv/config'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import createApolloServer from './graphql'

const init = async () => {
    const app = express()
    const PORT = Number(process.env.PORT) || 3000

    app.use(express.json())

    app.use('/graphql', expressMiddleware(await createApolloServer()))

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



