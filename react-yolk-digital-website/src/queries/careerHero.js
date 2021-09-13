import gql from "graphql-tag";

const CAREER_HERO_QUERY = gql`
  query careerHero {
    careerHero {
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

export default CAREER_HERO_QUERY;