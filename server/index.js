
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
type Mutation {
  write(writer: String!, description: String!): String!
}
type Subscription {
  newChat: Chat
}
`;
const resolvers = {
  Query: {
    chatting: () => {
      return chattingLog;
    }
  },
  Mutation: {
    write: (_, { writer, description }) => {
      const id = chattingLog.length;
      const newChat = {
        id,
        writer,
        description
      };
    chattingLog.push(newChat);
    return "YES";
    }
  }
};

const server = new GraphQLServer({
  typeDefs: typeDefs,
  resolvers: resolvers
});

server.start(() => console.log("Graphql Server Running on host http://localhost:4000"));