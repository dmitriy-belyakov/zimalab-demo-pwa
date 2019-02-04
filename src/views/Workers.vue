<template>
    <div class="container">
        <h5>Workers</h5>
        
        <div v-show="!showLoading && !cannotLoadDB">
            <b-row>
                <b-col md="6">
                    <b-form-input v-model="filter" placeholder="Type to Search" />
                </b-col>

                <b-col md="6">
                    <b-form-group horizontal label="Per page" class="mb-0">
                        <b-form-select :options="pageOptions" v-model="perPage" />
                    </b-form-group>
                </b-col>
            </b-row><br>
            
            <b-table v-if="workers" responsive bordered hover :items="workers" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
                <template slot="delete" slot-scope="row">
                    <b-button @click.stop="deleteWorker(row.item.id)" class="btn btn-danger">
                        delete
                    </b-button>
                </template>
            </b-table>
            
            <b-row>
                <b-col md="8">
                    <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="perPage"></b-pagination>
                </b-col>
                <b-col md="4">
                    <p>Total amount of workers: {{totalRows}}</p>
                </b-col>
            </b-row>
            
            <b-button v-b-modal.modalAddWorker variant="primary">
                Add new worker
            </b-button>

            <b-modal id="modalAddWorker" @shown="marginTopFix" @ok="handleOk" ref="modal" title="Add worker">
                <b-form @submit.stop.prevent="addNewWorker">
                    <div class="form-container">
                        <b-form-group>
                            <b-form-input placeholder="Name" v-model.trim="newWorker.name">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <b-form-input placeholder="Position" v-model.trim="newWorker.position">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <b-form-input placeholder="Office" v-model.trim="newWorker.office">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <b-form-input type="number" placeholder="Age" v-model.trim="newWorker.age">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group>
                            <b-form-input type="number" placeholder="Salary" v-model.trim="newWorker.salary">
                            </b-form-input>
                        </b-form-group>
                    </div>
                </b-form>
            </b-modal>
        </div>

        <clip-loader v-show="showLoading"></clip-loader>

        <p v-show="showSuccesAdeddWorkerMessage"> Succesfully added new worker </p>

        <p v-show="cannotLoadDB"> Oops... looks like we cannot load db. Make sure you have internet connection </p>
    </div>
</template>

