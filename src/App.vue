<template>
  <nav>
    <div class="nav-wrapper blue darken-2">
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul class="right hide-on-med-and-down">
        <li><router-link to="/">Colaboradores</router-link></li>
        <li v-if="!$store.state.token"><router-link to="/login">Login</router-link></li>
        <li v-if="$store.state.token"><a @click="logout">Sair</a></li>
      </ul>
    </div>
    <ul class="sidenav" id="nav-mobile">
      <li><router-link to="/">Colaboradores</router-link></li>
      <li v-if="!$store.state.token"><router-link to="/login">Login</router-link></li>
      <li v-if="$store.state.token"><a @click="logout">Sair</a></li>
    </ul>
  </nav>
  <router-view />
</template>

<style lang="scss">

</style>

<script>

import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';

export default{
  methods:{
      logout(){
        this.$store.commit('logout');
      }
    },
    isLoggedIn() {
      return this.$store.state.token !== null
    },
    mounted(){
      M.AutoInit()
      this.$store.commit('initializeStore');
    },
}
</script>