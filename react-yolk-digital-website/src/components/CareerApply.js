import Query from './Query/index.js';
import CAREER_APPLY_QUERY from '../queries/careerApply.js';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedApply = ({ lang }) => {
    return (
        <div className="container" id="career-apply">
            <div className="row ptb_50">
                <div className="col-xl-8 col-12">
                    <Query query={CAREER_APPLY_QUERY} id={null}>
                        {({ data: { careerApply } }) => { 
                            return (
                                <>
                                    <h1>{careerApply.title[lang]}</h1>
                                    <p dangerouslySetInnerHTML={{__html:careerApply.subtitle[lang] }}></p>
                                </>
                            )
                        }}
                    </Query>
                </div>
            </div>
        </div>
    )
}

const Apply = connect(mapStateToProps)(connectedApply);

export default Apply