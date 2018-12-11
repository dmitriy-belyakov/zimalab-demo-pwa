<template>
    <div class="container">
        <div class="link-container">
            <router-link v-for="link in links" :key="link" :to="link.path">
                <b-button variant="outline-primary" class="router-link-button" size="lg">
                    {{ link.name }}
                </b-button>
            </router-link>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        data: function () {
            return {
                links: []
            }
        },
        mounted () {
            this.$router.options.routes.forEach(route => {
                this.links.push({
                    name: route.name,
                    path: route.path
                })
            })
        }
    }
</script>

<style scoped>
    .container {
        max-width: 600px;
        padding-bottom: 10px;
    }
    
    .link-container .router-link-button {
        margin: 20px;
    }
</style>
