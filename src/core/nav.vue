<template>
	<el-menu 
		:default-active.sync="activeLink" 
		:mode="mode" 
		@select="goto" 
		:collapse="isCollapse" 
		:unique-opened="true"
		background-color="transparent"
		class="main-navigation-menu"
		:class="{'nav-collapsed':isCollapse}"
	>
		<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>Apps</span></div>
		<el-menu-item index="/dashboard">
			<i class="mdi mdi-gauge"></i><span slot="title">Dashboard</span>
		</el-menu-item>

		<el-submenu index="stocks" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-chart-bar-stacked"></i><span>Stocks</span>
			</template>

			<el-menu-item index="/stocks">
				<i class="mdi mdi-account"></i><span slot="title">Stocks</span>
			</el-menu-item>

			<el-menu-item index="/stocks/add">
				<i class="mdi mdi-account-plus"></i><span slot="title">Add stock</span>
			</el-menu-item>

		</el-submenu>

		<el-submenu index="employees" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-account-multiple"></i><span>Employees</span>
			</template>

			<el-menu-item index="/employees/list">
				<i class="mdi mdi-account"></i><span slot="title">Employee List</span>
			</el-menu-item>

			<el-menu-item index="/employee/add">
				<i class="mdi mdi-account-plus"></i><span slot="title">Add employee</span>
			</el-menu-item>

		</el-submenu>

		<el-submenu index="production" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-houzz-box"></i><span>Production</span>
			</template>

			<el-menu-item index="/stocks">
				<i class="mdi mdi-mixer"></i><span slot="title">Shift</span>
			</el-menu-item>

			<!-- <el-menu-item index="/stocks/add">
				<i class="mdi mdi-account-plus"></i><span slot="title">Add stock</span>
			</el-menu-item> -->


		</el-submenu>

		<el-submenu index="Orders" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-cart"></i><span>Orders</span>
			</template>

			<el-menu-item index="/stocks">
				<i class="mdi mdi-cart-arrow-down"></i><span slot="title">View Orders</span>
			</el-menu-item>

			<el-menu-item index="/stocks/add">
				<i class="mdi mdi-cart-plus"></i><span slot="title">Make order</span>
			</el-menu-item>

		</el-submenu>

		<el-submenu index="vehicles" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-car"></i><span>Vehicles</span>
			</template>

			<el-menu-item index="/stocks">
				<i class="mdi mdi-car-multiple"></i><span slot="title">View vehicles</span>
			</el-menu-item>

			<el-menu-item index="/stocks/add">
				<i class="mdi mdi-car-electric"></i><span slot="title">Add vehicle</span>
			</el-menu-item>

		</el-submenu>

		<el-submenu index="Reports" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-chart-bar"></i><span>Reports</span>
			</template>

			<el-menu-item index="/stocks">
				<i class="mdi mdi-chart-line"></i><span slot="title">Daily report</span>
			</el-menu-item>

			<el-menu-item index="/stocks/add">
				<i class="mdi mdi-chart-gantt"></i><span slot="title">Weekly Report</span>
			</el-menu-item>
			<el-menu-item index="/stocks/add">
				<i class="mdi mdi-chart-areaspline"></i><span slot="title">Custom Report</span>
			</el-menu-item>

		</el-submenu>

	</el-menu>	
</template>


<script>
import { detect } from 'detect-browser'
const browser = detect()

export default {
	name: 'Nav',
	props: ['mode', 'isCollapse'],
	data() {
		return {
			isIe: true,
			isEdge: true,
			activeLink: null
		}
	},
	methods: {
		goto(index, indexPath) {
			if(index.charAt(0) === '/') {
				this.$router.push(index)
				this.$emit('push-page', {page:index})
			}

		},
		setLink(path) {
			this.activeLink = path
		}
	},
	created() {
		if(browser.name !== 'ie') this.isIe = false
		if(browser.name !== 'edge') this.isEdge = false

		this.setLink(this.$router.currentRoute.path)
		this.$router.afterEach((to, from) => {
			this.setLink(this.$router.currentRoute.path)
			//console.log('afterEach', to, from)
		})
		//console.log('this.$router.currentRoute.path', this.$router.currentRoute.path)
	},
	mounted() {
		//console.log('nav component mounted')				
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';

.el-menu {
	border: none;
}
.el-menu::before, .el-menu::after {
	display: none;
}
.el-submenu, .el-menu-item {
	.mdi {
		vertical-align: middle;
		margin-right: 5px;
		display: inline-block;
		width: 24px;
		text-align: center;
		font-size: 18px;
	}
}
</style>

<style lang="scss">
@import '../assets/scss/_variables';

.main-navigation-menu {
	transition: width .5s;

	&:not(.el-menu--collapse) {
		.el-submenu__title, .el-menu-item {
			height: 40px;
			line-height: 40px;
			background-color: transparent !important;
		}

		&:not(.el-menu--horizontal) {
			.el-menu-item, .el-submenu {
				position: relative;
				
				&::before {
					content: '';
					display: block;
					width: 0px;
					height: 1px;
					position: absolute;
					bottom: 10px;
					left: 30px;
					background: $text-color;
					z-index: 1;
					opacity: 0;
					transition: all .7s cubic-bezier(.55,0,.1,1);
				}
				&:hover {
					&::before {
						width: 100px;
						opacity: 1;
						//left: 50px;
						transform: translate(20px, 0);
					}
				}

				&.is-active {
					&::before {
						background: $text-color-accent;
					}
				}
			}
		}

		.el-submenu.is-opened {
			//background: #edf1f6 !important;
			//background: rgba(223, 228, 234, 0.38) !important;
			position: relative;

			&::after {
				content: '';
				display: block;
				width: 2px;
				position: absolute;
				top: 40px;
				bottom: 10px;
				left: 31px;
				background: $text-color;
				z-index: 1;
			}

			&::before {
				display: none;
			}

			.el-menu-item, .el-submenu {
				&::before, &::after {
					display: none;
				}
			}
		}

		.el-menu-item-group__title {
			padding: 15px 0 0px 20px;
			color: transparentize($text-color, 0.65);
		}
	}

	.el-submenu__title, .el-menu-item:not(.is-active) {
		color: $text-color;
		
		i {		
			color: $text-color;
		}
	}

	&.el-menu--collapse {
		.el-menu-item-group__title {
			padding: 15px 0 0px 0px;
			width: 100%;
			text-align: center;
		}

		.el-submenu__title:hover, .el-menu-item:hover {
			background-color: rgba(0, 0, 0, 0.05) !important;
		}
	}

	&.el-menu--horizontal {
		white-space: nowrap;
		/*width: fit-content;
		width: max-content;*/
		overflow: hidden;
		display: table;

		& > * {
			float: inherit !important;
			display: inline-block;
		}
	}

	&.nav-collapsed {
		.el-menu-item,.el-submenu__title {
			& > span {
				display: none;
			}
		}
	}
}

.main-navigation-submenu { 
	.el-menu {
		background: #fff !important;

		.el-menu-item:not(.is-active) {
			color: $text-color;
		}
		.el-menu-item:hover {
			background-color: transparentize($background-color, 0.3) !important;
		}
	}
}
</style>
