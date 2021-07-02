<template>
  <div class='navbar'>
    <ul>
      <li class="coop">COOP</li>
      <li><router-link to='/'>Conversations</router-link></li>
      <li><router-link to='/members'>Membres</router-link></li>
      <li class="logout"><a @click="logout">Déconnection</a></li>
    </ul>
  </div>
</template>

<script>
  export default{
    methods:{
      logout(){
        this.$store.commit('logout');
        this.$router.push('/login');
      }
    }
  }
</script>

<style>
.navbar { margin-bottom: 1em; }
.navbar li { float: left; }
.navbar li.logout { float: right; }
.navbar li.logout:hover { cursor: pointer; }
.navbar li a:hover { color: #e38a17; }

* {
  margin: 0;
  padding: 0;
}

.navbar ul{
  overflow: hidden;
  list-style-type: none;
  background-color: #232f3e;
}

.navbar li.coop {
  float: left;
  color: white;
  padding: 0.8em;
  text-decoration: none;
  font-size: 0.8em;
}

.navbar li a{
  display: block;
  color: #FFFFFF;
  padding: 0.8em;
  text-align: center;
  text-decoration: none;
  font-size: 0.8em;
}
</style>
