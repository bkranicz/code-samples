import gql from "graphql-tag";

const REFERENCE_QUERY = gql`
  query Reference {
      reference {
        title {
            en
            hun
        }
        subtitle {
            en
            hun
        }
        images {
            image {
                url
            }
        }
      }
  }
`;

export default REFERENCE_QUERY;