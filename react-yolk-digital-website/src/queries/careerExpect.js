import gql from "graphql-tag";

const CAREER_EXPECT_QUERY = gql`
  query careerExpect {
    careerExpect {
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

export default CAREER_EXPECT_QUERY;