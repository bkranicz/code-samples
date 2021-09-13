import gql from "graphql-tag";

const MARQUEE_QUERY = gql`
  query Marquee {
      marquee {
        firstRow {
            en
            hun
        }
        secondRow {
            en
            hun
        }
        thirdRow {
            en
            hun
        }
      }
  }
`;

export default MARQUEE_QUERY;