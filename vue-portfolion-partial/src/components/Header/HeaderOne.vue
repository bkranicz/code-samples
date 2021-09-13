<template>
    <header class="section">
        <div id="appo-header" class="main-header-area" v-bind:class="headerClass" name="header">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-xl navbar-light">
                    <!-- Logo -->
                    <router-link class="navbar-brand" :to="'/'" @click.native="scrollToTop">
                        <img v-if="lang === 'hun'" class="logo" id="logo" src="/assets/img/portfolion_logo.svg" alt="Portfolion">
                        <img v-if="lang === 'en'" class="logo" id="logo" src="/assets/img/portfolion_logo_en.svg" alt="Portfolion">
                    </router-link>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#appo-menu">
                        <span class="navbar-toggler-icon">
                            <img src="/assets/img/hamburger.svg" alt="Menu" id="hamburger">
                            <Slide right :burgerIcon="true" :crossIcon="true" :closeOnNavigation="false" noOverlay>
                                <span v-for="h in header" :key="h._id">
                                    <div v-if="h.sublink.length === 0">
                                        <router-link :to="h.url" class="text-white" @click.native="scrollToTop">
                                            {{ h[lang] }}
                                        </router-link>
                                    </div>
                                    <div v-else>
                                        <div @click="openDD(h._id)" class="text-white">
                                            {{ h[lang] }} <span class="material-icons"> arrow_drop_down</span>
                                        </div>
                                        <div v-if="selectedMenu === h._id">
                                            <div class="ml-2 my-3" style="text-align: left;" v-for="s in h.sublink" :key="s._id">
                                                <router-link :to="s.url" class="text-white" @click.native="scrollToTop">{{ s[lang] }}</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                                <span>
                                    <a v-if="lang === 'hun'" @click="closeMenu" class="text-white" href="javascript:void(0)" v-scroll-to="'#footerContact'">Kapcsolat</a>
                                    <a v-if="lang === 'en'" @click="closeMenu" class="text-white" href="javascript:void(0)" v-scroll-to="'#footerContact'">Contact</a>
                                </span>
                                <span>
                                    <u v-if="lang === 'hun'"><a class="text-white" v-on:click="changeLang('en')" href="javascript:void(0)">English</a></u>
                                    <u v-if="lang === 'en'"><a class="text-white" v-on:click="changeLang('hun')" href="javascript:void(0)">Magyar</a></u>
                                </span>
                                <img class="sidebar-decor" src="/assets/img/sidebar_decor.svg" alt="Sidebar">
                            </Slide>
                        </span>
                    </button>
                    <!-- Appo Menu -->
                    <div v-if="width > 1199" class="collapse navbar-collapse" id="appo-menu">
                        <!-- Header Items -->
                        <ul class="navbar-nav header-items ml-auto text-white" v-if="header">
                            <div v-for="h in header" :key="h._id">
                                <li class="nav-item mr-2 mr-xl-4" v-if="h.sublink.length === 0">
                                    <router-link class="nav-link" :to="h.url" @click.native="scrollToTop">{{ h[lang] }}</router-link>
                                </li>
                                <li v-else class="nav-item mr-2 mr-xl-4 dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown-2" role="button" data-toggle="dropdown">
                                        {{ h[lang] }}
                                    </a>
                                    <div class="dropdown-menu mega-menu blog-menu px-3 py-md-3">
                                        <div class="row">
                                            <div class="col-12">
                                                <ul class="single-menu">
                                                    <li v-for="s in h.sublink" :key="s._id">
                                                        <router-link class="dropdown-item nav-item" :to="s.url" @click.native="scrollToTop">{{ s[lang] }}</router-link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </div>
                            <div style="z-index: 5;">
                                <li class="nav-item mr-2 mr-xl-4">
                                    <a v-if="lang === 'hun'" class="nav-link" href="javascript:void(0)" v-scroll-to="'#footerContact'">Kapcsolat</a>
                                    <a v-if="lang === 'en'" class="nav-link" href="javascript:void(0)" v-scroll-to="'#footerContact'">Contact</a>
                                </li>
                            </div>
                            <li class="nav-item">
                                <u v-if="lang === 'hun'"><a class="nav-link" v-on:click="changeLang('en')" href="javascript:void(0)">English</a></u>
                                <u v-if="lang === 'en'"><a class="nav-link" v-on:click="changeLang('hun')" href="javascript:void(0)">Magyar</a></u>
                            </li>
                        </ul>
                    </div>

                </nav>
            </div>
        </div>
    </header>
</template>

<script>
import { Slide } from 'vue-burger-menu'
import { mapState } from 'vuex';

export default {
    props: ['color'],
    components: {
        Slide
    },
    data() {
        return {
            width: window.innerWidth,
            selectedMenu: ''
        }
    },
    computed: { 
        ...mapState(['lang', 'base', 'header']),
        headerClass() {
            if (this.color === 'blue') {
                return 'header-area-blue'
            } else  {
                return 'header-area'
            }
        }
    },
    methods: {
      changeLang(lang) {
          this.$store.commit('setLanguage', lang);
      },
      openDD(id) {
          if (this.selectedMenu === id) {
              this.selectedMenu = '';
          } else {
            this.selectedMenu = id;
          }
      },
      scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
      },
      closeMenu() {
          document.getElementsByClassName("bm-menu")[0].style.width = 0;
      },
      scrollToFooter() {
            var container = this.$refs.footerContact;
            const el = this.$el.getElementsByClassName('footer-area')[0];

        container.scrollTop = container.scrollHeight + 120;
            if (el) {
            el.scrollIntoView();
            }
      }
    },
    mounted() {
        window.addEventListener('resize', () => {         
            this.width = window.innerWidth       
        });

        if(!this.$store.state.base) {
            this.$store.dispatch('getBase');
        }

        if(!this.$store.state.header) {
            this.$store.dispatch('getHeader');
        }
    }
}
</script>

<style>
.bm-burger-bars {
      background-color: transparent !important;
    }

.bm-burger-button {
    top: 15px !important;
    right: 15px !important;
}

.bm-menu { 
    background-color:#082744 !important;
}

.bm-item-list .material-icons { 
    font-size: 18px;
}

.bm-item-list {
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
}

.bm-cross-button {
    right: 20px !important;
    top: 20px !important;
}

.bm-cross {
    height: 25px !important;
    width: 2px !important;
    color: white !important;
}

.router-link-active {
    color: #74BE59 !important;
}
</style>