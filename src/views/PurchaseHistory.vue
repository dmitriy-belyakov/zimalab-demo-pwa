<template>
    <div class="container">
        <p v-if="!purchaseHistory.length">
            Looks like you have no purchases now.
            <router-link to="/purchaseaduck">How about make one?</router-link>
        </p>

        <b-card v-if="purchaseHistory"
                v-for="(item, index) in purchaseHistory"
                :key="index"
                :header="'Purchase #' + (purchaseHistory.length - index)"
                class="history-item text-left">
            <b>Product: </b> {{ item.product }}<br>
            <b>Total cost: </b> {{ item.productCost * item.quantity }}<br>
            <b>Quantity: </b> {{ item.quantity }}<br><br>
            <b>Name: </b> {{ item.name }}<br>
            <b>Country: </b> {{ item.country }}<br>
            <b>Country state: </b> {{ item.countryState }}<br>
            <b>City: </b> {{ item.city }}<br>
            <b v-if="item.adress">Adress: </b> {{ item.adress }}<br>
            <b v-if="item.adress2">Adress2: </b> {{ item.adress2 }}<br><br>
            <b>Email: </b> {{ item.email }}<br>
            <b>Card number: </b> {{ item.cardNumber }}<br>
            <b>Card valid thru: </b> {{ item.cardValidThru }}<br>
            <b>Card CVS code: </b> {{ item.cardCVS }}<br>
        </b-card>
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        computed: {
            purchaseHistory () {
                return this.$store.state.purchaseHistory
            }
        }
    }
</script>

<style scoped>
    .container {
        padding-top: 10px;
    }
    
    .history-item {
        margin-bottom: 10px;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    }
</style>

