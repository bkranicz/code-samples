import gql from "graphql-tag";

const CAREER_BENEFIT_QUERY = gql`
  query careerBenefit {
    careerBenefit {
        title {
            en
            hun
        }
        subtitle {
            en
            hun
        }
        benefits {
            en
            hun
        }
        confirmText {
            en
            hun
        }
    }
  }
`;

export default CAREER_BENEFIT_QUERY;