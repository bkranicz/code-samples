<template>
    <footer class="section footer-area">
        <!-- Footer Top -->
        <div class="footer-top">
            <div class="container-full">
                <div class="row">
                    <div class="col p-0">
                        <div class="mapouter"><div class="gmap_canvas"><iframe width="100%" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=MOM%20bev%C3%A1s%C3%A1rl%C3%B3&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 p-0 footer-img">
                        <img src="/assets/img/hq.png" alt="Head Quarter" width="100%"> 
                    </div>
                    <div class="col-lg-8 footer-main-content" v-if="contact">
                        <div class="row f-h-50">
                            <div class="col bg-dark-blue">
                                <div class="row p-4">
                                    <div class="col">
                                        <div class="float-left">
                                            <img src="/assets/img/portfolion_logo.svg" alt="Portfolion">
                                        </div>
                                        <div class="float-right">
                                            <u v-if="lang === 'hun'"><a class="nav-item" v-on:click="changeLang('en')" href="javascript:void(0)">English</a></u>
                                            <u v-if="lang === 'en'"><a class="nav-item" v-on:click="changeLang('hun')" href="javascript:void(0)">Magyar</a></u>
                                        </div>
                                    </div>
                                </div>
                                <div class="row p-4 f-h-100">
                                    <div class="col-lg-3 col-4 mb-4" v-for="u in contact.Links" :key="u._id">
                                        <router-link class="nav-item" :to="u.url">{{ u[lang] }}</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row f-h-50">
                          <div class="col contact-session">
                              <div class="row p-4">
                                  <div class="col">
                                      <h2>{{ contact.title[lang] }}</h2>
                                  </div>
                              </div>
                              <div class="row p-4">
                                    <div class="col-lg-4">
                                        <p class="nav-item my-4">{{ contact.address }}</p>
                                        <p class="nav-item my-4">{{ contact.email }}</p>
                                        <p class="nav-item my-4">{{ contact.phone }}</p>
                                    </div>
                                    <div class="col-lg-4">
                                        <p class="my-4">
                                            <router-link class="nav-item" :to="contact.medium">Medium</router-link>
                                        </p>
                                        <p class="my-4">
                                            <router-link class="nav-item" :to="contact.twitter">Twitter</router-link>
                                        </p>
                                        <p class="my-4">
                                            <router-link class="nav-item" :to="contact.linkedin">Linkedin</router-link>
                                        </p>
                                    </div>
                                    <div class="col-lg-4">
                                        <div class="text-center my-4">
                                            <button class="btn bg-green">{{ contact.bookButton[lang] }}</button>
                                        </div>
                                        <div class="text-center my-4">
                                            <button class="btn bg-green">{{ contact.applyButton[lang] }}</button>
                                        </div>
                                    </div>
                              </div>
                              <div class="row p-4 justify-content-end">
                                    <div class="col float-right">
                                        <span v-for="l in contact.Legal" :key="l._id">
                                            <router-link class="nav-item float-right mx-4" :to="l.url">{{ l[lang] }}</router-link>
                                        </span>          
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

<script>
    import { mapState } from 'vuex';

    export default {
        computed: { 
            ...mapState(['lang', 'contact'])
        },
        methods: {
            changeLang(lang) {
                this.$store.commit('setLanguage', lang);
            }
        },
        mounted() {
            if (!this.$store.state.contact) {
                this.$store.dispatch('getContact');
            }
        }
    }
</script>

<style>

</style>