Vue.config.devtools = true;

var app = new Vue({
    el: '#app',
    data () {
      return {
      }
    },
    mounted () {
      axios.get('/test')
        .then(response => {
            console.log(response)
        });
    },
  })