<script>
import List from './components/ListWags'
import Create from './components/Create'

export default {
  components: {
		List,
		Create,
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
		}

	}
}
</script>

<style lang="stylus">
html
  height: 100%

.blur5
  filter: blur(5px);

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
    div(v-bind:class='{ blur5: showNewForm }')
      list(v-on:clicknew='clicknew')

    .fullcenter(v-show='showNewForm')
      create(v-on:clickcancel="clickcancel")

</template>
