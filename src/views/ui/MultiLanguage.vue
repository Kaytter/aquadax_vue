<template>
	<vue-scroll class="page-multi-language">
		<div class="page-header">
			<h1>Multi language</h1>
			<h4><a href="http://kazupon.github.io/vue-i18n/en/" target="_blank"><i class="mdi mdi-book-open-page-variant"></i> read the complete documentation </a></h4>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
				<el-breadcrumb-item>UI</el-breadcrumb-item>
				<el-breadcrumb-item>Multi language</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<div class="card-base card-shadow--small ph-40 pt-20 pb-30">
			<p>Multi language support is provided by the <a href="https://github.com/kazupon/vue-i18n" target="_blank">vue-i18n</a> plugin. For more information and to find out about all possible implementations, I invite you to read the <a href="http://kazupon.github.io/vue-i18n/en/" target="_blank">documentation</a>.</p>
			<p>In the theme <a href="https://pragmatic.ddmweb.it/docs/#/multilanguage" target="_blank">documentation</a> you can find out how it was implemented.</p>
			<hr class="styled mb-20">
			<strong class="mr-20">{{ $t("message.hello") }}</strong>
			<el-dropdown trigger="click" @command="onCommandLang">
				<span class="el-dropdown-link">
					<i class="flag-icon mr-5" :class="{['flag-icon-'+langIcon]:true}"></i> {{ $t("languages."+langText) }}
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="us-English"><i class="flag-icon flag-icon-us mr-15"></i>{{ $t("languages.English") }}</el-dropdown-item>
					<el-dropdown-item command="it-Italian"><i class="flag-icon flag-icon-it mr-15"></i>{{ $t("languages.Italian") }}</el-dropdown-item>
					<el-dropdown-item command="fr-French"><i class="flag-icon flag-icon-fr mr-15"></i>{{ $t("languages.French") }}</el-dropdown-item>
					<el-dropdown-item command="de-German"><i class="flag-icon flag-icon-de mr-15"></i>{{ $t("languages.German") }}</el-dropdown-item>
					<el-dropdown-item command="es-Spanish"><i class="flag-icon flag-icon-es mr-15"></i>{{ $t("languages.Spanish") }}</el-dropdown-item>
					<el-dropdown-item command="cn-Chinese"><i class="flag-icon flag-icon-cn mr-15"></i>{{ $t("languages.Chinese") }}</el-dropdown-item>
					<el-dropdown-item command="jp-Japanese"><i class="flag-icon flag-icon-jp mr-15"></i>{{ $t("languages.Japanese") }}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</vue-scroll>
</template>

<script>
export default {
	name: 'MultiLanguage',
	data() {
		return {
			langIcon: 'us',
			langText: 'English'
		}
	},
	methods: {
		onCommandLang(lang) {
			if(lang && lang.indexOf('-') !== -1) {
				this.langIcon = lang.split('-')[0]
				this.langText = lang.split('-')[1]
				this.$i18n.locale = this.langIcon
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.el-dropdown-link {
	cursor: pointer;
	color: $text-color;

	.flag-icon {
		background-color: #eee;
		border: 1px solid #eee;
	}

	&:hover {
		border-bottom: 1px solid $text-color;
	}
}
</style>

