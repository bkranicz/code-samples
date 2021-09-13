import Query from './Query/index.js';
import CONTACT_QUERY from '../queries/contact.js';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedContact = ({ lang }) => {
    return (
        <div className="container ptb_100" id="contact">
            <div className="row">
                <Query query={CONTACT_QUERY} id={null}>
                    {({ data: { contact } }) => { 
                        return (
                            <>
                                <div className="col-12 mb-4">
                                    <h1>{contact.title[lang]}</h1>
                                </div>
                                <div className="col-12 mb-4">
                                    <p className="mb-1 text-black text-fw-600">{ contact.phone }</p>
                                    <p className="mb-1 text-black text-fw-600">{ contact.email }</p>
                                    <p className="mb-1 text-black text-fw-600">{ contact.website}</p>
                                </div>
                                <div className="col-12">
                                    <p className="mb-1">{ contact.city }</p>
                                    <p className="mb-1">{ contact.street }</p>
                                </div>
                            </>
                        )
                    }}
                </Query>
            </div>
        </div>
    )
}

const Contact = connect(mapStateToProps)(connectedContact);

export default Contact