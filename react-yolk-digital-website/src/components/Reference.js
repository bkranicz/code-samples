import Query from './Query/index.js';
import REFERENCE_QUERY from '../queries/reference.js';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedReference = ({ lang }) => {
    return (
        <div className="container" id="reference">
                <Query query={REFERENCE_QUERY} id={null}>
                    {({ data: { reference } }) => { 
                        return (
                            <>
                                <div className="row flex-column-reverse flex-xl-row">
                                    <div className="col-12 mb-4">
                                        <h1>{reference.title[lang]}</h1>
                                        <p>{reference.subtitle[lang]}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    { reference.images.map((image, i) => {
                                        return (
                                            <div className="col-xl-3 col-6 my-4">
                                                <img src={process.env.REACT_APP_STRAPI_URL + image.image.url} alt=""/>
                                            </div>
                                        )
                                    }) }
                                </div>
                            </>
                        )
                    }}
                </Query>
        </div>
    )
}

const Reference = connect(mapStateToProps)(connectedReference);

export default Reference