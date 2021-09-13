import React, { useState } from 'react';
import { Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';
import store from '../store/index';

const ProcessAnimation = ({process, lang}) => {
    const [processText, setProcessText] = useState("")
    var step = 0;

    const changeProcessText = () => {
        var state = store.getState()
        
        switch(step) {
            case 0:
                setProcessText("");
                return;
            case 1:
                setProcessText(process.step1[state.lang]);
                return;
            case 2:
                setProcessText(process.step2[state.lang]);
                return;
            case 3:
                setProcessText(process.step3[state.lang]);
                return;
            case 4:
                setProcessText(process.step4[state.lang]);
                return;
            case 5:
                setProcessText(process.step5[state.lang]);
                return;
            case 6:
                setProcessText("");
                return;
            default:
                setProcessText("");
                return;
        }

    }

    const increaseProcessStep = () => {
        step++;
        changeProcessText()
    }

    const decreaseProcessStep = () => {
        step--;
        changeProcessText()
    }

    return (
        <div className="d-none d-xl-block">
            <div className="container">
                <div className="row ">
                    <div className="col-xl-12 ptb_50 my-auto">
                        <h1 className="text-large">{process.title[lang]}</h1>
                    </div>
                </div>
            </div>
        
            <Scene
                triggerHook="onLeave"
                duration={1000}
                paused
                reverse={true}
                pin
            >
            {(progress) => (
                <div className="sticky">

                    <Timeline
                        totalProgress={progress} 
                        paused
                        duration={5}
                        target={
                            <div className="animation black-circle my-auto text-center" >
                                <img src="/circle.png" alt="yolk" height="100%"></img>
                            </div>
                        }
                    >

                    <div className="heading">
                        <h2 dangerouslySetInnerHTML={{__html: processText  }}></h2>
                    </div>

                    <Tween to={{ scale: 0.75 }} onComplete={ increaseProcessStep } onReverseComplete={ decreaseProcessStep }></Tween>
                       
                    <Tween delay={3} to={{ scale: 0.6 }} onComplete={ increaseProcessStep } onReverseComplete={ decreaseProcessStep }></Tween>

                    <Tween delay={3} to={{ scale: 0.4 }} onComplete={ increaseProcessStep } onReverseComplete={ decreaseProcessStep }></Tween>

                    <Tween delay={3} to={{ scale: 0.2 }} onComplete={ increaseProcessStep } onReverseComplete={ decreaseProcessStep }></Tween>

                    <Tween delay={3} to={{ scale: 0.08 }} onComplete={ increaseProcessStep } onReverseComplete={ decreaseProcessStep }></Tween>

                        <Timeline
                            target={
                                <div className="animation gray-circle my-auto text-center" >
                                    <img src="/gray_circle.png" alt="yolk"></img>
                                    <h2 dangerouslySetInnerHTML={{__html:process.step6[lang] }}></h2>
                                </div>
                            }
                            duration={10}
                            >
                            <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} immediateRender/>
                            <Tween to={{ opacity: 0 }} immediateRender  onComplete={ increaseProcessStep } onReverseComplete={ decreaseProcessStep }/>
                        </Timeline>
                    
                    <Tween to={{ scale: 2.5 }} duration={5}/>
                    <Tween to={{ opacity: 0 }} immediateRender/>

                        <Timeline
                            target={
                                <section>
                                    <div class="container">
                                        <div class="row flex-column-reverse flex-xl-row">
                                            <div class="col-xl-6 mb-4">
                                                <div class="img-wrap">
                                                    <img src="/shoot.png" alt="Yolk.digital" width="100%"/>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 mb-4 my-auto">
                                                <h1 class="ml-4" dangerouslySetInnerHTML={{__html:process.finalTitle[lang] }}></h1>
                                                <p class="ml-4" dangerouslySetInnerHTML={{__html:process.finalSubtitle[lang] }}></p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            }
                            duration={5}
                            >
                            <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} immediateRender/>
                        </Timeline>

                    </Timeline>
                </div>
            )}
            </Scene>
        </div>
        )
}

export default ProcessAnimation