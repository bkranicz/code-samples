import gql from "graphql-tag";

const METHODOLOGY_QUERY = gql`
  query Methodology {
      methodology {
        howTitle {
            en
            hun
        }
        howSubtitle {
            en
            hun
        }
        whatTitle {
            en
            hun
        }
        whatSubtitle {
            en
            hun
        }
      }
  }
`;

export default METHODOLOGY_QUERY;