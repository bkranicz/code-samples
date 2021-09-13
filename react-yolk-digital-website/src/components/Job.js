import classes from '../styles/Job.module.css'

import Query from './Query/index.js';
import JOB_QUERY from '../queries/job.js';
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps

    return { 
        lang: state.lang,
        jobId: id
    };
};


const connectedJob = ({ lang, jobId }) => {

    return (
        <div className={`${classes.job} container`}>
            <Query query={JOB_QUERY} id={jobId}>
                {({ data: { job } }) => { 
                    return (
                        <>
                            <div className="row">
                                <div className="col">
                                    <h1 className={`${classes["job-title"]} ptb_50`}>{job.title[lang]}</h1>
                                </div>
                            </div>
                            <div className="row ptb_50">
                                <div className="col-12">
                                    { 
                                        lang === 'hun' &&
                                        <h1>Amit elvárunk</h1>
                                    }
                                    { 
                                        lang === 'en' &&
                                        <h1>We expect</h1>
                                    }
                                </div>
                                <div className="col-12">
                                    { job.expectation.map((e, i) => {
                                        return (
                                            <p className="mb-1">- {e[lang]}</p> 
                                        )
                                    }) }
                                </div>
                            </div>
                            <div className="row ptb_50">
                                <div className="col-12">
                                    { 
                                        lang === 'hun' &&
                                        <h1>Amit adunk</h1>
                                    }
                                    { 
                                        lang === 'en' &&
                                        <h1>We give</h1>
                                    }
                                </div>
                                <div className="col-12">
                                    { job.benefits.map((b, i) => {
                                        return (
                                            <p className="mb-1">- {b[lang]}</p> 
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

const Job = connect(mapStateToProps)(connectedJob);

export default Job