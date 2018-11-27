<template>
    <div class="container">
        <!-- List of products -->
        <div v-if="!productSelected" class="product-select">
            <div v-for="(prod, index) in products" :key="index" class="product-container" @click="selectProduct(products[index])">
                <div class="image-container">
                    <b-img :src="products[index].img" :alt="products[index].name" class="product-image"/>
                </div>
                Cost: {{ products[index].cost }}$
            </div>
        </div>

        <!-- Form for purchasing product -->
        <div v-if="productSelected" class="purchase">
            <br><button class="btn btn-primary" @click="backToProductPage()">Choose another product</button>
            
            <!-- Form step 1 -->
            <b-form @submit="onSubmitStep1" v-if="formStep === 1 && !submitted" class="form-page"><br>

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
                                            required
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
                                            :state="form.name === '' ? null : stateName"
                                            required
                                            placeholder="Enter name">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3" style="margin-top: 5px;">
                        Name: 
                    </div>
                    <div class="col-9">
                        <b-form-group   :invalid-feedback="invalidFeedbackSurname"
                                        :valid-feedback="validFeedbackSurname"
                                        :state="stateSurname">
                            <b-form-input   type="text"
                                            v-model="form.surname"
                                            :state="form.surname === '' ? null : stateSurname"
                                            required
                                            placeholder="Enter surname">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </div>              
                
                <div class="row">
                    <div class="col-3" style="margin-top: 5px;">
                        Date of birth: 
                    </div>
                    <div class="col-9">
                        <datepicker v-model="form.dateOfBirth"></datepicker><br>
                    </div>
                </div>

                <div class="row">
                    <div class="col-3" style="margin-top: 5px;">
                        Your gender: 
                    </div>
                    <div class="col-9">
                        <b-form-select  v-model="form.gender"
                                        :options="genderOptions"
                                        required
                                        style="margin-bottom: 10px"/>

                        <b-button   type="submit"
                                    variant="primary"
                                    :disabled="formStepOneComplete ? false : true">
                                    Next step</b-button>
                    </div>
                </div>
            </b-form>

            <!-- Form step 2 -->
            <b-form @submit="onSubmitStep2" v-if="formStep === 2 && !submitted"><br>
                <b-form-group
                                :invalid-feedback="invalidFeedbackEmail"
                                :valid-feedback="validFeedbackEmail"
                                :state="stateEmail">
                    <b-form-input   type="email"
                                    v-model="form.email"
                                    :state="form.email === '' ? null : stateEmail"
                                    required
                                    placeholder="Enter email">
                    </b-form-input>
                </b-form-group>
                
                <b-form-group
                                :invalid-feedback="invalidFeedbackPhoneNumber"
                                :valid-feedback="validFeedbackPhoneNumber"
                                :state="statePhoneNumber">
                    <b-form-input   type="tel"
                                    v-model="form.phoneNumber"
                                    v-mask="'+7 (###) ### ## ##'"
                                    :state="form.phoneNumber === '+7 (' ? null : statePhoneNumber"
                                    required
                                    placeholder="Enter your phone number">
                    </b-form-input>
                </b-form-group>

                <b-form-group
                                :invalid-feedback="invalidFeedbackZipcode"
                                :valid-feedback="validFeedbackZipcode"
                                :state="stateZipcode">
                    <b-form-input   type="text"
                                    v-model="form.zipcode"
                                    v-mask="'######'"
                                    :state="form.zipcode === '' ? null : stateZipcode"
                                    required
                                    placeholder="Zip code">
                    </b-form-input>
                </b-form-group>

                <b-form-group
                                :invalid-feedback="invalidFeedbackCardNumber"
                                :valid-feedback="validFeedbackCardNumber"
                                :state="stateCardNumber">
                    <b-form-input   type="text"
                                    v-model="form.cardNumber"
                                    v-mask="'#### #### #### ####'"
                                    :state="form.cardNumber === '' ? null : stateCardNumber"
                                    required
                                    placeholder="Enter your card number">
                    </b-form-input>
                </b-form-group>

                <b-button   type="submit"
                            variant="primary"
                            :disabled="formStepTwoComplete ? false : true"
                            >Purchase</b-button>
            </b-form>

            <div v-if="submitted" class="user-information text-left">
                <h5>You purchased:</h5>
                Product: {{ productSelected.name }}<br>
                Quantity: {{ form.quantity }}<br>
                Total cost: {{ productSelected.cost * form.quantity }}$<br>
                <h5>Information about you:</h5>
                Name: {{ form.name }} {{ form.surname }}<br>
                Date of birth: {{ form.dateOfBirth }}<br>
                Gender: {{ form.gender }}<br>
                Phone number: {{ form.phoneNumber }}<br>
                Email: {{ form.email }}<br>
                Zipcode: {{ form.zipcode }}<br>
                Card number: {{ form.cardNumber }}<br><br>
                <button class="btn btn-primary" @click="resetFormData">Reset data</button>
            </div>
        </div>
    </div>    
