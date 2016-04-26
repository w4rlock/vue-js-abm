import Vue from 'vue'
import Mdl from 'vue-mdl';
import Vhttp from 'vue-resource';
import App from './App'

Vue.use(Mdl);
Vue.use(Vhttp);

/*
 *Vue.http.interceptors.push(() => { 
 *  return {
 *    request(req){
 *      return req;
 *    },
 *    response(res){
 *    
 *    }		
 *  }
 *
 *});
 */

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})
