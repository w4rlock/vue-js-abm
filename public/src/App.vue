<script>
import list from './components/ListWags'
import createfrm from './components/Create'

export default {
  components: {
		list,
		createfrm
  },

	data() {
		return {
			showNewForm: false
		}
	},

	methods: {
    clickcancel(){
      this.showNewForm = !this.showNewForm

    },

		clicknew(){
			this.showNewForm = !this.showNewForm
		},

    clickopen(wag){
      this.showNewForm = !this.showNewForm
      this.$refs.createfrm.open(wag)
    }

	}
}
</script>

<style lang="stylus">
html
  height: 100%

.mdl-textfield
  display block
  width 500px

.blur8
  filter: blur(8px);

.fullcenter
  position: absolute
  width: 100%
  top: 70px
  left: 0px
  z-index: 111


#app 
  color: #2c3e50
  margin: 20px
  text-align: center

#app a 
  color: #42b983;
  text-decoration: none;

.logo 
  width: 100px;
  height: 100px

.mdl-button
  margin 3px

</style>

<template lang='jade'>
  #app
    div(v-bind:class='{ blur8: showNewForm }')
      list(v-on:clicknew='clicknew', v-on:clickopen='clickopen')

    .fullcenter(v-show='showNewForm')
      createfrm(v-ref:createfrm,v-on:clickcancel="clickcancel")

</template>
