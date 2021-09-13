import Query from './Query/index.js';
import ABOUT_QUERY from '../queries/about.js';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedAbout = ({ lang }) => {
    return (
        <section id="about">
            <div className="container">
                <div className="row flex-column-reverse flex-xl-row">
                    <div className="col-xl-6 mb-4 my-auto">
                        <Query query={ABOUT_QUERY} id={null}>
                            {({ data: { about } }) => { 
                                return (
                                    <>
                                        <h1>{about.title[lang]}</h1>
                                        <p>{about.subtitle[lang]}</p>
                                    </>
                                )
                            }}
                        </Query>
                    </div>
                    <div className="col-xl-6 mb-4">
                        <div className="section-image">
                            <img src="/egg_w_yolk.svg" alt="Yolk.digital"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const About = connect(mapStateToProps)(connectedAbout);

export default About