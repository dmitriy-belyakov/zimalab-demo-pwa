<template>
    <!-- inline css is used because after building width of container breaks -->
    <div class="container" style="max-width: 600px;">
        <!-- Progress stepper -->
        <step-progress  :steps="steps"
                        :current-step="formStep"
                        icon-class="fa fa-check">
        </step-progress>

        <!-- List of products (form step 0) -->
        <div v-if="formStep === 0" class="product-select">
            <!-- using index because without it will be an error (duplicated key) -->
            <div    v-for="(prod, index) in products"
                    :key="index"
                    class="product-container"
                    @click="selectProduct(products[index])">
                <div class="image-container">
                    <b-img  :src="products[index].img"
                            :alt="products[index].name"
                            class="product-image"/>
                </div>
                Cost: {{ products[index].cost }}$
            </div>
        </div>

        <!-- Information about user (form step 3) -->
        <div v-if="formStep === 4" class="user-information text-left">
            <h5>You purchased:</h5>
            Product: {{ productSelected.name }}<br>
            Quantity: {{ form.quantity }}<br>
            Total cost: {{ productSelected.cost * form.quantity }}$<br>

            <!-- inline css because tje <br> above doesn't work in build version -->
            <h5 style="margin-top: 15px;">Delivery information:</h5>
            Name: {{ form.name }}<br>
            Country: {{ form.country }}<br>
            State: {{ form.countryState }}<br>
            City: {{ form.city }}<br>
            Adress: {{ form.adress }}<br>
            Adress 2: {{ form.adress2 }}<br>
            Delivery date: {{ form.deliveryDate }}<br>
            Email: {{ form.email }}<br>
            Card number: {{ form.cardNumber }}<br>
            Card CVS code: {{ form.cardCVS }}<br>
            Card valid thru: {{ form.cardValidThru }}<br>

            <button class="btn btn-primary"
                    @click="backToProductPage()"
                    style="margin-top: 20px; margin-bottom: 20px;">
                    Choose another product
            </button>
        </div>

        <!-- Form step 1 -->
        <b-form @submit="onSubmitStep1"
                v-if="formStep === 1"
                class="form-page"><br>
            
            <div class="row">
                <div class="col-3" style="margin-top: 5px;">
                    Quantity: 
                </div>
                <div class="col-9">
                    <b-form-group   :invalid-feedback="invalidFeedbackQuantity"
                                    :valid-feedback="validFeedbackQuantity"
                                    :state="stateQuantity">
                        <b-form-input   type="number"
                                        v-model="form.quantity"
                                        :state="stateQuantity"
                                        placeholder="Enter quantity">
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row">
                <div class="col-3" style="margin-top: 5px;">
                    Name: 
                </div>
                <div class="col-9">
                    <b-form-group   :invalid-feedback="invalidFeedbackName"
                                    :valid-feedback="validFeedbackName"
                                    :state="stateName">
                        <b-form-input   type="text"
                                        v-model="form.name"
                                        :state="form.name ? stateName : null"
                                        placeholder="Enter name">
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row" style="margin-bottom: 15px;">
                <div class="col-3" style="margin-top: 5px;">
                    Country: 
                </div>
                <div class="col-9">
                    <country-select v-model="form.country"
                                    :country="form.country"
                                    countryName="true"
                                    topCountry="United States"
                                    class="form-control" />
                </div>
            </div>
            
            <div class="row" style="margin-bottom: 15px;">
                <div class="col-3" style="margin-top: 5px;">
                    State: 
                </div>
                <div class="col-9">
                    <region-select  v-model="form.countryState"
                                    :country="form.country"
                                    :region="form.countryState"
                                    countryName="true"
                                    :disabled="form.country ? false : true"
                                    class="form-control" />
                </div>
            </div>

            <div class="row">
                <div class="col-3" style="margin-top: 5px;">
                    City: 
                </div>
                <div class="col-9">
                    <b-form-group   :invalid-feedback="invalidFeedbackCity"
                                    :valid-feedback="validFeedbackCity"
                                    :state="form.city ? stateCity : null">
                        <b-form-input   type="text"
                                        v-model="form.city"
                                        :state="form.city ? stateCity : null"
                                        placeholder="Enter city">
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row" style="margin-bottom: 15px;">
                <div class="col-3" style="margin-top: 5px;">
                    Delivery date: 
                </div>
                <div class="col-9">
                    <date-picker v-model="form.deliveryDate" :config="dateOptions"></date-picker>
                </div>
            </div>

            <div class="row">
                <div class="col-3">
                    Delivery adress: 
                </div>
                <div class="col-9">
                    <b-form-group   :invalid-feedback="invalidFeedbackAdress"
                                    :valid-feedback="validFeedbackAdress"
                                    :state="this.form.adress ? stateAdress : null">
                        <b-form-input   type="text"
                                        v-model="form.adress"
                                        :state="this.form.adress ? stateAdress : null"
                                        placeholder="Enter adress">
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row">
                <div class="col-3">
                    Delivery second adress (optional): 
                </div>
                <div class="col-9">
                    <b-form-group   :invalid-feedback="invalidFeedbackAdress2"
                                    :valid-feedback="validFeedbackAdress2"
                                    :state="this.form.adress2 ? stateAdress2 : null">
                        <b-form-input   type="text"
                                        v-model="form.adress2"
                                        :state="this.form.adress2 ? stateAdress2 : null"
                                        placeholder="Enter second adress">
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row" style="margin-top: 40px">
                <div class="col-6 text-left">
                    <button class="btn btn-primary"
                            @click="backToProductPage()"
                            type="button">
                            Back to choosing a duck
                    </button>
                </div>
                <div class="col-6 text-right">
                    <b-button   type="submit"
                                variant="primary"
                                :disabled="formStepOneComplete ? false : true">
                                Next step
                    </b-button>
                </div>
            </div>                
        </b-form>

        <!-- Form step 2 -->
        <b-form @submit="onSubmitStep2" v-if="formStep === 2"><br>
            <div class="row">
                <div class="col-3" style="margin-top: 5px;">
                    Email: 
                </div>
                <div class="col-9">
                    <b-form-group   :invalid-feedback="invalidFeedbackEmail"
                                    :valid-feedback="validFeedbackEmail"
                                    :state="stateEmail">
                        <b-form-input   type="email"
                                        v-model="form.email"
                                        :state="form.email ? stateEmail : null"
                                        placeholder="Enter email">
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row">
                <div class="col-3" style="margin-top: 5px;">
                    Card number: 
                </div>
                <div class="col-9">
                    <b-form-group   :invalid-feedback="invalidFeedbackCardNumber"
                                    :valid-feedback="validFeedbackCardNumber"
                                    :state="stateCardNumber">
                        <b-form-input   type="text"
                                        v-model="form.cardNumber"
                                        v-mask="'#### #### #### ####'"
                                        :state="form.cardNumber ? stateCardNumber : null"
                                        placeholder="Enter your card number">
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>     

            <div class="row">
                <div class="col-3" style="margin-top: 5px;">
                    Card valdi thru: 
                </div>
                <div class="col-9">
                    <b-form-group   :invalid-feedback="invalidFeedbackValidThru"
                                    :valid-feedback="validFeedbackValidThru"
                                    :state="form.cardValidThru ? stateValidThru : null">
                        <b-form-input   type="text"
                                        v-model="form.cardValidThru"
                                        v-mask="'##/##'"
                                        :state="form.cardValidThru ? stateValidThru : null"
                                        placeholder="Enter your card valid thru date">
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row">
                <div class="col-3" style="margin-top: 5px;">
                    Card CVS code: 
                </div>
                <div class="col-9">
                    <b-form-group   :invalid-feedback="invalidFeedbackCVS"
                                    :valid-feedback="validFeedbackCVS"
                                    :state="form.cardCVS ? stateCVS : null">
                        <b-form-input   type="text"
                                        v-model="form.cardCVS"
                                        v-mask="'###'"
                                        :state="form.cardCVS === '' ? null : stateCVS"
                                        placeholder="Enter your card CVS code">
                        </b-form-input>
                    </b-form-group>
                </div>
            </div>

            <div class="row" style="margin-top: 40px">
                <div class="col-6 text-left">
                    <button class="btn btn-primary"
                            @click="backToFirstStep()"
                            type=button>
                            Previous step
                    </button>
                </div>
                <div class="col-6 text-right">
                    <b-button   type="submit"
                                variant="primary"
                                :disabled="formStepTwoComplete ? false : true">
                                Purchase
                    </b-button>
                </div>
            </div>                
        </b-form>
    </div>    
