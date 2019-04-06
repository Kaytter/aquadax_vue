<template>
	<vue-scroll class="login-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>

				<float-label class="styled">
					<input @input="changed" type="email" v-model="authData.username" placeholder="Username">
				</float-label>

				<float-label class="styled">
					<input type="password" v-on:keyup.enter="login" v-model="authData.password" placeholder="Password">
				</float-label>

				<div class="flex">
					<div class="box grow"><el-checkbox>Remember Me </el-checkbox></div>
					<div class="box grow text-right"><router-link to="/forgot-password">Forgot Password?</router-link></div>
				</div>

				<div class="flex text-center center pt-30 pb-10">
					<el-button plain size="small"@click="login()" class="login-btn tada animated">
						LOGIN
					</el-button>
				</div>

				<div class="text-divider mv-10"></div>

				<div class="flex column center pt-10 pb-10">


				</div>
				<div class="text-center signin-box pt-20">	Don't have an account? <a><router-link to="/register">Sign up</router-link></a>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
	export default {
		name: 'Login',
		data() {
			return {
				authData: {},
				token:'',
				message:'',
				url:'',
				authUrl: '',
				roles: [],
				userRole:[]

			}
		},
		methods: {
			changed: function(event) {
				this.$store.commit('change', event.target.value)
			},
			setToken: function (token) {
				this.$store.commit('setToken',token)
			},setLogin: function (token) {
				this.$store.commit('setLogin',token)
			},
			setName: function(name){
				this.$store.commit('setName',name)
			},
			setProfile: function (profileurl) {
				this.$store.commit('setProfile',profileurl)
			},
			setUserRoles: function (userRoles) {
				this.$store.commit('setUserRoles',userRoles)
			},
			login() {
				//let url = 'http://localhost:7500/auth/login';

				let url = this.authUrl +'/login';

				this.axios.post(url, this.authData, {headers: {'Content-Type': 'application/json'}}).then((response)=>{


					if (response.data.status == 'success' ){
						this.setToken(response.data.token);
						this.token=response.data.token;
						this.getUser();
						this.$store.commit('setLogin', true);
						this.$router.push('dashboard');
						this.message='Log in Successful';
						this.success();
					}else {
						console.log('error');
					}

				})
						.catch(err =>{
							console.log(err);
							this.message='Try Again! Invalid username or password';
							this.error();

						})
			},
			getUser(){
				let url = this.url + '/users/'+ this.authData.username;
				this.axios.get(url, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					this.$store.commit('setName', response.data.data.fullname);
					this.$store.commit('setProfile', response.data.data.profileurl);
					this.setProfile(response.data.data.profileurl);
					this.getUserRole();

				});
			},
			//initializes and array and loops through to find the specific product that matches that in the policy and store it om productResult
			getUserRole(){
				let url = this.url + '/userroles';
				this.axios.get(url, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					//this.setUserType(response.data.data.type);
					this.roles=(response.data.data);
					let username = this.authData.username;
					let tempUserRoles= [];
					this.roles.forEach(function (s) {
						if (username == s.username) {
							tempUserRoles.push(s.role_name);
						}else{
							console.log('Error: User has no roles');
						}
					});
					this.userRole=tempUserRoles;
					this.$store.commit('setUserRoles',this.userRole);

				});

			},

			success() {
				this.$notify({
					title: 'Success',
					message: this.message,
					type: 'success'
				});},
			error() {
				this.$notify.error({
					title: 'Login Failed',
					message: this.message,

				});},

			signUp(){
				this.$router.push('/register');
			},
			loginSuccessful (req) {
				if (!req.data.token) {
					this.loginFailed();
					return
				}

			},

		},
		computed: {

		},
		created(){
			this.authUrl=this.$store.getters.authUrl;
			this.url=this.$store.getters.url;
		}
	}
</script>

<style lang="scss">
	@import '../../../assets/scss/_variables';

	.login-page {
		background: $background-color;
		margin-left: -30px;
		margin-right: -30px;

		.form-wrapper {
			width: 100%;
		}

		.form-box {
			width: 100%;
			max-width: 340px;
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
				margin-bottom: 30px;
				display: block;
			}

			.login-btn ,
			.social-btn {
				width: 160px;

				&.google {
					margin-bottom: 10px;
					background-color: #d73d32;
					color: white;

					&:hover {
						border-color: #d73d32;
					}
				}
				&.facebook {
					background-color: #3f5c9a;
					color: white;

					&:hover {
						border-color: #3f5c9a;
					}
				}
			}

			.signin-box {
				font-size: 14px;
			}
		}
	}

	@media (max-width: 768px) {
		.layout-container .container .view.login-page {
			margin-left: -5px;
			margin-right: -5px;
			max-width: calc(100% + 10px);
		}
	}
</style>
