import { graphql } from "../gql";

export const getUsers = graphql(`
   query AllTodos($cursor: Cursor) {
      todosCollection(first: 10, after: $cursor) {
         edges {
            node {
               nodeId
               title
            }
         }
         pageInfo {
            endCursor
            hasNextPage
         }
      }
   }
`);
