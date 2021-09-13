<template>
    <section id="stages" class="stages" v-if="stages" :class="width < 1200 ? 'ptb_100' : 'pb_50'">
        <div class="container-fluid">
            <div class="row">
                <kinesis-container class="col-xl-7 text-left early-stage image-column" event="scroll" :duration="2000">
                <div style="background: url('/assets/img/paperplane.png'); background-repeat: no-repeat; background-size: auto 70%; background-position: bottom left;">
                    <kinesis-element tag="div" :strength="60" type="translate" :originY="0" :maxX="0" axis="x" >
                        <div>
                           <img src="assets/img/rocket.png" alt="Early Stage" height="50%">
                        </div>
                    </kinesis-element>
                </div>
                </kinesis-container>
                <div class="col-12 col-xl-5 mx-auto p-0 early-stage-stat v-center">
                    <div class="m-4 p-4 w-100" v-if="stages">
                        <h1> {{ stages.earlyStageTitle[lang] }} </h1>
                        <p class="mb-2" v-for="e in stages.earlyStageElements" :key="e._id">
                            {{ e["name_" + lang] }}: <span class="fw-7">{{ e["value_" + lang] }}</span>
                        </p>
                        <router-link :to="stages.earlyStageLink.url" class="btn bg-dark-blue float-right mt-4">{{ stages.earlyStageLink[lang] }}</router-link>
                    </div>
                </div>
            </div>
            <div class="row flex-column-reverse flex-xl-row">
                <div class="col-12 col-xl-5 mx-auto p-0 growth-stage-stat v-center">
                    <div class="m-4 p-4 w-100" v-if="stages">
                        <h1>{{ stages.growStageTitle[lang] }}</h1>
                        <p class="mb-2" v-for="e in stages.growStageElements" :key="e._id">
                            {{ e["name_" + lang] }}: <span class="fw-7">{{ e["value_" + lang] }}</span>
                        </p>
                        <router-link :to="stages.growStageLink.url" class="btn bg-red float-right mt-4">{{ stages.growStageLink[lang] }}</router-link>
                    </div>
                </div>
                <kinesis-container class="col-xl-7 p-0 text-left growth-stage image-column" event="scroll" :duration="2000">
                    <div style="overflow: hidden; background: url('/assets/img/buyout_bg.svg'); background-repeat: no-repeat; background-size: cover;" >
                    <kinesis-element tag="div" :strength="3" :originX="0" type="scale" >
                        <div style="left: 0;">
                            <img src="/assets/img/repulok.png" alt="Growth Stage" height="100%">
                        </div>
                    </kinesis-element>
                    </div>
                </kinesis-container>
            </div>
            <div class="row">
                <kinesis-container class="col-xl-7 p-0 buy-out-stage align-items-end image-column" event="scroll" :duration="2000" >
                    <kinesis-element tag="div" :strength="-60" type="translate" :originY="0" :maxX="0" axis="x" >
                        <div class="mt-2" style="overflow-y: hidden;">
                            <img src="assets/img/docker.png" alt="Buy Out" >
                        </div>
                    </kinesis-element>
                </kinesis-container>
                <div class="col-12 col-xl-5 mx-auto p-0 buy-out-stage-stat v-center">
                    <div class="m-4 p-4 w-100" v-if="stages">
                        <h1>{{ stages.buyOutTitle[lang] }}</h1>
                        <p class="mb-2" v-for="e in stages.buyOutElements" :key="e._id">
                            {{ e["name_" + lang] }}: <span class="fw-7">{{ e["value_" + lang] }}</span>
                        </p>
                        <router-link :to="stages.buyOutLink.url" class="btn bg-green float-right mt-4">{{ stages.buyOutLink[lang] }}</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>

    
</template>

<script>
    import { mapState } from 'vuex';

    export default {
         data() {
            return {
                width: window.innerWidth
            };
        },
        computed: { 
            ...mapState(['lang', 'stages'])
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });

            if (!this.$store.state.stages) {
                this.$store.dispatch('getStages');
            }
        }
    }
</script>

<style>

</style>