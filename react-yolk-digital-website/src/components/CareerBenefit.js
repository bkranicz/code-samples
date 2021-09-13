import Query from './Query/index.js';
import CAREER_BENEFIT_QUERY from '../queries/careerBenefit.js';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedBenefit = ({ lang }) => {
    return (
        <section>
            <div className="container" id="career-benefit">
                <div className="row flex-column-reverse flex-xl-row">
                    <div className="col-xl-6 mb-4 my-auto">
                        <Query query={CAREER_BENEFIT_QUERY} id={null}>
                            {({ data: { careerBenefit } }) => { 
                                return (
                                    <>
                                        <h1>{careerBenefit.title[lang]}</h1>
                                        <p dangerouslySetInnerHTML={{__html:careerBenefit.subtitle[lang] }}></p>
                                        <br/>
                                        <div>
                                            { careerBenefit.benefits.map((benefit, i) => {
                                                return (
                                                <p className="mb-1">{benefit[lang]} <span className="text-orange text-fw-600">{careerBenefit.confirmText[lang]}</span></p>
                                                )
                                            }) }
                                        </div>
                                    </>
                                )
                            }}
                        </Query>
                    </div>
                    <div className="col-xl-6 mb-4">
                        <div className="section-image">
                            <img src="/benefit.svg" alt="Benefit - Yolk.digital"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Benefit = connect(mapStateToProps)(connectedBenefit);

export default Benefit