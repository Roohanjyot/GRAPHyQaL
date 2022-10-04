let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');

//Construct the schema, using GraphQL schema language
let schema = buildSchema(`
    type Query{
        hello: String
    }
`);

//The root provide a resolver function for each API endpoint
let root = {
    hello: () => {
        return 'Hello world'
    },
};

let app = express();
let PORT = process.env.PORT || 4000;

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(PORT, () => console.log(`Aye Aye Captain, listening on port:${PORT}`));