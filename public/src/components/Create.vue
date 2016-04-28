<script>
import Loader from './Loader.vue'
import http from '../services/http'


export default {
	components: {
		Loader
	},


  data () {
    return {
		 	loading: false,
      model: {
        name: null,
        screen_name: null,
        type:null,
        profile_image_url:null
      }
		}
  },



	/*Form Events*/
	methods: {
		clickCancel(){
      this.model = {};
			this.$dispatch('clickcancel');
		},


		clickSave(){
      this.loading = true;
      let method = this.model.id ? 'put' : 'post'

			http[method]('/api/wags', this.model, (res) => { 
        setTimeout(() => { 
           this.loading = false;
           this.clickCancel() 
        }, 900);

      }, (err) => {
        setTimeout(() => { this.loading = false; }, 900);
      });
		},


    open(wag){
      this.model = wag;
    },
		
		
		showFailPass(){
			document.querySelector('#wrap_pass').className+= ' is-invalid';
			document.querySelector('#wrap_repass').className+= ' is-invalid';
		},



		clearFail(){
			document.querySelector('#wrap_repass').className = 
			document.querySelector('#wrap_repass').className.replace(/is-invalid/g,'');
		}
	}


}
</script>

<template lang='jade'>
  Loader(:show='loading')
  .mdl-card.mdl-shadow--2dp.full
    .mdl-grid
      .mdl-cell.mdl-cell--12-col
        .mdl-cell.mdl-cell--12-col
          mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary) 
            i.material-icons keyboard_arrow_left

          mdl-button(@click='clickSave', v-mdl-ripple-effect, raised, primary)
            i.material-icons cloud_upload

        .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet.black
          div(v-if='model.id')
            h3 {{ model.name }}
          mdl-textfield(floating-label, label='Name', :value.sync='model.name', v-else)
          mdl-textfield(floating-label, label='Screen Name', :value.sync='model.screen_name') 
          mdl-textfield(floating-label, label='Type', :value.sync='model.type') 
          mdl-textfield(floating-label, label='Img Url', :value.sync='model.profile_image_url', type='url') 
        .mdl-cell.mdl-cell--9-col.mdl-cell--8-col-tablet.black
          img(v-bind:src='model.profile_image_url')
</template>

<style lang='stylus'>
.full
  width: 100%
</style>
