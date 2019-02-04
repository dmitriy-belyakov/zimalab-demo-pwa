<template>
    <div class="container">
        <h3 class="header">
            Login
        </h3>

        <b-input v-model="email" type="text" placeholder="Email"/>
        <b-input v-model="password" type="password" placeholder="Password"/>

        <b-button @click="login" class="login-button" variant="primary" :disabled="!(email && password)">
            Login
        </b-button>
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
                console.log('Logging: ' + this.email + '\t\t' + this.password)
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>
    .container {
        max-width: 400px;
    }

    input {
        margin-bottom: 10px;
    }

    .login-button {
        width: 100%;
    }
</style>
