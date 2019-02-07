<template>
    <div class="container">
        <div v-if="$store.getters.getLoginError" class="alert alert-danger" role="alert">
            {{ $store.getters.getLoginError }}
        </div>

        <b-input v-model="email" type="text" placeholder="Email"/>
        <b-input v-model="password" type="password" placeholder="Password"/>

        <b-button @click="login" class="login-button" variant="primary" :disabled="!(email && password)">
            Login
        </b-button>

        <p class="description">
            Use our demo account:<br/>
            <strong>Email: </strong>demo@demo.demo<br/>
            <strong>Password: </strong>123456<br/>
        </p>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data: () => {
            return {
                email: '',
                password: ''
            }
        },

        methods: {
            login () {
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password
                })
            }
        },

        mounted () {
            var intId = setInterval(() => {
                if (document.getElementsByClassName('mdl-layout__drawer-button')[0]) {
                    document.getElementsByClassName('mdl-layout__drawer-button')[0].style.display = 'none'
                    clearInterval(intId);
                }
            }, 10)

            this.$store.commit('removeLoginError')
        }
    }
</script>

<style scoped>
    .description {
        text-align: left;
        margin-top: 30px;
        padding-left: 3px;
    }

    .container {
        max-width: 400px;
        padding-top: 40px;
    }

    input {
        margin-bottom: 10px;
    }

    .login-button {
        width: 100%;
    }
</style>
