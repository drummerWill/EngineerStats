Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    data () {
      return {
        showCount: false,
        showHello: false,
        showImage: true,
        count: 0,
        engineers:[]
      }
    },
    methods:{
      changeToImage(){
        this.showImage = true;
        this.showCount = false;
        this.showHello = false;
      }
    },
    mounted () {
      debugger;
      let self = this
      axios.get('/test')
        .then(response => {
            debugger;
            self.engineers=response.data
        });
    },
  })

