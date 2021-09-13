import classes from '../styles/CareerHome.module.css'

import Query from './Query/index.js';
import HERO_QUERY from '../queries/careerHero.js';
import JOBS_QUERY from '../queries/jobs.js';
import { connect } from "react-redux";
import { NavHashLink } from 'react-router-hash-link';

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedHero = ({ lang }) => {
    return (
        <section id="career-home">
            <div className="container">
                <div className="row flex-column-reverse flex-xl-row">
                    <div className="col-xl-6 mb-4 my-auto">
                        <Query query={HERO_QUERY} id={null}>
                            {({ data: { careerHero } }) => { 
                                return (
                                    <>
                                        <h1>{careerHero.title[lang]}</h1>
                                        <p dangerouslySetInnerHTML={{__html:careerHero.subtitle[lang] }}></p>
                                    </>
                                )
                            }}
                        </Query>
                        <Query query={JOBS_QUERY} id={null}>
                            {({ data: { jobs } }) => { 
                                return (
                                    <>
                                        { jobs.map((job, i) => {
                                            return (
                                                <NavHashLink 
                                                    smooth
                                                    to={'/career/' + job.id + '#job'}
                                                    className={classes["job-link"]}
                                                >
                                                    {job.title[lang]} 
                                                    <svg className="ml-2" width="12" height="19" viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M2 2L10.4375 9.71429L8.77636 11.233L2 17.4286" stroke="#444444" stroke-width="3" stroke-linejoin="round"/>
                                                    </svg>
                                                </NavHashLink>
                                            )
                                        }) }
                                    </>
                                )
                            }}
                        </Query>
                    </div>
                    <div className="col-xl-6 mb-4">
                        <div className="section-image">
                            <img src="/career_hero.svg" alt="Career - Yolk.digital"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Hero = connect(mapStateToProps)(connectedHero);

export default Hero