<script>
    /* eslint-disable */
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

    import firebase from 'firebase/app'
    import 'firebase/firestore'

    // var config = {
    //     apiKey: "AIzaSyBYoVZqtnVu2qlS7TzfM7kgY2rO96YZVy0",
    //     authDomain: "zimalab-workers.firebaseapp.com",
    //     databaseURL: "https://zimalab-workers.firebaseio.com",
    //     projectId: "zimalab-workers",
    //     storageBucket: "zimalab-workers.appspot.com",
    //     messagingSenderId: "481715674443"
    // };
    // firebase.initializeApp(config);
    var db = null

    const workerss = [{
            name: 'John Oliver',
            position: 'manager',
            office: 'New York',
            age: 45,
            start_date: '2008-12-12',
            salary: 120000
        },
        {
            name: 'John Thomas',
            position: 'boss',
            office: 'New York',
            age: 56,
            start_date: '2001-10-04',
            salary: 250000
        },
        {
            name: 'Tom Johnas',
            position: 'cleaner',
            office: 'New York',
            age: 67,
            start_date: '2012-12-20',
            salary: 20000
        },
        {
            name: 'Tom Jerry',
            position: 'manager',
            office: 'New York',
            age: 26,
            start_date: '2012-12-20',
            salary: 90000
        },
        {
            name: 'Piter Parker',
            position: 'developer',
            office: 'New York',
            age: 25,
            start_date: '2012-12-20',
            salary: 130000
        },
        {
            name: 'Tony Hawk',
            position: 'developer',
            office: 'New York',
            age: 23,
            start_date: '2012-12-20',
            salary: 130000
        },
        {
            name: 'Nicola Tesla',
            position: 'cleaner',
            office: 'New York',
            age: 80,
            start_date: '2012-12-20',
            salary: 30000
        },
        {
            name: 'Wendy Thomas',
            position: 'designer',
            office: 'New York',
            age: 28,
            start_date: '2012-12-20',
            salary: 90000
        },
        {
            name: 'Luke Skywalker',
            position: 'developer',
            office: 'New York',
            age: 31,
            start_date: '2012-12-20',
            salary: 120000
        },
        {
            name: 'Johny Holand',
            position: 'designer',
            office: 'New York',
            age: 27,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Harry Potter',
            position: 'walking guy',
            office: 'New York',
            age: 18,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Steven Smith',
            position: 'designer',
            office: 'New York',
            age: 32,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Steven Colbert',
            position: 'designer',
            office: 'New York',
            age: 12,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Zendaya Coleman',
            position: 'producer',
            office: 'New York',
            age: 21,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Polya Jarry',
            position: 'designer',
            office: 'New York',
            age: 26,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Jimmy Colbert',
            position: 'director',
            office: 'New York',
            age: 38,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Liza Koshy',
            position: 'manager',
            office: 'New York',
            age: 27,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Darick Manchester',
            position: 'designer',
            office: 'New York',
            age: 27,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Jude Darick',
            position: 'designer',
            office: 'New York',
            age: 23,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Samuel Blue',
            position: 'manager',
            office: 'New York',
            age: 36,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Samuel Grey',
            position: 'cleaner',
            office: 'New York',
            age: 27,
            start_date: '2012-12-20',
            salary: 27000
        },
        {
            name: 'Samuel White',
            position: 'designer',
            office: 'New York',
            age: 27,
            start_date: '2012-12-20',
            salary: 170000
        },
        {
            name: 'Mike Bear',
            position: 'designer',
            office: 'New York',
            age: 36,
            start_date: '2012-12-20',
            salary: 170000
        }]

    export default {
        data: function () {
            return {
                workers: [],
                fields: [
                    { key: 'id', sortable: true},
                    { key: 'name', sortable: true },
                    { key: 'position', sortable: true },
                    { key: 'office', sortable: true },
                    { key: 'age', sortable: true },
                    // { key: 'start_date', sortable: true },
                    { key: 'salary', sortable: true },
                    { key: 'delete', sortable: false }
                ],
                pageOptions: [ 5, 10, 15 ],
                filter: null,
                currentPage: 1,
                perPage: 10,
                db: null,
                dbUrl: 'workers-e9cd',
                newWorker: {
                    name: '',
                    position: '',
                    office: '',
                    age: '',
                    salary: ''
                },
                deleteWorkerId: null,
                deleteWorker_Id: null,
                showAddWorkerForm: false,
                showDeleteWorkerForm: false,
                showLoading: true,
                cannotLoadDB: false,
                showSuccesAdeddWorkerMessage: false
            }
        },
        components: {
            ClipLoader,
        },
        mounted () {
            db = this.$store.getters.firebaseDB
            db.collection("workers").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // console.log(doc.data());
                    this.workers.push({id: doc.id, ...doc.data()})
                });
                this.showLoading = false
                console.log(this.getNextId())
            });
        },
        computed: {
            totalRows: function () {
                return this.workers ? this.workers.length : 0
            }
        },
        methods: {
            addNewWorker () {
                const id = this.getNextId().toString()
                db.collection("workers").doc(id)
                    .set(this.newWorker)
                    .then(() => {
                        console.log('Successfully added new worker')
                        this.workers.push({id: id, ...this.newWorker})
                        this.showSuccesAdeddWorkerMessage = true
                        setTimeout(() => {
                            this.showSuccesAdeddWorkerMessage = false
                        }, 5000);
                    })
                    .catch((e) => console.log(e))
            },

            deleteWorker (id) {
                console.log(id)
                db.collection("workers").doc(id.toString())
                    .delete()
                    .then(() => {
                        console.log("Document successfully deleted!");
                        this.workers = this.workers.filter((item) => {
                            return item.id != id
                        })
                    })
                    .catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
            },

            marginTopFix () {
                document.getElementsByClassName('modal-dialog')[0].style.marginTop = "100px"
            },

            handleOk (event) {
                event.preventDefault()
                if (this.newWorker.name && this.newWorker.position && this.newWorker.office && this.newWorker.age && this.newWorker.salary) {
                    this.addNewWorker()
                    this.$refs.modal.hide()
                } else {
                    alert('All fields are required')
                }
            },

            /**
             * Returns incremented id for this.workers collection
             */
            getNextId () {
                return this.workers.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1
            }
        }
    }
</script>

<style scoped>
    .container {
        max-width: 1000px;
        padding-top: 10px;
        margin-bottom: 10px;
    }
</style>
