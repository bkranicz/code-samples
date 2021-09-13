import classes from '../styles/Header.module.css';

import Query from './Query/index.js';
import HEADER_QUERY from '../queries/header.js';
import { connect } from "react-redux";
import store from '../store/index';
import { slide as Menu } from 'react-burger-menu';
import { NavHashLink } from 'react-router-hash-link';

const mapStateToProps = state => {
    return { lang: state.lang };
};

const changeLang = () => {
    var state = store.getState()
    var lang = state.lang === 'en' ? 'hun' : 'en';

    store.dispatch({
        type: 'SET_LANG',
        payload: lang
    });
}

const closeMenu = () => {
    function eventFire(el, etype){
        if (el.fireEvent) {
          el.fireEvent('on' + etype);
        } else {
          var evObj = document.createEvent('Events');
          evObj.initEvent(etype, true, false);
          el.dispatchEvent(evObj);
        }
      }
      eventFire(document.getElementById('react-burger-cross-btn'), 'click');
}


const connectedHeader = ({ lang }) => {
    return (
        <div>
            <nav className={`${classes.header} navbar fixed-top navbar-expand-xl navbar-light bg-lightest`} id="header">
                <NavHashLink 
                    smooth
                    to="/#home"
                    className="navbar-brand"
                >
                    <img src="/logo.svg" alt="Yolk.digital"/>
                </NavHashLink>
                
                <Query query={HEADER_QUERY} id={null} >
                    {({ data: { header } }) => {
                        return (
                            <>
                                <div className="d-xl-none">
                                    <img src="/menu.svg" alt="Menu"/>
                                        <Menu right width={ 280 } disableAutoFocus >
                                                {header.links.map((link, i) => {
                                                    return (
                                                        <div className="nav-item mr-4">
                                                            <NavHashLink 
                                                                smooth
                                                                onClick={closeMenu}
                                                                to={link.url}
                                                                className={classes.link}
                                                            >{
                                                                link[lang]}
                                                            </NavHashLink>
                                                        </div>
                                                    )
                                                })}
                                                <div className="nav-item">
                                                    <div className={classes.link} onClick={changeLang}>
                                                        {lang === 'hun' &&
                                                            <span>EN/<span className="text-orange">HU</span></span>
                                                        }
                                                        {lang === 'en' &&
                                                            <span><span className="text-orange">EN</span>/HU</span>
                                                        }
                                                    </div>
                                                </div>
                                        </Menu>
                                </div>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto">
                                        {header.links.map((link, i) => {
                                            return (
                                                <li className="nav-item mr-4">
                                                    <NavHashLink 
                                                        smooth
                                                        to={link.url}
                                                        className={classes.link}
                                                    >
                                                        {link[lang]}
                                                    </NavHashLink>
                                                </li>
                                            )
                                        })}
                                        <li className="nav-item">
                                            <div className={classes.link} onClick={changeLang}>
                                                {lang === 'hun' &&
                                                    <span>EN/<span className="text-orange">HU</span></span>
                                                }
                                                {lang === 'en' &&
                                                    <span><span className="text-orange">EN</span>/HU</span>
                                                }
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )
                    }}
                </Query>
            </nav>
        </div>
    )
}

const Header = connect(mapStateToProps)(connectedHeader);

export default Header
