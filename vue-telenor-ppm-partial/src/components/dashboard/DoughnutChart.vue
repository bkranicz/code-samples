
<script>
    import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
    import { Doughnut, mixins } from 'vue-chartjs'

  export default {
    extends: Doughnut,
    mixins: [ mixins.reactiveData, mixins.reactiveProp ],
    components: {
        ChartJsPluginDataLabels,
    },

    props: {
      chartData: {
        type: Array | Object,
        required: false
      },
      chartLabels: {
        type: Array,
        required: true
      },
      primary: {
          type: String,
          required: true
      }
    },

    data () {
      return {
            options: {
                responsive: true, 
                maintainAspectRatio: false,
     /*            legend: {            
                    onClick(e) {
                        console.log(e) //e.stopPropagation()
                    } 
                },  */
                title:{
                    text: "Doughnut Chart",
                    verticalAlign: "center",
                    dockInsidePlotArea: true
                },
                tooltips: {
                    enabled: true,
                    callbacks: {
                        label: ((tooltipItems, data) => {
                            let dataset = data.datasets[tooltipItems.datasetIndex]
                            let currentValue = dataset.data[tooltipItems.index]
                            return currentValue/8/5 + ' FTE'
                        })
                    }
                },
                pieceLabel: {
                    mode: 'percentage',
                    precision: 1
                }
            }
      }
    },

     computed: {

        datasets() {
            var data = [{
                backgroundColor: [
                    '#16394F',
                    '#B23C26',
                    '#E37633',
                    '#E6CA56',
                    '#A7B772',
                    '#4194B8'
                ],
                data: this.chartData[this.primary],
                datalabels: {
                    formatter: function(value, context) {
                        var sum = 0;
                        var indexes = [];

                        //custom index for the chart
                        var key = Object.keys(context.dataset._meta)[0]; 

                        //Get the visible data indexes
                        for (var j = 0 ; j < context.dataset._meta[key].data.length; j ++) {
                            var chartElement = context.dataset._meta[key].data[j];
                            if (!chartElement.hidden) {
                                indexes.push(j)
                            }
                        }

                        //Calculate the sum of the visible data
                        for (var i = 0; i < indexes.length; i++) {
                            var visibleDataIndex = indexes[i];
                            sum += context.dataset.data[visibleDataIndex];
                        }

                        if (value === 0) {
                            return null
                        } else {
                            return Math.round((value/sum) * 100) + '%';
                        }
                        
                    },
                    color: '#FFFFFF',
                    font: {
                        size: 15,
                        weight: 'bold'
                    }
                }
            }]
            
            return data;
        }
    }, 

    methods: {
    },

    watch: {
        primary() {
            this._data._chart.destroy();

            this.renderChart({
                labels: this.chartLabels,
                datasets: this.datasets
            }, this.options )
        }
    },

    mounted () {
      this.renderChart({
            labels: this.chartLabels,
            datasets: this.datasets
        }, this.options )
    }
  }
</script>

