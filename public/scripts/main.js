Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    data () {
      return {
        showCount: false,
        showHello: true,
        showImage: false,
        count: 0
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
            console.log(response)
        });
    },
  })

