Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    data () {
      return {
        showChart: false,
        showMap: false,
        showStats: true,
        count: 0,
        engineers:[],
        heats: null,
        heatsLoaded:false,
        map: {}
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
       
      },
      loadMap(){
          var map = L.map('map').setView([32, -96], 4);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          }).addTo(map);
          debugger;
          var theHeats = L.heatLayer(this.heats, {radius: 10, blur: 1}).addTo(map)
          this.heatsLoaded = true
        
      },
      renderPieChart(groups){
        let labels = Object.keys(groups)
        let data = Object.values(groups)
        new Chart(document.getElementById("pie-chart"), {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: "Population (millions)",
              data: data
            }]
          },
          options: {
            title: {
              display: true,
              text: 'Predicted world population (millions) in 2050'
            }
          }
      });
      },
    },
    mounted () {
      let self = this     
      axios.get('/test')
        .then(response => {
            
            self.engineers=response.data
            eng = self.engineers
            groups = getGroups(eng)
            this.renderPieChart(groups)
            console.log(groups)
            let [times, numbers, xyseries] = getTimeSeries(eng)
            debugger;
            const ctx = document.getElementById('myChart');
            const chart = new Chart(ctx, {
              type: 'scatter',
            data: {datasets:[{label: "Test",
          data: xyseries}]},
            options: {
              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom'
                }
              }
            }
            });
            heats = [];
            eng.forEach(engineer => {
              if (engineer.Lat)
                heats.push([engineer.Lat, engineer.Long,1])
            });
            this.map = map
            this.heats = heats 
        });
    },
  })

