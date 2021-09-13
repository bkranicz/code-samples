<template>
    <section id="home" class="section welcome-area d-flex align-items-end bg-home-blue">
        <div class="container-fluid">
            <kinesis-container v-if="width > 1199" class="home-decor" event="scroll" :duration="2000">
                <kinesis-element tag="div" :strength="100" :originY="0" type="translate" axis="y">
                    <div>
                        <img src="/assets/img/dotted_white_circle.svg" alt="">
                    </div>
                </kinesis-element>
            </kinesis-container>
            <div class="row flex-column-reverse flex-xl-row align-items-center">
               <kinesis-container class="col-xl-5 welcome-thumb align-self-center" event="scroll" :duration="2000">
                    <kinesis-element tag="div" :strength="3" :originX="0" type="scale" axis="x" >
                        <div class=" text-center">
                            <img class="heroImg" id="heroImg" src="/assets/img/home_red.png" alt="Portfolion Home">
                        </div>
                    </kinesis-element>
                </kinesis-container>
                <div class="col-xl-7 px-4 px-sm-0 align-self-center welcome-hero-content">
                    <div class="welcome-intro mt-2" v-if="hero">
                        <h1 class="mb-4"> {{ hero.title[lang] }} </h1>
                        <!-- <h1><vue-typer :text="texts"></vue-typer></h1> -->
                        <vue-typed-js :key="lang" v-if="lang === 'en'" :strings="texts.en" :loop="true" :typeSpeed="50" :backSpeed="30" :backDelay="3000" :contentType="'html'" :smartBackspace="true">
                            <h3 class="text-white"><span class="typing"></span></h3>
                        </vue-typed-js>
                        <vue-typed-js :key="lang" v-if="lang === 'hun'" :strings="texts.hun" :loop="true" :typeSpeed="50" :backSpeed="30" :backDelay="3000" :contentType="'html'" :smartBackspace="true">
                            <h3 class="text-white"><span class="typing"></span></h3>
                        </vue-typed-js>
                       <!--  <h3 class="fw-3 mt-2 mt-sm-3">{{ hero.subtitle[lang] }}</h3> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex';
    /* import { VueTyper } from 'vue-typer' */

    export default {
        data() {
            return {
                width: window.innerWidth,
                /* &#x1F3E6; */
                texts: {
                    en: [
                        "<span>Member of OTP Group, the largest banking group in the region &#x1F3E6;",
                        "<span>We are solving capital challenges in mature enterprises &#x1F6A2;",
                        "<span>We have € 35m to invest in great ideas &#x1F680; from the region</span>",
                        "<span>Partner with us and start a journey of making global impact &#x1F30D;</span>"
                    ],
                    hun: [
                        "<span>A PortfoLion az OTP Csoport, a régió egyik legnagyobb bankcsoportjának tagja &#x1F3E6;",
                        "<span>Folyamatosan keressük a megoldásra váró tőkehelyzeteket &#x1F6A2;",
                        "<span>35 millió eurót fektetünk jó ötletekbe &#x1F680; a régióban</span>",
                        "<span>Hagyjunk közös nyomot a fejlődésben  &#x1F30D;</span>"
                    ]
                } ,
                stages: ['bg-dark-blue', 'bg-red', 'bg-green', 'bg-blue'],
                stageIndex: 0,
                images: ['/assets/img/handshake-min.png', '/assets/img/hands.png']
            };
        },
        components: {
       /*      VueTyper */
        },
        methods: {
            textChanged() {
                this.stageIndex++;
            }
        },
        computed: { 
            ...mapState(['lang', 'hero'])
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });
        }
    }
</script>

<style lang="css">

@keyframes pulse {
	0% {
		transform: scale(0.95);
	}

	70% {
		transform: scale(1);
	}

	100% {
		transform: scale(0.95);
	}
}

</style>