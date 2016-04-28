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
      error: null,
      model: {
        name: null,
        screen_name: null,
        type:null,
        query:null,
        profile_image_url:null,
        profile_banner_url:null
      }
		}
  },



	/*Form Events*/
	methods: {
		clickCancel(){
      this.model = {};
      this.error = null;
			this.$dispatch('clickcancel');
		},


		clickSave(){
      this.error = null;
      this.loading = true;
      let method = this.model.id ? 'put' : 'post'

			http[method]('/api/wags', this.model, (res) => { 
        setTimeout(() => { 
           this.loading = false;
           this.clickCancel() 
        }, 900);

      }, (er) => {
        setTimeout(() => { 
          this.error = er.data.err;
          this.loading = false; 
        }, 900);
      });
		},


    open(wag){
      this.model = wag;
    },
		
		
		showFailPass(elem){
			document.querySelector(elem).className+= ' is-invalid';
			document.querySelector(elem).className+= ' is-invalid';
		},



		clearFail(elem){
			document.querySelector(elem).className = 
			document.querySelector(elem).className.replace(/is-invalid/g,'');
		}
	}


}
</script>

<template lang='jade'>
  .overlay-wrap(v-show='loading')
    Loader(:show='true')
  .mdl-card.mdl-shadow--2dp.full
    .mdl-grid
      .mdl-cell.mdl-cell--12-col
        .mdl-cell.mdl-cell--12-col
          mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary) 
            i.material-icons keyboard_arrow_left

          mdl-button(@click='clickSave', v-mdl-ripple-effect, raised, primary)
            i.material-icons cloud_upload

        .mdl-cell.mdl-cell--12-col.mdl-cell--12-col-tablet.black
          h4.err(v-show='error') {{ error }}
          div(v-if='model.id')
            h3 {{ model.name }}

          mdl-textfield(floating-label, label='Name', :value.sync='model.name', v-else)
          mdl-textfield(floating-label, label='Screen Name', :value.sync='model.screen_name') 
          mdl-textfield(floating-label, label='Type', :value.sync='model.type') 
          mdl-textfield(floating-label, label='Query', :value.sync='model.query') 

          img.profile(v-bind:src='model.profile_image_url')
          mdl-textfield(floating-label, label='Img url', :value.sync='model.profile_image_url', type='url') 

          img.banner(v-bind:src='model.profile_banner_url')
          mdl-textfield(floating-label, label='Background url', :value.sync='model.profile_banner_url', type='url') 

</template>

<style lang='stylus'>
.overlay-wrap
  position absolute
  z-index 113
  width 70%
  height 100%
  @media(max-width: 730px)
    width 95%

.full
  width: 100%

.err
  color red

img.profile
  width 90px
  height 110px

img.banner
  width 390px
  height 170px
  
</style>
