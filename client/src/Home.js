import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const getChatting = gql`
  query {
    chatting {
      id
      writer
      description
    }
  }
`;

const newChat = gql`
  subscription {
    newChat {
      id
      writer
      description
    }
  }
`;

let unsubscribe = null; //publish 했을때 변화

export default () => (
  <Query query={getChatting}>
    {({ loading, data, subscribeToMore }) => {
      if (loading) {
        return null;
      }
      if (!unsubscribe) {
        unsubscribe = subscribeToMore({
          document: newChat,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const { newChat } = subscriptionData.data;
            return {
              ...prev,
              chatting: [...prev.chatting, newChat]
            };
          }
        });
      }
      return (
        <div>
          {data.chatting.map(x => (
            <h3 key={x.id}>
              {x.writer}: {x.description}
            </h3>
          ))}
        </div>
      );
    }}
  </Query>
); 