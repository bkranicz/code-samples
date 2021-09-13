import gql from "graphql-tag";

const JOB_QUERY = gql`
  query Job($id: ID!) {
    job(id: $id) {
        id
        title {
            en
            hun
        }
    	expectation {
          en
          hun
        }
        benefits {
          en
          hun
        }
    }
  }
`;

export default JOB_QUERY;