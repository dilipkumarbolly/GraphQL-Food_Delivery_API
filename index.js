const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const { RootQueryType } = require("./service/Query");
const { RootMutationType } = require("./service/mutation");
const app = express();

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
}); 

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "an error occurred";
      const code = err.originalError.code || 404;
      return { message: message, status: code, data: data };
    },
  })
);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
