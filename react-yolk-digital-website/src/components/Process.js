// @flow
import React from 'react';
import styled from 'styled-components';
import { Controller } from 'react-scrollmagic';
import Query from './Query/index.js';
import PROCESS_QUERY from '../queries/process.js';
import { connect } from "react-redux";
import ProcessAnimation from "./ProcessAnimation";

const StickyStyled = styled.div`
  overflow: hidden;
  font-family: 'AileronHeavy' !important;
  color: #444444;
  .section {
    height: 70vh;
    background: red;
    color: black;
  }
  .sticky, .sticky2 {
    height: 100vh;
    background: white;
    width: 100%;
    & .animation, .animation2 {
      width: 100%;
      height: 100%;
      position: absolute;
      & svg {
        opacity: 1;
        position: absolute;
        width: 300px;
        height: 300px;
      }
    }
    .heading {
      position: absolute;
      height: 100%;
      width: 100%;
      h2 {
        font-size: 40px;
        position: absolute;
        bottom: 10% !important;
        left: 10%;
        margin: 0;
      }
    }
  }
  .black-circle {
      z-index: 5;
  }
  .gray-circle {
      position: absolute;
      top: 43%;
      left: 4%;
      z-index: 1;
      height: 100px;
      color: lightgray;
  }
  .text-black {
      color: black;
  }
  .text-large {
      font-size: 100px;
      line-height: 110px;
  }
`;

const mapStateToProps = state => {
    return { lang: state.lang };
};


const Sticky = ({ lang }) => {
    return (
        <StickyStyled>
          <Controller>
            <Query query={PROCESS_QUERY} id={null}>
                {({ data: { process } }) => { 
                    return (
                        <ProcessAnimation process={process} lang={lang} />
                    )
                }}
            </Query>
        </Controller>
      </StickyStyled>
    )
}

const Process = connect(mapStateToProps)(Sticky);

export default Process;