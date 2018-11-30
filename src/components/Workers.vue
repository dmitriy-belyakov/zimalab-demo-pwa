<template>
    <div class="container">
        <h5>Workers</h5>
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
        <b-table responsive bordered hover :items="workers" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter">
        </b-table>
        <b-row>
            <b-col md="8">
                <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="perPage"></b-pagination>
            </b-col>
            <b-col md="4">
                <p>Total amount of workers: {{totalRows}}</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    /* eslint-disable */
    const workers = [{
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
                workers: workers,
                fields: [
                    { key: 'id', sortable: true},
                    { key: 'name', sortable: true },
                    { key: 'position', sortable: true },
                    { key: 'office', sortable: true },
                    { key: 'age', sortable: true },
                    // { key: 'start_date', sortable: true },
                    { key: 'salary', sortable: true }
                ],
                pageOptions: [ 5, 10, 15 ],
                filter: null,
                currentPage: 1,
                perPage: 10
            }
        },
        mounted () {
            var i = 1
            for (var worker in this.workers) {
                this.workers[worker].id = i
                i++
                console.log(worker.id)
            }
        },
        computed: {
            totalRows: function () {
                return this.workers.length
            }
        }
    }
</script>

<style scoped>
    .container {
        max-width: 1000px;
    }
</style>