</template>

<script>
    /* eslint-disable */
    import {mask} from 'vue-the-mask'
    import Datepicker from 'vuejs-datepicker';

    export default {
        data: function () {
            return {
                productSelected: null,
                formStep: 0,
                form: {
                    name: '',
                    surname: '',
                    dateOfBirth: null,
                    gender: null,
                    phoneNumber: '',
                    email: '',
                    zipcode: '',
                    cardNumber: '',
                    quantity: 1
                },
                submitted: false,
                genderOptions: [
                    { value: null, text: 'Your gender' },
                    { value: 'Other', text: 'Other' },
                    { value: 'Male', text: 'Male' },
                    { value: 'Female', text: 'Female' },
                ],
                minNameLength: 3,
                minSurnameLength: 3,
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
                ]
            }
        },
        computed: {
            formStepOneComplete () {
                return this.stateName && this.stateSurname && (this.form.dateOfBirth != null) && (this.form.gender != null)
            },
            formStepTwoComplete () {
                return this.stateEmail && this.statePhoneNumber && this.stateZipcode && this.stateCardNumber
            },
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
            stateSurname () {
                return (this.form.surname.length >= this.minSurnameLength) ? true : false
            },
            invalidFeedbackSurname () {
                if (this.form.surname.length >= this.minSurnameLength) {
                    return ''
                } else if (this.form.surname.length > 0) {
                    return 'Enter at least ' + this.minSurnameLength + ' characters'
                } else {
                    return ''
                }
            },
            validFeedbackSurname () {
                return this.stateSurname === true ? 'Thank you' : ''
            },
            stateEmail () {
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
                return this.stateEmail === true ? 'Thank you' : ''
            },
            statePhoneNumber () {
                var re = /(.*?\d){11}/gm
                return re.test(String(this.form.phoneNumber).toLowerCase())
            },
            invalidFeedbackPhoneNumber () {
                var re = /(.*?\d){1}/gm
                if (this.statePhoneNumber) {
                    return ''
                } else if (this.form.phoneNumber === '+7 (') {
                    return ''
                } else {
                    return 'Please enter correct phone number'
                }
            },
            validFeedbackPhoneNumber () {
                return this.statePhoneNumber === true ? 'Thank you' : ''
            },
            stateZipcode () {
                return this.form.zipcode.length > 0
            },
            invalidFeedbackZipcode () {
                if (this.stateZipcode) {
                    return ''
                } else if (this.form.zipcode === '') {
                    return ''
                } else {
                    return 'Please enter zipcode'
                }
            },
            validFeedbackZipcode () {
                return this.stateZipcode === true ? 'Thank you' : ''
            },
            stateCardNumber () {
                var re = /(.*?\d){16}/gm
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
            stateQuantity () {
                return this.form.quantity > 0
            },
            invalidFeedbackQuantity () {
                if (this.stateQuantity) {
                    return ''
                } else if (this.form.quantity > 99999) {
                    return 'We don\'t have so many :c'
                } else {
                    return 'Please enter real quantity'
                }
            },
            validFeedbackQuantity () {
                return this.stateQuantity ? '' : ''
            }
        },
        directives: {
            mask
        },
        components: {
            Datepicker
        },
        methods: {
            onSubmitStep1 (event) {
                event.preventDefault()
                this.formStep++
            },
            onSubmitStep2 (event) {
                event.preventDefault()
                this.formStep = 0
                this.submitted = true
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
                this.submitted = false
            },
            backToProductPage () {
                this.resetFormData()
                this.formStep = 0
                this.productSelected = null
            },
            selectProduct (product) {
                this.productSelected = product
                this.formStep++
            }
        }
    }
</script>

<style>
    .container {
        max-width: 500px;
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
