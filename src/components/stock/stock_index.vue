<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown">Stocks</h1>

        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
            <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
        </el-row>

        <div class=" table-box card-base card-shadow--medium">
            <!--Displays the stocks table-->

            <el-table :data="tableData" height="475" width="100%">

                <el-table-column
                        prop="stockID"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>

                <el-table-column
                        prop="quantity"
                        label="Quantity"
                        width="150"></el-table-column>
                <el-table-column
                        prop="type"
                        label="Type"
                        width="150"></el-table-column>
                <el-table-column
                        prop="date"
                        label="Date"
                        width="150"></el-table-column>
                <el-table-column label="Operations" width="150">

                    <template slot-scope="scope">
                        <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "stock_index",
        data(){
            return {
                tableData: [],
                token:'',
                form:[],
                url: '',
                excelForm:[]
            }
        },
        methods:{
            //Gets all the stock tables values from the db and assigns them to tableData to be displayed
            getStocks(){
                let url = this.url + '/stocks';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;
                    this.excelForm = Object.values(this.tableData);

                });
            },
            exportXlsx(){
                var currencyIdWs = XLSX.utils.json_to_sheet(this.excelForm);
                // Workbook
                var currencyWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(currencyWb,currencyIdWs);
                XLSX.writeFile(currencyWb, 'Stocks.xlsx');

            },

            addClicked(){
                this.$router.push('stocks/add');
            },
            // Sends a delete req to the api for the selected row and splices it from the table
            handleDelete(index, row) {

                let url = this.url + '/stocks/' + row.stockID;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.delete();
                    this.tableData.splice(index,1);
                    this.message=response.data.message;
                    this.getCurrency();
                }).catch(err =>{
                    this.$router.push('login');
                });
            },
            // Assigns the selected row unique id to the route params to allow for editing
            handleEdit(index,row){
                this.form=row;
                this.id=this.form.stockID;
                this.$router.push('/stocks/edit/'+this.id);
            },


            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: 'Entry Deleted',
                    type: 'Success'
                });
            },
        },
        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getStocks();
        }
    }


</script>

<style scoped>
    .table-box{
    }
    .card-base{
    }
    #space{
        padding-bottom: 10px;
    }
</style>