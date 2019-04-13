<template>
      <div class="page-table scrollable">
        <h1 class="animated fadeInDown">Employees</h1>

        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
        </el-row>

        <div class=" table-box card-base card-shadow--medium">
            <!--Displays the stocks table-->
            <el-table
                    :data="tableData.filter(data => !search || data.type.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">

                <el-table-column
                        prop="employeeID"
                        sortable
                        label="ID"
                ></el-table-column>

                <el-table-column
                        prop="name"
                        label="Name"
                        ></el-table-column>
                <el-table-column
                        prop="department"
                        label="Department"
                        ></el-table-column>
                <el-table-column
                        prop="nationalID"
                        label="National ID"
                       ></el-table-column>
                <el-table-column
                        prop="email"
                        label="Email"
                       ></el-table-column>
                <el-table-column
                        prop="phoneNO"
                        label="Phone Number"
                       ></el-table-column>
                <el-table-column

                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="mini"
                                placeholder="Type to search"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

