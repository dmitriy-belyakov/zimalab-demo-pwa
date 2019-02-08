<template>
    <div class="container">
        <div v-if="$store.getters.getLoginError" class="alert alert-danger" role="alert">
            {{ $store.getters.getLoginError }}
        </div>

        <b-input v-model="email" type="text" placeholder="Email"/>
        <b-input v-model="password" type="password" placeholder="Password"/>

        <b-button @click="signup" class="signup-button" variant="success" :disabled="!(email && password)">
            Sign up
        </b-button>

        <!-- <p class="description">
            You can use any email
        </p> -->
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
            signup () {
                this.$store.dispatch('userJoin', {
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

            this.$store.commit('removeSignupError')
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

    .signup-button {
        width: 100%;
    }
</style>
