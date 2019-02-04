<template>
    <div class="container">
        <h3 class="header">
            Login
        </h3>

        <b-input v-model="email" type="text" placeholder="Email"/>
        <b-input v-model="password" type="password" placeholder="Password"/>

        <b-button class="login-button" variant="primary" :disabled="!(email && password)">
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
