Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    data () {
      return {
        showChart: false,
        showMap: false,
        showStats: true,
        showAbout: false,
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
        this.showAbout = false;
      },
      changeToChart(){
        this.showStats = false;
        this.showChart = true;
        this.showMap = false;
        this.showAbout = false;

        },
      changeToMap(){
        this.showStats = false;
        this.showChart = false;
        this.showMap = true;
        this.showAbout = false;

      },
      changeToAbout(){
        this.showStats = false;
        this.showChart = false;
        this.showMap = false;
        this.showAbout = true;

      },
      loadMap(){
          var map = L.map('map').setView([32, -96], 4);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
          }).addTo(map);
          map.maxZoom = 1;
          var theHeats = L.heatLayer(this.heats, {radius: 10, blur: 1}).addTo(map)
          this.heatsLoaded = true
        
      },
      renderPieChart(groups){
        let labels = Object.keys(groups)
        let data = Object.values(groups)
        const colorScheme = [
          "#25CCF7","#FD7272","#54a0ff","#00d2d3",
          "#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e",
          "#16a085","#27ae60","#2980b9","#8e44ad","#2c3e50",
          "#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6",
          "#f39c12","#d35400","#c0392b","#bdc3c7","#7f8c8d",
          "#55efc4","#81ecec","#74b9ff","#a29bfe","#dfe6e9",
          "#00b894","#00cec9","#0984e3","#6c5ce7","#ffeaa7",
          "#fab1a0","#ff7675","#fd79a8","#fdcb6e","#e17055",
          "#d63031","#feca57","#5f27cd","#54a0ff","#01a3a4"
      ]

      var dynamicColors = function() {
        var r = Math.round(Math.floor(Math.random() * 255));
        var g = Math.round(Math.floor(Math.random() * 255));
        var b =Math.round(Math.floor(Math.random() * 255));
        return "rgb(" + r + "," + g + "," + b + ")";
     };

      var selectedColors = []

      for (let index = 0; index < labels.length; index++) {
        selectedColors.push(dynamicColors());
        
      }
      debugger;

        new Chart(document.getElementById("pie-chart"), {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: "Population (millions)",
              data: data,
              backgroundColor: colorScheme
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
            groups = genericGrouper(eng, "Branch")
            this.renderPieChart(groups)
            console.log(groups)
            let [times, numbers, xyseries] = getTimeSeries(eng)
            const ctx = document.getElementById('myChart');
            let timeseries = otherTimeSeries(eng)
            let numberseries = numberTimeSeries(eng)
            console.log(timeseries)
            const chart = new Chart(ctx, {
              type: 'scatter',
            data: {datasets:[{label: "Test",
             data: xyseries},
             {label: "Test 2 ",
             data: numberseries}]},
            options: {
              scales: {
                x: {
                  type: 'time',
                  position: 'bottom'
                }
              }
            }
            });


          //   const chart = new Chart(ctx, {
          //     type: 'scatter',
          //   data: {datasets:[{label: "Test",
          // data: xyseries}]},
          //   options: {
          //     scales: {
          //       x: {
          //         type: 'linear',
          //         position: 'bottom'
          //       }
          //     }
          //   }
          //   });
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

