<template>
    <div>
        <div v-if="sidebar" class="summary py-8" :class="width < 1199 ? 'px-4' : 'pl-8'">
            <div v-if="sidebar.lifecycle">
                <h3 class="mt-4 mb-2">{{ base.lifecycle[lang] }}</h3>
                <p class="mb-2">{{ sidebar.lifecycle[lang] }} </p>
            </div>
            <div v-if="sidebar.lifecycles && sidebar.lifecycles.length > 0">
                <h3 class="mt-4 mb-2">{{ base.lifecycle[lang] }}</h3>
                <p class="mb-2" v-for="l in sidebar.lifecycles" :key="l._id"> {{ l[lang] }} </p>
            </div>
            <div class="pt_15" v-if="sidebar.areas && sidebar.areas.length > 0">
                <h3 class="mt-4 mb-2">{{ base.areas[lang] }}</h3>
                <p class="mb-2" v-for="a in sidebar.areas" :key="a._id"> {{ a[lang] }} </p>
            </div>
            <div class="contact-area pt_15" v-if="sidebar.linkedin || sidebar.twitter || sidebar.website || sidebar.calendly">
                <h3 class="mt-4 mb-2">{{ base.contact[lang] }}</h3>
                <a class="my-2" v-if="sidebar.linkedin" :href="sidebar.linkedin" target="_blank">
                    <img src="/assets/img/linkedin.svg" alt="Linkedin" height="20px">
                </a> <br>
                <a v-if="sidebar.twitter" :href="sidebar.twitter" target="_blank">                                
                    <img class="my-2" src="/assets/img/twitter.svg" alt="Twitter" height="20px">
                </a> <br>
                <a v-if="sidebar.website" :href="sidebar.website" target="_blank">
                    {{ sidebar.website }}
                </a> <br>
                <div class="text-center" v-if="sidebar.calendly">
                    <a id="bookPitch" class="btn bg-green bookPitchBtn my-4"  href="javascript:void(0)" @click="openCalendly(coworker.calendly)">{{ base.bookPitch[lang] }}</a>
                </div>
            </div>
            <kinesis-container class="image-text-right-center" event="scroll" :duration="2000">
                <kinesis-element tag="div" :strength="150" axis="y"  :originY="0" type="translate" >
                    <div>
                        <img src="/assets/img/white_dotted_circle.svg" alt="">
                    </div>
                </kinesis-element>
            </kinesis-container>
        </div>
        <div v-else class="summary py-8" :class="width < 1199 ? 'px-4' : 'pl-8'">
            <div class=" ph-item">
                <div class="ph-col-12">
                    <div class="ph-row my-4">
                        <div class="ph-col-12 big mb-2"></div>
                        <div class="ph-col-8 "></div>
                        <div class="ph-col-8 "></div>
                    </div>
                    <div class="ph-row my-4">
                        <div class="ph-col-12 big mb-2"></div>
                        <div class="ph-col-8 "></div>
                        <div class="ph-col-8 "></div>
                    </div>
                    <div class="ph-row my-4">
                        <div class="ph-col-12 big mb-2"></div>
                        <div class="ph-col-8 "></div>
                        <div class="ph-col-8 "></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript"></script>

<script>
import { mapState } from 'vuex';

export default {
    props: ['sidebar'],
    data() {
        return {
            width: window.innerWidth
        };
    },
    computed: { 
        ...mapState(['lang', 'base'])
    },
    methods: {
        openCalendly(url) {
            Calendly.initPopupWidget({url: url});
            return false;
        }
    },
    mounted() {
        window.addEventListener('resize', () => {         
            this.width = window.innerWidth       
        });
    }
}
</script>