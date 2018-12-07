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
                    <b-button @click.stop="deleteWorker(row.item._id, row.item)" class="btn btn-danger">
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
    import axios from 'axios'
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

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
                workers: null,
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
            axios
                .get('https://' + this.dbUrl + '.restdb.io/rest/workers', {
                    headers: {
                        'x-apikey': '5c0913455b925e3d4c9afa30'
                    }
                })
                .then(response => {
                    this.workers = response.data
                    this.showLoading = false
                })
                .catch(response => {
                    console.log(response)
                    this.showLoading = false
                    this.cannotLoadDB = true
                })
        },
        computed: {
            totalRows: function () {
                return this.workers ? this.workers.length : 0
            }
        },
        methods: {
            addNewWorker () {
                axios
                    .post('https://' + this.dbUrl + '.restdb.io/rest/workers',
                        this.newWorker,
                        {
                            headers: {
                                'x-apikey': '5c0913455b925e3d4c9afa30'
                            }
                        }
                    )
                    .then(response => {
                        console.log(response)
                        this.workers.push({
                            name: this.newWorker.name,
                            office: this.newWorker.office,
                            position: this.newWorker.position,
                            age: this.newWorker.age,
                            salary: this.newWorker.salary
                        });
                        this.newWorker.name = ''
                        this.newWorker.office = ''
                        this.newWorker.position = ''
                        this.newWorker.age = ''
                        this.newWorker.salary = ''
                    })
                    .catch(response => {
                        console.log(response)
                        this.newWorker.name = ''
                        this.newWorker.office = ''
                        this.newWorker.position = ''
                        this.newWorker.age = ''
                        this.newWorker.salary = ''
                    })                
            },
            deleteWorker (id, item) {
                axios
                    .delete('https://' + this.dbUrl + '.restdb.io/rest/workers/' + id,
                        {
                            headers: {
                                'x-apikey': '5c0913455b925e3d4c9afa30'
                            }
                        }
                    )
                    .then(response => {
                        this.deleteWorkerId = null
                        this.workers.splice(this.workers.indexOf(item), 1)
                        console.log(response)
                    })
                    .catch(response => {
                        this.deleteWorkerId = null
                        console.log(response)
                    })
            },
            marginTopFix () {
                document.getElementsByClassName('modal-dialog')[0].style.marginTop = "100px"
            },
            handleOk (event) {
                event.preventDefault()
                if (this.newWorker.name && this.newWorker.position && this.newWorker.office && this.newWorker.age && this.newWorker.salary) {
                    this.addNewWorker()
                    this.$refs.modal.hide()
                    this.showSuccesAdeddWorkerMessage = true
                    setTimeout(() => {
                        this.showSuccesAdeddWorkerMessage = false
                    }, 5000);
                } else {
                    alert('All fields are required')
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        max-width: 1000px;
    }
</style>
