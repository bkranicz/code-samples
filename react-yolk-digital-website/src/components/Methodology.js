import Query from './Query/index.js';
import METHODOLOGY_QUERY from '../queries/methodology.js';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedMethodology = ({ lang }) => {
    return (
        <div className="container ptb_100" id="how">
            <div className="row">
                    <Query query={METHODOLOGY_QUERY} id={null}>
                        {({ data: { methodology } }) => { 
                            return (
                                <>
                                    <div className="col-xl-6 mb-4">
                                        <h1 className="mb-4">{methodology.howTitle[lang]}</h1>
                                        <p>{methodology.howSubtitle[lang]}</p>
                                    </div>
                                    <div className="col-xl-6 mb-4">
                                        <h1 className="mb-4">{methodology.whatTitle[lang]}</h1>
                                        <p>{methodology.whatSubtitle[lang]}</p>
                                    </div>
                                </>
                            )
                        }}
                    </Query>
            </div>
        </div>
    )
}

const Methodology = connect(mapStateToProps)(connectedMethodology);

export default Methodology