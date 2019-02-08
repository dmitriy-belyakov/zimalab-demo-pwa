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
            
            <b-table v-if="workers" responsive bordered hover :items="workers" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" @filtered="onFiltered">
                <template slot="delete" slot-scope="row">
                    <b-button @click.stop="deleteWorker(row.item.id)" class="btn btn-danger">
                        delete
                    </b-button>
                </template>
            </b-table>
            
            <b-row>
                <b-col md="8">
                    <b-pagination size="md" :total-rows="rowsCount" v-model="currentPage" :per-page="perPage"></b-pagination>
                </b-col>
                <b-col md="4">
                    <p>Total amount of workers: {{rowsCount}}</p>
                </b-col>
            </b-row>
            
            <b-button v-b-modal.modalAddWorker variant="primary">
                Add new worker
            </b-button>

            <b-modal id="modalAddWorker" @shown="marginTopFix" @ok="handleOk" ref="modal" title="Add worker">
                <div v-if="newWorkerError" class="alert alert-danger" role="alert">
                    {{ newWorkerError }}
                </div>
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
    
    var db = null

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
                    { key: 'addedBy', sortable: true },
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
                showSuccesAdeddWorkerMessage: false,
                newWorkerError: '',
                rowsCount: 0,
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
                this.rowsCount = this.workers.length
            });

            console.log(this.$store.getters.getUser)
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
                        this.workers.push({id: id, addedBy: this.$store.getters.getUser.user.email, ...this.newWorker})
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
                this.newWorkerError = ''
            },

            handleOk (event) {
                event.preventDefault()
                if (this.newWorker.name && this.newWorker.position && this.newWorker.office && this.newWorker.age && this.newWorker.salary) {
                    this.addNewWorker()
                    this.$refs.modal.hide()
                    this.newWorkerError = ''
                } else {
                    // alert('All fields are required')
                    this.newWorkerError = 'All fields are required'
                }
            },

            /**
             * Returns incremented id for this.workers collection
             */
            getNextId () {
                return this.workers.reduce((acc, cur) => Math.max(acc, cur.id), 0) + 1
            },

            onFiltered (filteredItems) {
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.rowsCount = filteredItems.length
                this.currentPage = 1
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
