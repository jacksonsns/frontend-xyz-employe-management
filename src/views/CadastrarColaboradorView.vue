<template>
  <div class="container mt-4 mb-5">
    <form>
      <div class="row">
        <h4>Cadastro de Colaboradores</h4>
        <div class="input-field col s12 m6">
          <input id="nome" type="text" class="validate" v-model="form.nome" required>
          <label for="nome">Nome</label>
        </div>
        <div class="input-field col s12 m6">
          <input id="email" type="email" class="validate" v-model="form.email" required>
          <label for="email">Email</label>
        </div>
        <div class="input-field col s12 m6">
          <input id="cpf" type="text" class="validate" v-model="form.cpf" v-mask="'###.###.###-##'" required>
          <label for="cpf">CPF</label>
        </div>
        <div class="input-field col s12 m6">
          <input id="celular" type="text" class="validate" v-model="form.celular" v-mask="'(##) #####-####'">
          <label for="celular">Celular</label>
        </div>
        <span>Selecione até 3 conhecimentos</span>
        <div class="row">
          <div class="conhecimentos-container" v-for="(conhecimentosChoice, index) in conhecimentosChoices" :key="index">
            <a class="btn btn-conhecimentos" 
              :class="{'blue': !conhecimentosChoice.pressed, 'red': conhecimentosChoice.pressed}"
              @click="addKnowledge(conhecimentosChoice)">
              {{ conhecimentosChoice.value }}
            </a>
          </div>
        </div>
        <span v-if="msg_max_conhecimentos" class="red-text">{{ msg_max_conhecimentos }}</span>
        <div class="col s12">
          <button class="btn waves-effect waves-light" type="submit" name="action" @click.prevent="submitForm">Cadastrar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        nome: '',
        email: '',
        cpf: '',
        celular: '',
        conhecimentos: []
      },
      numPressed: 0,
      msg_max_conhecimentos: '',
      conhecimentosChoices: [
        { value: 'Git' },
        { value: 'React' },
        { value: 'PHP' },
        { value: 'NodeJS' },
        { value: 'DevOps' },
        { value: 'Banco de Dados' },
        { value: 'TypeScript' }
      ]
    };
  },
  methods: {
    addKnowledge(event) {
      this.togglePress(event)

      const index = this.form.conhecimentos.indexOf(event.value)
      if (index === -1) {
        this.msg_max_conhecimentos = ''
        this.form.conhecimentos.push(event.value)
      } else {
        this.msg_max_conhecimentos = ''
        this.form.conhecimentos.splice(index, 1)
      }
      console.log(this.form.conhecimentos)
    },

    togglePress(conhecimento) {
      if (conhecimento.pressed) {
        this.numPressed--;
        conhecimento.pressed = false;
      } else {
        this.numPressed++;
        conhecimento.pressed = true;
      }
    },
    
    submitForm() {
      axios.post('http://localhost:8000/api/funcionarios/registrar', this.form)
        .then(response => {
          console.log(response.data)
          if (response.data.status === 1) {
            alert('Cadastro realizado com sucesso!')
            location.reload()
          }
        })
        .catch(error => {
            if (error.response.data.errors) {
              const errorMessage = Object.values(error.response.data.errors).join('\n')
              alert(errorMessage)
            }
            
        });
    }
  }
}
</script>

<style>
  .conhecimentos-container {
    display: inline-flex;
    margin: 10px;
  }

  .btn-conhecimentos.pressed {
    box-shadow: none;
    transform: translateY(1px);
    background-color: #f2f2f2;
    border-color: #d9d9d9;
  }
</style>