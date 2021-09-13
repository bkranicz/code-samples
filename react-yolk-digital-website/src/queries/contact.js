import gql from "graphql-tag";

const CONTACT_QUERY = gql`
  query Contact {
      contact {
        title {
            en
            hun
        }
        website
        phone
        email
        city
        street
      }
  }
`;

export default CONTACT_QUERY;