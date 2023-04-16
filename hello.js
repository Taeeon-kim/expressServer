var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    pizza_buns: [PizzaBun],
    pizza_bun(pb_idx: Int): PizzaBun 
  }
  
  type Mutation {
    create_pizza_bun(input: PizzaBunInput): Int
  }

  type PizzaBun {
    pb_idx: ID,
    pb_name: String,
    size: Int,
    bread: String,
    sauce: String,
    topping: String
  }

  input PizzaBunInput {
    pb_name: String,
    size: Int,
    bread: String,
    sauce: String,
    topping: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  pizza_bun: ({pb_idx})=>{
    console.log(pb_idx)
    return {
        pb_idx: `${pb_idx}`,
        pb_name: 'sausage',
        size: 6,
        bread: 'wheat',
        sauce: 'tomato',
        topping: 'sauage',
      }
  }
  ,
  pizza_buns: () => {
    return [
      {
        pb_idx: '1',
        pb_name: 'sausage',
        size: 6,
        bread: 'wheat',
        sauce: 'tomato',
        topping: 'sauage',
      },
      {
        pb_idx: '2',
        pb_name: 'vegetable',
        size: 6,
        bread: 'wheat',
        sauce: 'tomato',
        topping: 'sauage',
      },
      {
        pb_idx: '3',
        pb_name: 'seafood',
        size: 6,
        bread: 'wheat',
        sauce: 'tomato',
        topping: 'sauage',
      },
      {
        pb_idx: '4',
        pb_name: 'spicy',
        size: 6,
        bread: 'wheat',
        sauce: 'tomato',
        topping: 'sauage',
      },
    ];
  },
  create_pizza_bun: ({ input }) => {
    console.log(input)
    return 1000
  },
};

var app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
