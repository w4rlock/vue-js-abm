<script>

import Loader from './Loader.vue'
import http from '../services/http'

export default {
	components: { 
		Loader 
	},

	ready(){
		this.loadData();
	},

  data () {
    return {
			gridData: [],
			checks: [],
			loading: false,
		};
	},


	methods: {
		loadData(){
			this.checks = [];
			this.loading = true;

			http.get('/api/wags', 
				(res) => {
					this.gridData = res.data;

					setTimeout(() => {
						componentHandler.upgradeAllRegistered()
						this.loading = false;
					}, 100);

				}, 
				(err) => {
					this.loading = false;
			});

		},
		

		clickRefresh(){
			this.loadData();
		},


		clickNew(){
			this.$dispatch('clicknew');
		},


		clickDelete(){
			this.checks.forEach((i) => {
				let id = this.gridData[i].id;

				http.delete(`/api/wags/${id}`, (res) => {}, (err) => {});
			});

			this.loadData();
		},
	}
}
</script>

<style lang="stylus">
table
  margin-top 20px
  margin-bottom 30px
  width 100%

.mdl-data-table
  border 0 !important

.mdl-data-table td
  border-top 1px solid rgba(141, 141, 141, 0.12) !important
  border-bottom 1px solid rgba(141, 141, 141, 0.12) !important

.md-full-card
  width 100%

.profile_img
  width 40px
  height 60px
</style>


<template lang='jade'>
	Loader(:show='loading')
	.mdl-card.mdl-shadow--2dp.md-full-card
		.dl-card__actions.mdl-card--border.mdl-card-bottom
				.mdl-cell.mdl-cell--12-col

					mdl-button(@click='clickNew', v-mdl-ripple-effect, raised, primary)
						i.material-icons add
					mdl-button(@click='clickDelete', v-mdl-ripple-effect, raised, primary)
						i.material-icons delete
					mdl-button(@click='clickRefresh', v-mdl-ripple-effect, raised, primary)
						i.material-icons refresh

		.mdl-cell.mdl-cell--12-col
			table.mdl-data-table.mdl-js-data-table.ml-table-striped.mdl-data-table--selectable.mdl-shadow--1dp
				thead
					tr
						th.mdl-data-table__cell--non-numeric Name
						th.mdl-data-table__cell--non-numeric Screen Name
						th.mdl-data-table__cell--non-numeric Type
						th.mdl-data-table__cell--non-numeric Image

				tbody
					tr(v-for='wag in gridData')
						td
							label.mdl-checkbox.mdl-js-checkbox.mdl-js-ripple-effect(for='lapp_chk-{{$index}}')
								input.mdl-checkbox__input(id='lapp_chk-{{$index}}',type='checkbox',v-model='checks',value='{{ $index }}')
						td.mdl-data-table__cell--non-numeric {{ wag.name }}
						td.mdl-data-table__cell--non-numeric {{ wag.screen_name }}
						td.mdl-data-table__cell--non-numeric {{ wag.type }}
						td.mdl-data-table__cell--non-numeric 
							img.profile_img(v-bind:src='wag.profile_image_url')
</template>
