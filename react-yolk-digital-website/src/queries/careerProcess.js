import gql from "graphql-tag";

const CAREER_PROCESS_QUERY = gql`
  query careerProcess {
    careerProcess {
        title {
          en
          hun
        }
        subtitle {
          en
          hun
        }
      	processStep {
          title {
            en
            hun
          }
          subtitle {
            en
            hun
          }
          image {
            url
          }
        }
    }
  }
`;

export default CAREER_PROCESS_QUERY;