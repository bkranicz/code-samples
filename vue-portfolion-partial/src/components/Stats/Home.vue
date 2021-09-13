<template>
    <section id="stats" class="section stats-section ptb_100" v-if="stats">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-xl-7 px-4 px-sm-0">
                    <div class="row">
                        <div class="col">
                            <div class="stat-number text-dark-blue">
                                {{ stats.stat1["value_" + lang] }}
                            </div>
                            <div class="stat-desc">
                                {{ stats.stat1["name_" + lang] }}
                            </div>
                        </div>
                        <div class="col">
                            <div class="stat-number text-dark-blue">
                                {{ stats.stat2["value_" + lang] }}
                            </div>
                            <div class="stat-desc">
                                {{ stats.stat2["name_" + lang] }}
                            </div>
                        </div>
                        <div class="col">
                            <div class="stat-number text-dark-blue">
                                {{ stats.stat3["value_" + lang] }}
                            </div>
                            <div class="stat-desc">
                                {{ stats.stat3["name_" + lang] }}
                            </div>
                        </div>
                        <div class="col">
                            <div class="stat-number text-dark-blue">
                                {{ stats.stat4["value_" + lang] }}
                            </div>
                            <div class="stat-desc">
                                {{ stats.stat4["name_" + lang] }}
                            </div>
                        </div>
                    </div>
                    <div class="row my-4 second-row">
                        <div class="col">
                            <div class="stat-number text-dark-blue">
                                {{ stats.stat5["value_" + lang] }}
                            </div>
                            <div class="stat-desc">
                                {{ stats.stat5["name_" + lang] }}
                            </div>
                        </div>
                        <div class="col">
                            <div class="stat-number text-dark-blue">
                                {{ stats.stat6["value_" + lang] }}
                            </div>
                            <div class="stat-desc">
                                {{ stats.stat6["name_" + lang] }}
                            </div>
                        </div>
                        <div class="col">
                            <div class="stat-number text-dark-blue">
                                {{ stats.stat7["value_" + lang] }}
                            </div>
                            <div class="stat-desc">
                                {{ stats.stat7["name_" + lang] }}
                            </div>
                        </div>
                        <div class="col">
                            <div class="stat-number text-dark-blue">
                                {{ stats.stat8["value_" + lang] }}
                            </div>
                            <div class="stat-desc">
                                {{ stats.stat8["name_" + lang] }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-xl-5 px-4 px-sm-0 stat-text">
                    <h3 class="mb-2"> {{ stats.title[lang] }}</h3>
                    <p> {{ stats.subtitle[lang] }} </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: { 
            ...mapState(['lang', 'stats'])
        },
        mounted() {
            this.$store.dispatch('getStats');
        }
    }
</script>

<style>
.stats-section .second-row {
    padding-top: 5px;
}

.stat-text h3 {
    color: #082744;
    font-size: 40px;
    font-weight: 800;
    font-family: 'Squad';
    line-height: 55px;
}

.stat-text p {
    color: black;
    font-size: 18px;
    line-height: 36px;
    font-weight: 400;
}

.stat-number {
    font-size: 40px;
    font-weight: 800;
    font-family: 'Squad';
    line-height: 55px;
}

.stat-desc {
    color: #23293D;
    font-size: 18px;
    font-weight: 400;
    font-family: 'Squad';
}

@media (min-width: 1199px) {
    .stats-section .second-row {
        padding-top: 50px;
    }
}

@media (max-width: 767px) {
    .stat-number {
        font-size: 24px;
        line-height: 30px;
    }
    
    .stat-desc {
        font-size: 14px;
    }

    .stats-section h3 {
        font-size: 36px;
        line-height: 38px;
    }
}
</style>