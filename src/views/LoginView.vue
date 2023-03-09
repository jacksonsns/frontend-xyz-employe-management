<template>
  <div class="container">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card white lighten-4">
          <div class="card-content white-text">
            <h5 class="grey-text darken-4">Login</h5>
            <form @submit.prevent="submit">
              <div class="row">
                <div class="input-field col s12">
                  <input id="email" type="email" class="validate" v-model="form.email" required>
                  <label for="email">Email</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input id="password" type="password" class="validate" v-model="form.password" required>
                  <label for="password">Senha</label>
                </div>
              </div>
              <div class="row">
                <div class="col s12">
                    <button class="btn btn-block blue btn-login" type="submit">Entrar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
        form: {
            email: "",
            password: "",
        },
        error: '',
        };
    },

    methods: {
        submit() {
          axios
              .post("http://localhost:8000/api/login", this.form)
              .then((response) => {
              if (response.status === 200) {
                  this.$store.commit("login", response.data.token);
                  this.$router.push("/");
              }
              })
              .catch((error) => {
                  console.log(error);
              });
        },

        ...mapMutations({
            login: 'login',
        }),
    },
};
</script>

<style>
 .container {
  margin-top: 10rem;
 }
 .btn-login {
  width: 100%;
  height: 50px;
 }
</style>