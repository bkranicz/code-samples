<template>
    <section id="apply" class="section apply-section pb_50" v-if="jobDecor">
        <div class="container-fluid" id="bookPitch">
            <div class="row apply-cards"> 
                <div class="col-xl-12 mb-4">
                    <div class="card bg-dark-blue h-100">
                        <div class="ptb_50" :class="width < 1200 ? 'px-4' : 'px-8'">
                            <div class="row mb-4">
                                <div class="col-sm-8 col-xs-12">
                                    <h3 class="mb-4">{{ jobDecor.generalApplyTitle[lang] }}</h3>
                                    <p>{{ jobDecor.generalApplyDescription[lang] }}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="float-right">
                                        <a class="btn bg-orange" :href="'mailto:' + jobDecor.generalApplyButton.url">
                                            {{ jobDecor.generalApplyButton[lang] }}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="decor">
                            <img src="/assets/img/writing.png" alt="Apply">
                        </div>
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
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                width: window.innerWidth,
            }
        },
        computed: { 
            ...mapState(['lang', 'jobDecor']),
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });
        }
    }
</script>