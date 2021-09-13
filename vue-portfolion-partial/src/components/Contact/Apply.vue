<template>
    <section id="apply" class="section apply-section ptb_100" v-if="contactUs">
        <div class="container-fluid" id="bookPitch">
            <div class="row apply-decor">
                <div class="col-xl-8 pb_50 px-4 px-sm-0">
                    <h3>{{ contactUs.title[lang] }}</h3>
                    <p>{{ contactUs.subtitle[lang] }}</p>
                </div>
            </div>
            <div class="row apply-cards">
                <div class="col-xl-12 mb-4 pl-sm-0">
                    <div class="card bg-dark-blue h-100">
                        <div class="ptb_50" :class="width < 1200 ? 'px-4' : 'px-8'">
                            <div class="row mb-4">
                                <div class="col-sm-8 col-xs-12">
                                    <h3 class="mb-4">{{ contactUs.applyTitle[lang] }}</h3>
                                    <p>{{ contactUs.applyDesc[lang] }}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div class="float-right">
                                        <a class="btn bg-orange" :href="contactUs.applyBtn.url" target="_blank">
                                            {{ contactUs.applyBtn[lang] }}
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

        <!-- Modal for coworker bookslot  -->
            <div
                @click="toggleModal"
                ref="modal"
                id="pitchModal"
                class="modal fade"
                :class="{show, 'd-block': active}"
                tabindex="-1"
                role="dialog"
                >
                <div @click.stop="" class="modal-xl modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title">
                                <h3>{{ contactUs.pitchTitle[lang] }}</h3>
                                <p>{{ contactUs.pitchSubtitle[lang] }}</p>
                            </div>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                @click="toggleModal"
                                >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div v-if="width < 1200">
                                <div class="row mb-0" v-for="(c, index) in filteredCoworkers" :key="c._id">
                                    <div class="col-6 p-0" v-if="index % 2 === 0">
                                        <a :href="c.calendly" target="_blank">
                                            <div class="mobile-box" v-bind:style="{ backgroundImage: 'url(' + baseUrl + c.image.url + ')' }"></div>
                                        </a>
                                    </div>
                                    <div class="col-6 p-0" v-if="index % 2 === 0" :class="bgClasses[index % bgClasses.length]">
                                        <a :href="c.calendly" target="_blank">
                                            <div class="mobile-box">
                                                <div class="bottom-left p-3">
                                                    <div>
                                                        <h3 v-if="lang==='en'">{{c.firstName}} {{c.lastName}}</h3>
                                                        <h3 v-if="lang==='hun'">{{c.lastName}} {{c.firstName}}</h3>
                                                    </div>
                                                    <div class="mb-2">
                                                        <span class="job-title mr-2">{{ c.title[lang] }}</span>
                                                    </div>
                                                    <div>
                                                        <span v-for="l in c.lifecycles" :key="l._id" class="tag mr-2">
                                                            <router-link :to="{ path: 'articles', query: { lifecycle: l.en }}">
                                                                {{ l[lang] }}
                                                            </router-link>
                                                        </span>
                                                        <span class="tag"><wbr></span>
                                                    </div>
                                                    <div>
                                                        <img height="25px" class="float-right" src="assets/img/arrow_right.svg" alt="Details">
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="col-6 p-0" v-if="index % 2 === 1" :class="bgClasses[index % bgClasses.length]">
                                        <a :href="c.calendly" target="_blank">
                                            <div class="mobile-box">
                                                <div class="bottom-left p-3">
                                                    <div>
                                                        <h3 v-if="lang==='en'">{{c.firstName}} {{c.lastName}}</h3>
                                                        <h3 v-if="lang==='hun'">{{c.lastName}} {{c.firstName}}</h3>
                                                    </div>
                                                    <div class="mb-2">
                                                        <span class="job-title mr-2">{{ c.title[lang] }}</span>
                                                    </div>
                                                    <div>
                                                        <span v-for="l in c.lifecycles" :key="l._id" class="tag mr-2">
                                                            <router-link :to="{ path: 'articles', query: { lifecycle: l.en }}">
                                                                {{ l[lang] }}
                                                            </router-link>
                                                        </span>
                                                        <span class="tag"><wbr></span>
                                                    </div>
                                                    <div>
                                                        <img height="25px" class="float-right" src="assets/img/arrow_right.svg" alt="Details">
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="col-6 p-0" v-if="index % 2 === 1" >
                                        <a :href="c.calendly" target="_blank">
                                            <div class="mobile-box" v-bind:style="{ backgroundImage: 'url(' + baseUrl + c.image.url + ')' }"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div v-else class="p-4">
                                <div class="row">
                                    <div v-for="(c, index) in filteredCoworkers" :key="c._id" class="col-xl-3 p-0">
                                        <a :href="c.calendly" target="_blank">
                                            <div class="box"  v-bind:style="{ backgroundImage: 'url(' + baseUrl + c.image.url + ')' }">
                                                <div class="bottom-left px-4 py-3" :class="hoverClasses[index % hoverClasses.length]">
                                                    <div class="box-content">
                                                        <div>
                                                            <h3 v-if="lang==='en'">{{c.firstName}} {{c.lastName}}</h3>
                                                            <h3 v-if="lang==='hun'">{{c.lastName}} {{c.firstName}}</h3>
                                                        </div>
                                                        <div class="mb-2">
                                                            <span class="job-title mr-2">{{ c.title[lang] }}</span>
                                                        </div>
                                                        <div>
                                                            <span v-for="l in c.lifecycles" :key="l._id" class="tag mr-2">
                                                                <router-link :to="{ path: 'articles', query: { lifecycle: l.en }}">
                                                                    {{ l[lang] }}
                                                                </router-link>
                                                            </span>
                                                            <span class="tag"><wbr></span>
                                                        </div>
                                                        <div>
                                                            <img height="25px" class="float-right" src="assets/img/arrow_right.svg" alt="Details">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
            <div v-if="active" class="modal-backdrop fade show"></div>
    </section>
</template>

<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript"></script>
<script>
    import { mapState } from 'vuex';
    
    export default {
        data() {
            return {
                baseUrl: process.env.VUE_APP_STRAPI_URI,
                width: window.innerWidth,
                active: false,
                show: false,
                colClasses: ['', '', 'offset-xl-right-3', 'offset-xl-3', '', ''],
                hoverClasses: ['bg-transparent-blue', 'bg-transparent-green'],
                bgClasses: ['bg-green', 'bg-light-blue', 'bg-dark-blue', 'bg-classic-blue']
            }
        },
        computed: { 
            ...mapState(['lang', 'base', 'contactUs', 'coworkers']),
            filteredCoworkers() {
                var c = [];
                for (var i = 0; i < this.coworkers.length; i++) {
                    if (this.coworkers[i].calendly) {
                        c.push(this.coworkers[i]);
                    }
                }
                return c;
            }
        },
        methods: {
            toggleModal() {
                const body = document.querySelector("body");
                this.active = !this.active;
                this.active
                    ? body.classList.add("modal-open")
                    : body.classList.remove("modal-open");

                setTimeout(() => (this.show = !this.show), 10);
            },
            openCalendly(url) {
                Calendly.initPopupWidget({url: url});
                return false;
            }
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });

            this.$store.dispatch('getContactUs')
        }
    }
</script>

<style>

</style>