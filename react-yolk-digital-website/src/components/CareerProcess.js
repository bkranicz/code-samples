
import Query from './Query/index.js';
import PROCESS_QUERY from '../queries/careerProcess.js';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedProcess = ({ lang }) => {
    return (
        <div className="container" id="career-process">
            <Query query={PROCESS_QUERY} id={null}>
                {({ data: { careerProcess } }) => { 
                    return (
                        <>
                            <div className="row mb-4">
                                <div className="col-12 col-xl-8 mb-4">
                                    <h1>{careerProcess.title[lang]}</h1>
                                    <p dangerouslySetInnerHTML={{__html:careerProcess.subtitle[lang] }}></p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-8">
                                    { careerProcess.processStep.map((step, i) => {
                                        return (
                                            <div className="row ptb_50">
                                                <div className="col-lg-3 col-12 text-center section-image">
                                                    <img src={ process.env.REACT_APP_STRAPI_URL + step.image.url } alt="Steps" width={ i === 0 ? '60%' : '100%' } />
                                                </div>
                                                <div className="col-lg-9 col-12 my-auto">
                                                    <p className="text-fw-800 mb-2">{ step.title[lang] }</p>
                                                    <p className="mb-0">{ step.subtitle[lang] }</p>
                                                </div>
                                            </div>
                                        )
                                    }) }
                                </div>
                            </div>
                        </>
                    )
                }}
            </Query>
        </div>
    )
}

const Process = connect(mapStateToProps)(connectedProcess);

export default Process