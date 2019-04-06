<template>
	<vue-scroll class="register-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>

				<h5 class="animated fadeInDown">Fill in the form below</h5>

				<el-form ref="addForm" status-icon :rules="rules" :model="addForm">

					<el-form-item >
						<h2 class="animated fadeInDown" >Add new user</h2>
					</el-form-item>
					<el-form-item prop="fullname" >
						<el-input placeholder="Full name" v-model="addForm.fullname"></el-input>
					</el-form-item>
					<el-form-item  prop="id_no" >
						<el-input placeholder="ID number" type="number" v-model="addForm.id_no"></el-input>
					</el-form-item>
					<el-form-item  prop="mobile_no" >
						<el-input placeholder="Mobile no" type="number" v-model="addForm.mobile_no"></el-input>
					</el-form-item>

					<el-form-item  prop="email" >
						<el-input placeholder="Email" v-model="addForm.email"></el-input>
					</el-form-item>

					<el-form-item  prop="username" >
						<el-input  placeholder="Username" v-model="addForm.username"></el-input>
					</el-form-item>

					<el-form-item  prop="password" >
						<el-input placeholder="Password" type="password"  v-model="addForm.password"></el-input>
					</el-form-item>

					<div class="flex">
						<div class="box grow"><el-checkbox>I read and accept terms</el-checkbox></div>
					</div>

					<div class="flex text-center center pt-30 pb-20">
						<el-button plain size="small" @click="onSubmit('addForm')" class="signin-btn tada animated">
							SIGN UP
						</el-button>
					</div>

				</el-form>
				<div class="text-center login-box pt-10">
					Already have an account? <a v-on:click="goToLogin">Login</a>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
	import ElementDialog from "../../ui/Element/ElementDialog";
	export default {
		name: 'Register',
		components: {ElementDialog},
		data() {
			return {
				addForm: {
					password: '',
					confirmPassword: ''

				},
				token: '',
				password:'',
				authUrl:'',
				dialogImageUrl: '',
				dialogVisible: false,
				//Form validation rules
				rules: {
					fullname: [
						{required: true, message: 'Please enter a name', trigger: 'blur'}
					],
					id_no: [
						{required: true, message: 'Please enter an ID No', trigger: 'blur'}
					],
					email: [
						{required: true, message: 'Please enter an email', trigger: 'blur'},
						{type: "email", message: 'Please enter a valid email', trigger: 'blur'}
					],
					mobile_no: [
						{required: true, message: 'Please enter a mobile no', trigger: 'blur'}
					],
					username: [
						{required: true, message: 'Please enter a username', trigger: 'blur'}
					],
					password: [
						{required: true, message: 'Please enter a password', trigger: 'blur'}
					],
					// password: [
					//     {required: true, validator: validatePass, trigger: 'blur'}
					// ],
					// confirmPassword: [
					//     {required: true, validator: validatePass2, trigger: 'blur'}
					// ]
				}
			}
		},
		created(){
			this.token=this.$store.getters.token;
			this.authUrl=this.$store.getters.authUrl;
		},
		methods: {
			onSubmit(form) {


				this.$refs[form].validate((valid) => {
							if (valid) {




								let url =this.authUrl + '/register';
								this.axios.post(url, this.addForm, {
									headers: {
										'Content-Type': 'application/json',
										'Authorization': 'Bearer ' + this.token
									}
								}).then((response) => {
									if (response.status == 200) {

										this.message = response.data.message;
										this.success();
										this.$router.push('/user');
									} else if (response.status == 400) {
										this.error();
									}
								})
										.catch(err =>{
											console.log(err);
											this.message='Try Again! Fill in all entries';
											this.error();


										})
							}
						}
				)
			},
			success() {
				this.$notify({
					title: 'Success',
					message: this.message,
					type: 'success'
				});
			},
			error() {
				this.$notify({
					title: 'ERROR',
					message: this.message,
					type: 'error'
				});s
			},
			selectFile(){

				this.addForm.profileurl=this.$refs.file.files[0];

			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			goToLogin(){
				this.$router.push('login');
			},


		}}
</script>

<style lang="scss">
	@import '../../../assets/scss/_variables';

	.register-page {
		background: $text-color;
		margin-left: -30px;
		margin-right: -30px;

		.form-wrapper {
			width: 100%;
		}

		.form-box {
			width: 100%;
			max-width: 540px;
			padding: 30px;
			box-sizing: border-box;
			margin: 20px auto;

			a {
				font-size: 14px;
				color: $text-color-accent;
				text-decoration: none;
				font-weight: 500;
			}

			.image-logo {
				width: 80px;
				margin: 0px auto;
				margin-bottom: 50px;
				display: block;
			}

			.signin-btn {
				width: 160px;
			}

			.login-box {
				font-size: 14px;
			}
		}
	}

	@media (max-width: 768px) {
		.layout-container .container .view.register-page {
			margin-left: -5px;
			margin-right: -5px;
			max-width: calc(100% + 10px);
		}
	}
</style>
