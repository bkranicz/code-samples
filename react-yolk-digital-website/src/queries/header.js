import gql from "graphql-tag";

const HEADER_QUERY = gql`
  query Header {
      header {
        links {
            id
            en
            hun
            url
            sublink {
              id
              en
              hun
              url
            }
        }
      }
  }
`;

export default HEADER_QUERY;