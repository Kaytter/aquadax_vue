<template>
     <div class="page-table scrollable">

        <el-form ref="addForm" :rules="rules" :model="addForm" label-width="120px">
            <h2 class="animated fadeInDown" >Add new Employee</h2>

             <el-form-item label="First Name" prop="Fname" >
                <el-input  v-model="addForm.Fname"></el-input>
            </el-form-item>
            <el-form-item label="Last Name" prop="Lname" >
                <el-input  v-model="addForm.Lname"></el-input>
            </el-form-item>
             <el-form-item label="ID Number" prop="nationaID" >
                <el-input type="number" v-model="addForm.nationaID"></el-input>
            </el-form-item>
             <el-form-item label="Phone Number" prop="phone" >
                <el-input type="number" v-model="addForm.phone"></el-input>
            </el-form-item>
             <el-form-item label="Email Address" prop="email">
                <el-input   v-model="addForm.email"></el-input>
            </el-form-item>

            <el-form-item label="Department" prop="department">
                <el-input   v-model="addForm.department"></el-input>
            </el-form-item>

            <el-form-item label="Start Date" prop="date">
                <el-col :span="11">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="addForm.date" style="width: 70%;"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('addForm')">SAVE</el-button>
                <el-button  @click="cancelClicked">CLOSE</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
