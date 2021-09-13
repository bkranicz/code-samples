import gql from "graphql-tag";

const PROCESS_QUERY = gql`
  query Process {
      process {
        title {
            en
            hun
        }
        step1 {
            en
            hun
        }
        step2 {
            en
            hun
        }
        step3 {
            en
            hun
        }
        step4 {
            en
            hun
        }
        step5 {
            en
            hun
        }
        step6 {
            en
            hun
        }
        finalTitle {
            en
            hun
        }
        finalSubtitle {
            en
            hun
        }
      }
  }
`;

export default PROCESS_QUERY;