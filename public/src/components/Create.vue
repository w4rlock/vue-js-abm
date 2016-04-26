<script>

import http from '../services/http'
import Loader from './Loader.vue'


export default {
	components: {
		Loader
	},


  data () {
    return {
		 	loading: false,
			name: null,
			screen_name: null,
			type:null,
			imgurl:null
		}
  },



	/*Form Events*/
	methods: {
		clickCancel(){
			this.$dispatch('clickcancel');
		},


		clickSave(){
			let ob = {
					name: this.name
				, screen_name: this.screen_name
				, type: this.type
				, imgurl: this.imgurl
			}

      this.loading = true;
			http.post('/api/wags', ob, (res) => { 
        setTimeout(() => { 
           this.loading = false;
           this.clickCancel() 
        }, 900);

      }, (err) => {
        setTimeout(() => { this.loading = false; }, 900);
      });
		},

		
		
		showFailPass(){
			document.querySelector('#wrap_pass').className+= ' is-invalid';
			document.querySelector('#wrap_repass').className+= ' is-invalid';
		},



		clearFail(){
			document.querySelector('#wrap_pass').className = 
			document.querySelector('#wrap_pass').className.replace(/is-invalid/g, '');

			document.querySelector('#wrap_repass').className = 
			document.querySelector('#wrap_repass').className.replace(/is-invalid/g,'');
		}
	}


}
</script>

<template lang='jade'>
	Loader(:show='loading')
	.mdl-card.mdl-shadow--2dp.full
		.mdl-cell.mdl-cell--12-col
			.mdl-cell.mdl-cell--5-col
					mdl-button(@click='clickCancel', v-mdl-ripple-effect, raised, primary) cancel

					mdl-button(@click='clickSave', v-mdl-ripple-effect, raised, primary)
						i.material-icons save

			.mdl-cell.mdl-cell--6-col.mdl-cell--8-col-tablet.black
					mdl-textfield(floating-label, label='Name', :value.sync='name') 
					mdl-textfield(floating-label, label='Screen Name', :value.sync='screen_name') 
					mdl-textfield(floating-label, label='Type', :value.sync='type') 
					mdl-textfield(floating-label, label='Img Url', :value.sync='imgurl) 

</template>

<style lang='stylus'>
.full
  width: 100%
</style>
