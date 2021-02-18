'use strict'

const { buildSchema } = require('graphql')
const app = require('express')()
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')

const resolvers = require('./lib/resolvers')

// Create Schema
const schema = buildSchema(
  readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
  )
)

// // execute schema
// graphql(schema, '{ age }', resolvers)
//     .then( data => console.log(data))
//     .catch( e => console.log(e))

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(4000, () => console.log('Server start im http://localhost:4000/api'))
