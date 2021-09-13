<template>
    <div id="home">
      <div>
        <h4 class="font-weight-bold py-3 mb-4">
          <span class="text-muted font-weight-light"> 
            <span class="lnr lnr-home"></span> / Admin / </span>Parameters 
        </h4>
        <hr class="border-light container-m--x my-4">
      </div>
      <b-card>
          
          <div v-for="(value, name) in parameters" :key="name">
            <div v-if="Array.isArray(value)">
                <div class="text-muted">{{name}}</div>
                <multiselect 
                    placeholder="Add or delete parameters" 
                    :id="name"
                    v-model="parameters[name]" 
                    :options="parameters[name]" 
                    :multiple="true" 
                    :taggable="true" 
                    class="multiselect-primary" 
                    @tag="addTag">
                </multiselect>
                <br>
            </div>
            <div v-else>
                {{name}}: {{value}}
            </div>
         </div>
         <br>
        <b-btn variant="primary" size="md" @click="saveParams"><i class="fas fa-paper-plane"></i> Save</b-btn>
      </b-card>
    </div>
</template>


<script>
import Multiselect from 'vue-multiselect'
import { mapState } from 'vuex'

export default {
    components: {
        Multiselect
    },
    data() {
        return {
            params: ''
        }
    },
    computed: {
        ...mapState(['loadState']),
        parameters() {
            return this.params = JSON.parse(JSON.stringify(this.$store.state.parameters));
        }
    },
    methods: {
        addTag (tag, parameter) {
            this.parameters[parameter].push(tag)
        },
        saveParams() {
            this.$store.dispatch('saveParameters', this.parameters);
        }
    },
    mounted() {
        this.$store.dispatch('getParameters');
    }
}

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"> </style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>
<style scoped>


</style>

