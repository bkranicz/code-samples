import gql from "graphql-tag";

const CAREER_APPLY_QUERY = gql`
  query careerApply {
    careerApply {
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

export default CAREER_APPLY_QUERY;