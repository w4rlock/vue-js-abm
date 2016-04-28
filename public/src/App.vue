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
      transition: 'fade',
			showNewForm: false
		}
	},

	methods: {
    closeNewForm(){
      this.showNewForm = false
    },

    clickcancel(){
      this.showNewForm = !this.showNewForm
      this.$refs.list.clickRefresh()
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

.modal
  width: 70%
  z-index: 111
  @media(max-width: 730px)
    width 95%


#app 
  color: #2c3e50
  margin: 20px

#app a 
  color: #42b983;
  text-decoration: none;

.logo 
  width: 100px;
  height: 100px

.mdl-button
  margin 3px

.center
  display flex
  align-items center
  justify-content center
  position absolute
  top 7%
  left 0
  width 100%

</style>

<template lang='jade'>
  #app(@keydown.esc='closeNewForm')
    div(v-bind:class='{ blur8: showNewForm }')
      list(v-ref:list,v-on:clicknew='clicknew', v-on:clickopen='clickopen')

    .center
      .modal(v-if='showNewForm')
        createfrm(v-ref:createfrm,v-on:clickcancel="clickcancel")

</template>
