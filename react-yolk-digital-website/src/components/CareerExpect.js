import Query from './Query/index.js';
import EXPECT_QUERY from '../queries/careerExpect.js';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedExpect = ({ lang }) => {
    return (
        <section>
            <div className="container" id="career-expect">
                <div className="row flex-column-reverse flex-xl-row">
                    <div className="col-xl-6 mb-4 my-auto">
                        <Query query={EXPECT_QUERY} id={null}>
                            {({ data: { careerExpect } }) => { 
                                return (
                                    <>
                                        <h1>{careerExpect.title[lang]}</h1>
                                        <p dangerouslySetInnerHTML={{__html:careerExpect.subtitle[lang] }}></p>
                                    </>
                                )
                            }}
                        </Query>
                    </div>
                    <div className="col-xl-6 mb-4">
                        <div className="section-image">
                            <img src="/expect.svg" alt="Expect - Yolk.digital"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Expect = connect(mapStateToProps)(connectedExpect);

export default Expect