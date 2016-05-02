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
        header_id: null,
        header_text: null,
        header_bkg_url: null,
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
        }, 700);

      }, (er) => {
        setTimeout(() => { 
          this.error = er.data.err;
          this.loading = false; 
        }, 700);
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

<style lang='stylus'>
.overlay-wrap
  position absolute
  z-index 113
  width 70%
  height 100%
  @media(max-width: 730px)
    width 95%

.full
	height 100%
	width 100%
	margin-bottom 40px

.err
  color red

img.profile
  width 100px
  height 120px

img.banner
  width 370px
  height 120px

.pl-27
	padding-left 27px
  
.mt-50
  margin-top 50px
</style>


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
          
          .mt-50
          img.banner(v-bind:src='model.header_bkg_url')
          mdl-textfield(floating-label, label='Header Bkg', :value.sync='model.header_bkg_url') 
          mdl-textfield(floating-label, label='Header ID', :value.sync='model.header_id') 
          mdl-textfield(floating-label, label='Header Text', :value.sync='model.header_text') 

          .mt-50
          img.profile(v-bind:src='model.profile_image_url')
          img.banner.pl-27(v-bind:src='model.profile_banner_url')
          mdl-textfield(floating-label, label='Img url', :value.sync='model.profile_image_url', type='url') 

          mdl-textfield(floating-label, label='Background url', :value.sync='model.profile_banner_url', type='url') 
</template>

