<template>
    <div class="faq-area pt_50" v-if="faq">
        <section class="bg-white">
            <div class="container-fluid">
                <div class="row py-4">
                    <div class="col px-4 px-sm-0">
                        <h1> {{ faqTitle[lang] }}</h1>
                    </div>
                </div>
            </div>
        </section>
        <section class="faq-area bg-lightest-blue">
            <div class="container-fluid">
                <div class="row ptb_50">
                    <div class="col-12 py-4 px-4 px-sm-0">
                        <div class="panel-group wrap" id="accordion" role="tablist" aria-multiselectable="true">
                            <div class="panel" v-for="f in faq" :key="f._id">
                                <div class="panel-heading" role="tab" v-bind:id="f._id">
                                    <h4 class="panel-title">
                                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" v-bind:href="'#collapse_' + f._id" aria-expanded="false" v-bind:aria-controls="'collapse_'+ f._id">
                                            {{ f["question_" + lang] }}
                                        </a>
                                    </h4>
                                </div>
                                <div v-bind:id="'collapse_' + f._id" class="panel-collapse collapse" role="tabpanel" v-bind:aria-labelledby="f._id">
                                    <div class="panel-body">
                                        {{ f["answer_" + lang] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

</template>

<script> 
    import { mapState } from 'vuex';

    export default {
        data() {
            return { 
                width: window.innerWidth
            }
        },
        computed: { 
            ...mapState(['lang', 'faq', 'faqTitle'])
        },
        mounted() {
            window.addEventListener('resize', () => {         
                this.width = window.innerWidth       
            });

            this.$store.dispatch('getFaq');
        }
    }
</script>

<style>
/* Accordion */
.panel {
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #fff;
    background: none;
    box-shadow: none;
  }
  
  .panel:last-child {
    border-bottom: none;
  }
  
  .panel-group .panel {
    border-radius: 0;
  }
  
  .panel-group .panel + .panel {
    margin-top: 0;
  }
  
  .panel-heading {
    background-color: #fff;
    border-radius: 0;
    border: none;
    color: #000;
    padding: 0;
  }
  
  .panel-title a {
    display: block;
    color: #082744;
    padding: 35px;
    position: relative;
    font-size: 18px;
    font-weight: 400;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-top: 2px;
    padding-right: 45px;
  }
  
  .panel-body {
    background: #fff;
    padding-left: 35px;
    padding-right: 35px;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 18px;
    color: #082744;
  }
  
  /* #bs-collapse icon scale option */
  .panel-heading a:before {
    content: "\f273";
    position: absolute;
    font-family: 'Material Icons';
    right: 5px;
    font-size: 24px;
    transition: all 0.5s;
    transform: scale(1);
    padding-top: 7px;
    margin-left: 10px;
    margin-right: 10px;
    padding-bottom: 20px;
    background: none;
    color: #97B9D0 !important;
  }
  
  .panel-heading.active a:before {
    content: "\f273";
    transition: all 0.5s;
    transform: scale(0);
  }
  
  #bs-collapse .panel-heading a:after {
    content: ' ';
    font-size: 24px;
    position: absolute;
    font-family: 'Material Icons';
    right: 5px;
    top: 10px;
    transform: scale(0);
    transition: all 0.5s;
  }
  
  #bs-collapse .panel-heading.active a:after {
    content: "\e909";
    transform: scale(1);
    transition: all 0.5s;
  }
  /* #accordion rotate icon option */
  
  #accordion .panel-heading a:before {
    content: "\e15b";
    font-size: 24px;
    position: absolute;
    right: 5px;
    top: 10px;
    transition: all 0.5s;
  }

  #accordion .panel-heading .collapsed:before {
    content: "\e145"; /* ez jó */
    font-family: 'Material Icons';
    font-size: 24px;
    position: absolute;
    right: 5px;
    top: 10px;
    transition: all 0.5s;
    color: #97B9D0
  }
  
  
  #accordion .panel-heading.active a:before {
    content: "\e15b";
    transition: all 0.5s;
  }

</style>