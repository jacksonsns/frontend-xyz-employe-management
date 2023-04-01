<template>
  <div class="container mt-4 mb-5">
    <div class="row">
      <div class="col s12">
        <h4>Lista de Colaboradores</h4>
        <div class="input-field">
          <input type="text" v-model="searchEmployees" @input="search" />
          <label for="search">Pesquisar</label>
        </div>
        <table class="striped highlight bordered responsive-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Celular</th>
              <th>Conhecimentos</th>
              <th>Status</th>
              <th>Data de Validação</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(colaborador, index) in colaboradores" :key="index">
              <td>{{ colaborador.nome }}</td>
              <td>{{ colaborador.email }}</td>
              <td>{{ colaborador.cpf }}</td>
              <td>{{ colaborador.celular }}</td>
              <td>{{ JSON.parse(colaborador.conhecimentos).join(', ') }}</td>
              <td>{{ colaborador.status }}</td>
              <td v-if="colaborador.validado_em">{{ dateFormate(colaborador.validado_em) }}</td>
              <td v-else></td>
              <td><button class="btn waves-effect waves-light" @click="EmployeeValidate(colaborador.nome)">Validar</button></td>
            </tr>
            <span v-if="msg_not_found" class="text-center">{{ msg_not_found }}</span>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "HomeView",
  components: {
  },
  data() {
    return {
      colaboradores: [],
      searchEmployees: '',
      msg_not_found: '',
    }
  },

  created() {
    axios.get('http://localhost:8000/api/administrador')
      .then(response => {
        this.colaboradores = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
  }, 

  methods: {
    EmployeeValidate(name) {
      axios
        .put('http://localhost:8000/api/'+ name +'/validar', this.form)
        .then((response) => {
        if (response.status === 200) {
            alert(response.data.msg)
            location.reload()
        }
        })
        .catch((error) => {
            console.log(error);
        });
    },

    search() {
      axios.get('http://localhost:8000/api/funcionarios/search?search='+ this.searchEmployees)
      .then(response => {
        if(this.searchEmployees != '') {
          if(response.data.status == 2) {
            this.msg_not_found = response.data.msg
            this.colaboradores = []
            return
          }
          this.colaboradores = response.data.response
          this.msg_not_found = ''
        } else {
          axios.get('http://localhost:8000/api/administrador')
          .then(response => {
            this.colaboradores = response.data.data
            this.msg_not_found = ''
          })
          .catch(error => {
            console.log(error)
          })
        }
        
      })
      .catch(error => {
        console.log(error)
      })
    },

    dateFormate(data) {
      const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
      const dataFormatada = new Date(data).toLocaleDateString('pt-BR', options);
      return dataFormatada;
    }
  }
};
</script>
