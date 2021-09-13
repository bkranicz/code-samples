import classes from '../styles/Marquee.module.css'

import Marquee from "react-fast-marquee";
import Query from './Query/index.js';
import MARQUEE_QUERY from '../queries/marquee.js';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { lang: state.lang };
};

const connectedMarqueeComponent = ({ lang }) => {
    return (
        <div id="marquee" className="ptb_100">
            <Query query={MARQUEE_QUERY} id={null}>
                {({ data: { marquee } }) => { 
                    return (
                        <div>
                            <Marquee speed={100} gradient={false}>
                                <p className={`${classes["marquee-row"]} ${classes["first-row"]}`}>{marquee.firstRow[lang]}</p>
                            </Marquee>
                            <Marquee speed={70} gradient={false} direction="right">
                                <p className={`${classes["marquee-row"]} ${classes["second-row"]}`}>{marquee.secondRow[lang]}</p>
                            </Marquee>
                            <Marquee speed={170} gradient={false}>
                                <p className={`${classes["marquee-row"]} ${classes["third-row"]}`}>{marquee.thirdRow[lang]}</p>
                            </Marquee>
                        </div>
                    )
                }}
            </Query>

        </div>
    )
}

const MarqueeComponent = connect(mapStateToProps)(connectedMarqueeComponent);

export default MarqueeComponent