import gql from "graphql-tag";

const HERO_QUERY = gql`
  query Hero {
      hero {
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

export default HERO_QUERY;