<template>
    <div class="menu-links">
        <router-link v-for="link in links" :key="link" :to="link.path" class="mdl-navigation__link" @click.native="hideDrawer">
            {{ link.name }}
        </router-link>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        props: ['autoHideDrawer'],
        
        data: function () {
            return {
                links: []
            }
        },

        mounted () {
            this.$router.options.routes.forEach(route => {
                if (route.path !== '/login') {
                    this.links.push({
                        name: route.name,
                        path: route.path
                    })
                }
            })
        },

        methods: {            
            hideDrawer () {
                this.$parent.playButtonSound()
                if (this.autoHideDrawer) {
                    document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
                    document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
                }
            }
        }
    }
</script>
