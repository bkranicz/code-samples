<template>
    <section id="about" class="section ptb_50 about-section" v-if="about">
        <div class="container-fluid" :class="color">
            <div class="row">
                <div class="col-xl-6 who-we-want who-we-want">
                    <div class="ptb_50 px-sm-4 pl-xl-0">
                        <h3 class="mb-4">{{ about.details1['name_' + lang] }}</h3>
                        <p>{{ about.details1['value_' + lang] }}</p>
                    </div>
                </div>
                <div class="col-xl-6">
                    <div class="row">
                        <div class="col-12 vision">
                            <div class="ptb_50 px-sm-4 pr-xl-0">
                                <h3 class="mb-4">{{ about.details2['name_' + lang] }}</h3>
                                <p>{{ about.details2['value_' + lang] }}</p>
                            </div>
                        </div>
                        <div class="col-12 founds">
                            <div class="ptb_50 px-sm-4 pr-xl-0">
                                <p>{{ about.details3['name_' + lang] }}</p>
                                <h3>{{ about.details3['value_' + lang] }}</h3>
                            </div>
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
        props: ['about', 'color'],
        computed: { 
            ...mapState(['lang'])
        }
    }
</script>

<style>
.about-section .who-we-want {
    background-color: #082744 !important;
}

.about-section .who-we-want:before {
    content:"";
    background-color:#082744;
    position: absolute;
    height: 100%;
    width: 200vw;
    left: -199vw;
    z-index: -1;
}

.about-section .green .who-we-want {
    background-color: #9DCC8F !important;
}

.about-section .green .who-we-want:before {
    background-color:#9DCC8F;
}


.about-section .who-we-want h3 {
    color: white;
    font-family: 'Squad';
    font-weight: 800;
    font-size: 40px;
    line-height: 52px;
}

.about-section .who-we-want p { 
    font-weight: 400;
    font-size: 18px;
    line-height: 36px;
    color: white;
}

.about-section .vision {
    background-color: #E8F3FC !important
}

.about-section .vision:before {
    content:"";
    background-color: #E8F3FC !important;
    position: absolute;
    height: 100%;
    width: 200vw;
    z-index: -1;
}

.about-section .vision h3 {
    color: #082744;
    font-family: 'Squad';
    font-weight: 800;
    font-size: 40px;
    line-height: 52px;
}

.about-section .vision p {
    font-weight: 400;
    font-size: 18px;
    line-height: 36px;
    color: #151617;
}


.about-section .founds h3 {
    color: white;
    font-family: 'Squad';
    font-weight: 800;
    font-size: 40px;
    line-height: 52px;
}

.about-section .founds p {
    font-weight: 400;
    font-size: 18px;
    line-height: 36px;
    color: white;
}

.about-section .founds {
    background-color: #104E88 !important
}

.about-section .founds:before {
    content:"";
    background-color: #104E88 !important;
    position: absolute;
    height: 100%;
    width: 200vw;
    z-index: -1;
}

.about-section .green .founds {
    background-color: #74BE59 !important
}

.about-section .green .founds:before {
    background-color: #74BE59 !important;
}

</style>