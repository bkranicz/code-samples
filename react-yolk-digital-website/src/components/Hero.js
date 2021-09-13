import Query from './Query/index.js';
import HERO_QUERY from '../queries/hero.js';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedHero = ({ lang }) => {
    return (
        <section id="home">
            <div className="container">
                <div className="row flex-column-reverse flex-xl-row">
                    <div className="col-xl-6 mb-4 my-auto">
                        <Query query={HERO_QUERY} id={null}>
                            {({ data: { hero } }) => { 
                                return (
                                    <>
                                        <h1>{hero.title[lang]}</h1>
                                        <p>{hero.subtitle[lang]}</p>
                                    </>
                                )
                            }}
                        </Query>
                    </div>
                    <div className="col-xl-6 mb-4">
                        <div className="section-image">
                            <img src="/egg.svg" alt="Yolk.digital"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Hero = connect(mapStateToProps)(connectedHero);

export default Hero;