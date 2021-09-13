<template>
    <footer class="section footer-area">
        <!-- Footer Top -->
        <cookie-law theme="dark-lime--rounded" :buttonText="acceptText">
            <div slot="message">
               <span v-if="lang === 'hun'">Oldalaink látogatásával jóváhagyod a cookie-k használatát. <router-link class="text-white text-underline" :to="'/legal'">Részletek</router-link></span>
               <span v-if="lang === 'en'">By using our sites, you are consenting to our use of cookies. <router-link class="text-white text-underline" :to="'/legal'">Details</router-link></span>
            </div>
        </cookie-law>

        <div class="footer-top">
            <div class="container-full">
                <div class="row" id="map" v-if="width > 1199">
                    <div class="col p-0">
                        <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=MOM%20bev%C3%A1s%C3%A1rl%C3%B3&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>
                    </div>
                </div>
                <div class="row align-items-end">
                    <div class="col-xl-4 p-0 footer-img bg-light-blue text-center" v-if="width > 1199">
                        <img src="/assets/img/hq_dotted.png" alt="Head Quarter" width="80%" class="pt-4"> 
                    </div>
                    <div class="col-xl-8 footer-main-content aling-items-end" id="footerContent" v-if="contact">
                        <div class="row" id="footerContact" ref="footerContact">
                            <div class="col bg-classic-blue">
                                <div class="row px-4 pt-4 pb-2">
                                    <div class="col">
                                      <h2>{{ contact.title[lang] }}</h2>
                                    </div>
                                </div>
                                <div class="row px-4 pb-2">
                                    <div class="col-lg-6">
                                        <div class="row">
                                            <div class="col-md-6 my-4">
                                                <p class="nav-item">{{ contact.address }}</p>
                                            </div>
                                            <div class="col-md-6 my-4">
                                                <a :href="'mailto:' + contact.email" class="nav-item">{{ contact.email }}</a>
                                            </div>
                                            <div class="col-md-6 my-4">
                                                <a :href="'tel:' + contact.phone" class="nav-item">{{ contact.phone }}</a>
                                            </div>
                                            <div class="col-md-6 my-4">
                                                <a class="nav-item" target="_blank" :href="contact.linkedin"><img src="/assets/img/linkedin.svg" alt="Linkedin" class="mr-2" height="26px"></a>
                                                <a v-if="contact.crunchbase" class="nav-item" target="_blank" :href="contact.crunchbase"><img src="/assets/img/cb.svg" alt="Crunchbase" height="26px"></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3">
                                        <div class="row">
                                            <div class="col-12">
                                                <p class="nav-item">{{ contact.pitchText[lang] }}</p>
                                            </div>
                                            <div class="col-12">
                                                <a class="btn bg-red bookPitchBtn my-4" target="_blank" :href="contact.applyButton.url">{{ contact.applyButton[lang] }}</a>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row" id="map" v-if="width < 1200">
                            <div class="col p-0">
                                <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=MOM%20bev%C3%A1s%C3%A1rl%C3%B3&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>
                            </div>
                        </div>
                        <div class="row">
                          <div class="col contact-session bg-dark-blue">
                              <div class="row px-4 py-2">
                                  <div class="col-xl-9 col-9 my-4">
                                         <div class="float-left">
                                            <img v-if="lang === 'hun'" src="/assets/img/portfolion_logo.svg" alt="Portfolion">
                                            <img v-if="lang === 'en'" src="/assets/img/portfolion_logo_en.svg" alt="Portfolion">
                                        </div>
                                  </div>
                              </div>
                              <div class="row px-4 py-4">
                                    <div class="my-4 col-xl-3 col-4" :class="(index > 0 && (index + 1) % 3 === 0) ? 'offset-xl-right-3' : ''" v-for="(u, index) in contact.Links" :key="u._id">
                                        <router-link class="nav-item my-4" :class="index % 3 === 0 ? 'fw-7' : ''" :to="u.url">{{ u[lang] }}</router-link>
                                    </div>
                                    <div class="my-4 col-xl-3 col-4">
                                            <div class="">
                                                <u v-if="lang === 'hun'"><a class="nav-item fw-7" v-on:click="changeLang('en')" href="javascript:void(0)">English</a></u>
                                                <u v-if="lang === 'en'"><a class="nav-item fw-7" v-on:click="changeLang('hun')" href="javascript:void(0)">Magyar</a></u>
                                            </div>
                                    </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript"></script>
<script>
    import CookieLaw from 'vue-cookie-law';
    import { mapState } from 'vuex';

    export default {
        components: { 
            CookieLaw 
        },
        data() {
            return {
                width: window.innerWidth,
                height: ''
            }
        },
        computed: { 
            ...mapState(['lang', 'contact']),
            acceptText() {
                if (this.lang === 'hun') {
                    return 'Rendben!';
                } else {
                    return 'Got it!'
                }
            }
        },
        methods: {
            changeLang(lang) {
                this.$store.commit('setLanguage', lang);
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

            if (!this.$store.state.contact) {
                this.$store.dispatch('getContact');
            }
        }
    }
</script>

<style>
.Cookie {
    z-index: 999 !important;
}
</style>