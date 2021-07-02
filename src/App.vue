<template>
  <div id="app" v-if="apiok">
    <router-view/>
  </div>
  <div v-else>API cassée</div>
</template>

<script>
  export default{
    data(){
      return{
        apiok: false
      }
    },
    mounted(){
      console.log("Starting")
      api.get('ping').then(response=>{
        this.apiok=true;
        console.log('Success');
        if(!this.$store.state.member){
          if(this.$route.path != '/login' && this.$route.path != '/signin') {
            this.$store.commit('logout');
            this.$router.push('/logout');
          }
        }
        else{
          this.chargeMembers();
          this.$bus.$on('charge-members', this.chargeMembers);
          this.chargeConversations();
          this.$bus.$on('charge-conversations', this.chargeConversations);
        }
      }).catch(error=>{
        console.log('Failure', error);
      }).finally(() => {
        this.chargementOk = true;
      })
    },
    methods:{
      chargeMembers(){
        api.get('members').then(response=>{
          this.$store.commit('setMembers',response.data);
        });
      },
      chargeConversations(){
        api.get('channels').then(response=>{
          this.$store.commit('setConversations',response.data);
        });
      }
    }
  }
</script>

<style>
</style>
