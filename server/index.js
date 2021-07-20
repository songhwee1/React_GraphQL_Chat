
import { GraphQLServer, PubSub } from "graphql-yoga";
let chattingLog = [{
  id: 0,
  writer: "admin",
  description: "HELLO"
}];

const typeDefs = `
type Chat {
  id: Int!
  writer: String!
  description: String!
}
type Query {
  chatting: [Chat]!
}
`;
const resolvers = {
  Query: {
    chatting: () => {
      return chattingLog;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => console.log("Graphql Server Running on host http://localhost:4000"));