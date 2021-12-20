Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    data () {
      return {
        showChart: false,
        showMap: true,
        showStats: false,
        count: 0,
        engineers:[]
      }
    },
    methods:{
      changeToStats(){
        this.showStats = true;
        this.showChart = false;
        this.showMap = false;
      },
      changeToChart(){
        this.showStats = false;
        this.showChart = true;
        this.showMap = false;
        
        },
      changeToMap(){
        this.showStats = false;
        this.showChart = false;
        this.showMap = true;
      }
    },
    mounted () {
      let self = this
      var map = L.map('map').setView([32, -96], 4);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
      }).addTo(map);
      axios.get('/test')
        .then(response => {
        
            self.engineers=response.data
            eng = self.engineers
            let [times, numbers] = getTimeSeries(eng)
            labels = times
            const ctx = document.getElementById('myChart');
            const chart = new Chart(ctx, {
              type: 'line',
              data: {
                labels,
                datasets: [{
                  label: '# of Votes',
                  data: numbers,
                  borderWidth: 1
                }]
              },
              options: {}
            });
            heats = [];
            eng.forEach(engineer => {
              if (engineer.Lat)
                heats.push([engineer.Lat, engineer.Long,1])
            });
            
            var heat = L.heatLayer(heats, {radius: 10, blur: 1}).addTo(map);
        });
    },
  })

