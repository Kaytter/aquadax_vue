<template>
    <div class="page-table scrollable">

        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <h2 class="animated fadeInDown" >Edit form</h2>

            <el-form-item label="Type" prop="type" >
                <el-input  v-model="form.type"></el-input>
            </el-form-item>

            <el-form-item label="Quantity" prop="quantity">
                <el-input  type="number" v-model="form.quantity"></el-input>
            </el-form-item>

            <el-form-item label="Date" prop="date">
                <el-col :span="11">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.date" style="width: 70%;"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">SAVE</el-button>
                <el-button  @click="cancelClicked">CLOSE</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>

    export default {
        name: "stock_add",
        data(){
            return  {
                form: {},
                message: '',
                token: '',
                url: '',
                xlsx: '',
                // Validation  rules
                rules: {
                    type: [
                        {required: true, message: 'Please input a type', trigger: 'blur'},
                    ],
                    // date: [
                    //         { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    //     ],
                    quantity: [
                        {required: true, message: 'Please input quantity', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            cancelClicked(){
                this.$router.push('/stocks');
            },
            // Validates the edit form and if it returns true updates the db values
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let url = this.url + '/stocks/'+this.id ;
                        this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/stocks');

                            }
                        })
                            .catch(err =>{
                                this.$router.push('login');
                            });
                    }else{
                        this.message='Try Again';
                        this.error();
                        return false;
                    }
                });
            },
            // Notifications
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            error() {
                this.$notify.error({
                    title: 'ERROR',
                    message: 'Error! Please Try again',
                    type: 'error'
                });
            },

           getStocks(){
                let url = this.url + '/stocks/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;
                    console.log(this.form)

                });

            },

        },
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getStocks();
        }
    }
</script>

<style scoped>

</style>