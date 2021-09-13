<template>
    <markdown-it-vue 
        class="md-body" 
        :content="description" 
        :options="options"
    />
</template>

<script>

export default {
    props: ['description'],
    data() {
        return {
            options: {
                markdownIt: {
                    linkify: false
                },
                linkAttributes: {
                    attrs: {
                    target: '_blank',
                    rel: 'noopener'
                    }
                }
            }
        };
    }
}
</script>

<style>
    @import './../../../node_modules/markdown-it-vue/dist/markdown-it-vue.css';

    .markdown-body blockquote {
        border: none !important;
        padding-top: 40px;
        padding-bottom: 40px;
        padding-left: 20px;
        padding-right: 20px;
        margin-left: -30px;
        background-image: url("/assets/img/quote.svg");
        background-repeat: no-repeat;
        background-position: 1% 3%;
    }

    .markdown-body blockquote p {
        margin-top: 20px !important;
        padding: 30px;
        font-size: 18px;
        background-color: #E8F3FC !important;
    }
    
    .anchor {
        display: none;
    }
</style>