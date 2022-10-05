let express = require('express');
let { graphqlHTTP } = require('express-graphql');
let { buildSchema } = require('graphql');
let dotenv = require('dotenv');

dotenv.config();
//Construct the schema, using GraphQL schema language(Schema)
let schema = buildSchema(`
    type Query{
        hello: String
        getUser(id: ID!): User
        getTicket(id: ID!): Ticket
    },
    type Mutation {
        setUser(name: String!, superUser: Boolean): User!
        setTicket(
            title: String! 
            progressTracker: String!
            body: String
            estimatedHours: Int 
            actualHours: Int
            assignee: User
            assigned: User
            points: Int
            dateCreated: Date
            parent: Ticket
            children: [Ticket!]
        ) : Ticket!
        deleteTicket(id: ID!): Boolean!
        deleteUser(id: ID!): Boolean!
    },
    type User {
        id: ID!
        name: String!
        superUser: Boolean!
    },
    type Ticket {
        id: ID!
        assignee: User!
        assigned: [User!]!
        points: Int
        dateCreated: Date
        estimatedHours: Int
        actualHours: Int
        parent: Ticket
        children: [Ticket!]
        progressTracker: ProgressTracker
        title: String!
        body: String
    },
    enum ProgressTracker {
        To-do
        In-progress
        Finished
    },
`);

//The root provide a resolver function for each API endpoint(Resolver)
let root = {
    hello: () => {
        return 'Hello, Roohan Da G.O.A.T';
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