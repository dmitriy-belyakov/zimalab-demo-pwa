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
        }
    }
</script>

