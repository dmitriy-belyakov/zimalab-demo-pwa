<template>
    <div class="container">
        <!-- This alert showing only when user is online, otherwise this alert shows in App.vue -->
        <div    v-show="$parent.haveInternetConnetion" 
                class="alert alert-warning"
                role="alert"
                style="margin-top: 10px;">
            You are in offline mode
        </div>
        <h5>This page is an example of app working offline</h5>
        <p class="text-left">In offline mode butttons which require internet connection are disabled and look like this:</p> 
        <button class="btn btn-primary" disabled>Disabled button</button>
        <p class="text-left">And this is what enabled button looks like:</p>
        <button class="btn btn-primary" @click="$parent.playButtonSound()">Enabled button</button>
        <p style="margin-top: 10px;" class="text-left">To test the rest of application turn on airplane mode on your device</p>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        
    }
</script>

<style>
    .container {
        max-width: 700px;
    }
    
    .dark-theme .container {
        color: rgb(196, 195, 195);
    }

    .dark-theme .btn-primary {
        background-color: darkblue;
        border-color: #214061;
    }
</style>