</template>

<script>
    /* eslint-disable */

    // mask used in the input (v-mask)
    import {mask} from 'vue-the-mask'
    import StepProgress from 'vue-step-progress'
    // main.css was edited
    import 'vue-step-progress/dist/main.css'
    import 'vue-country-region-select'
    import 'bootstrap/dist/css/bootstrap.css'
    import datePicker from 'vue-bootstrap-datetimepicker'
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'

    export default {
        data: function () {
            return {
                productSelected: null,
                formStep: 0,
                form: {
                    quantity: 1,
                    name: '',
                    country: '',
                    countryState: '',
                    city: '',
                    deliveryDate: null,
                    adress: '',
                    adress2: '',
                    email: '',
                    cardNumber: '',
                    cardCVS: '',
                    cardValidThru: ''
                },
                minNameLength: 3,
                minAdressLength: 4,
                minCityLength: 4,
                products: [
                    {
                        name: 'Duck 1',
                        img: '/static/img/duck1.jpg',
                        cost: 15
                    },
                    {
                        name: 'Duck 2',
                        img: '/static/img/duck2.jpg',
                        cost: 25
                    },
                    {
                        name: 'Duck 3',
                        img: '/static/img/duck3.jpg',
                        cost: 45
                    },
                    {
                        name: 'Duck 4',
                        img: '/static/img/duck4.jpg',
                        cost: 120
                    }
                ],
                steps: ['Select a duck', 'Delivery', 'Payment', 'Purchased!'],
                dateOptions: {
                    format: 'DD/MM/YYYY',
                    useCurrent: false,
                    minDate: new Date()
                } 
            }
        },
        computed: {
            /* Checks if first step of form (delivery) is complete right */
            formStepOneComplete () {
                return  this.stateQuantity
                        && this.stateName
                        && this.form.country
                        && this.form.countryState
                        && this.stateCity
                        && this.form.deliveryDate
                        && (this.stateAdress || this.stateAdress2)
            },
            /* Checks if second step of form (payment) is complete right */
            formStepTwoComplete () {
                return  this.stateEmail
                        && this.stateCardNumber
                        && this.stateValidThru
                        && this.stateCVS
                return true
                return this.stateEmail && this.statePhoneNumber && this.stateZipcode && this.stateCardNumber
            },
            
            /* Validation for name */
            stateName () {
                return (this.form.name.length >= this.minNameLength) ? true : false
            },
            invalidFeedbackName () {
                if (this.form.name.length >= this.minNameLength) {
                    return ''
                } else if (this.form.name.length > 0) {
                    return 'Enter at least ' + this.minNameLength + ' characters'
                } else {
                    return ''
                }
            },
            validFeedbackName () {
                return this.stateName === true ? 'Thank you' : ''
            },

            /* Validation for email */
            stateEmail () {
                // regex for email validation (taken from http://jsfiddle.net/ghvj4gy9/embedded/result,js/)
                var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                return re.test(String(this.form.email).toLowerCase())
            },
            invalidFeedbackEmail () {
                if (this.stateEmail) {
                    return ''
                } else if (this.form.email.length > 0) {
                    return 'Please enter correct email'
                } else {
                    return ''
                }
            },
            validFeedbackEmail () {
                return this.stateEmail ? 'Thank you' : ''
            },

            /* Validation for card number */
            stateCardNumber () {
                var re = /(.*?\d){16}/gm // regex checks for 16 digits in string
                return re.test(String(this.form.cardNumber).toLowerCase())
            },
            invalidFeedbackCardNumber () {
                if (this.stateCardNumber) {
                    return ''
                } else if (this.form.cardNumber.length > 0) {
                    return 'Please enter correct card number'
                } else {
                    return ''
                }
            },
            validFeedbackCardNumber () {
                return this.stateCardNumber === true ? 'Thank you' : ''
            },

            /* Validation for quantity */
            stateQuantity () {
                return this.form.quantity > 0
            },
            invalidFeedbackQuantity () {
                if (this.stateQuantity) {
                    return ''
                } else if (this.form.quantity > 99999) {
                    return 'We don\'t have so many :c'
                } else if (this.form.quantity === 0) {
                    return 'We don\'t know how to sell zero products'
                } else {
                    return 'Please enter real quantity'
                }
            },
            validFeedbackQuantity () {
                return this.stateQuantity ? '' : ''
            },

            /* Validation for city */
            stateCity () {
                return this.form.city.length > this.minCityLength
            },
            invalidFeedbackCity () {
                if (this.stateCity) {
                    return ''
                } else {
                    return 'Too short city name'
                }
            },
            validFeedbackCity () {
                return this.stateCity ? 'Thank you' : ''
            },

            /* Validation for first adress */
            stateAdress () {
                return this.form.adress.length > this.minAdressLength
            },
            invalidFeedbackAdress () {
                if (this.adress) {
                    return ''
                } else {
                    return 'Too short adress'
                }
            },
            validFeedbackAdress () {
                return this.adress2 ? 'Thank you' : ''
            },

            /* Validation for second adress (same as for first) */
            stateAdress2 () {
                return this.form.adress2.length > this.minAdressLength
            },
            invalidFeedbackAdress2 () {
                if (this.adress2) {
                    return ''
                } else {
                    return 'Too short adress'
                }
            },
            validFeedbackAdress2 () {
                return this.adress2 ? 'Thank you' : ''
            },

            /* Validation for card CVS */
            stateCVS () {
                return this.form.cardCVS.length === 3
            },
            invalidFeedbackCVS () {
                if (this.stateCVS) {
                    return ''
                } else {
                    return 'Please enter correct CVS code'
                }
            },
            validFeedbackCVS () {
                return this.stateCVS ? 'Thank you' : ''
            },

            /* Validation for Valid thru */
            stateValidThru () {
                return this.form.cardValidThru.length === 5
            },
            invalidFeedbackValidThru () {
                if (this.stateValidThru) {
                    return ''
                } else {
                    return 'Please enter correct valid thru date'
                }
            },
            validFeedbackValidThru () {
                return this.stateValidThru ? 'Thank you' : ''
            }
        },
        directives: {
            mask
        },
        components: {
            datePicker,
            'step-progress': StepProgress
        },
        methods: {
            onSubmitStep1 (event) {
                event.preventDefault() // without it page reloads on submit
                this.formStep++
                this.$parent.playButtonSound()
            },
            onSubmitStep2 (event) {
                event.preventDefault() // without it page reloads on submit
                this.formStep = 4 // jumps to 4 after 2 for the step-progress' fourth step be done
                this.$parent.playButtonSound()
            },
            resetFormData () {
                this.form.name = ''
                this.form.surname = ''
                this.form.dateOfBirth = null
                this.form.phoneNumber = ''
                this.form.email = ''
                this.form.zipcode = ''
                this.form.cardNumber = ''
                this.form.quantity = 1
            },
            backToProductPage () {
                this.resetFormData()
                this.formStep = 0
                this.productSelected = null
                this.$parent.playButtonSound()
            },
            selectProduct (product) {
                this.productSelected = product
                this.formStep++
                this.$parent.playButtonSound()
            },
            backToFirstStep () {
                this.formStep = 1
                console.log(this.form.formStep)
                return false
                this.$parent.playButtonSound()
            }
        }
    }
</script>
 
<style>
    .container {
        max-width: 600px;
    }
    .product {
        margin-top: 10px;
        cursor: pointer;
    }
    .product-container {
        display: inline-block;
        margin: 5px;
        cursor: pointer;
        border: 1px;
        border-color: grey;
        border-radius: 5px;
        border-style: solid;
    }
    .image-container {
        width: 200px;
        height: 200px;
    }
    .product-image {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .vdp-datepicker input {
        display: block;
        width: 100%;
        height: calc(2.25rem + 2px);
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    }
</style>
