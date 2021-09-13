import gql from "graphql-tag";

const ABOUT_QUERY = gql`
  query About {
      about {
        title {
            en
            hun
        }
        subtitle {
            en
            hun
        }
      }
  }
`;

export default ABOUT_QUERY;