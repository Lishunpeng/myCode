<template>
	<div id="searchJobList">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				找工作搜索结果
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="searchList">
				
			    <li v-for="data in companyData">
			    	<router-link :to="{path:'/user/com_recruit/recruitDetail',query:{id:data.id}}">
						<div class="left">
							<p class="search_tltle lineBroke" v-text="data.recruit_title"></p>
							<p v-text="data.company_name" class="lineBroke"></p>
							<p class="lineBroke">{{data.company_nature_name}}<span>|</span>{{data.company_staff_number_name}}<span>|</span>{{data.company_scope}}</p>
						</div>
						<div class="right">
							<p class="search_tltle" v-text="data.salary_name"></p>
							<p></p>
							<p v-text="data.recruit_release_date"></p>
						</div>
					</router-link>
				</li>
			</ul>
		</mt-loadmore>
	</div>
</template>


<script>
	import { Loadmore,Toast } from 'mint-ui';
	export default {
  		name: 'searchJobList',
  		data(){
  			return{
  				postString:'',
  				allLoaded:false,
  				companyData:[],
  				page:1
  			}
  		},
  		created(){
  			this.postString = this.$route.query.data;
  			this.myfun.getData(this,'companyData','/app/jobHunting/'+this.page+this.postString,['searchPage','list']);
  		},
 		methods: {
			loadBottom() {
				this.page++;
				this.myfun.getData(this,'companyData','/app/jobHunting/'+this.page+this.postString,['searchPage','list']);
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	header{
		.searchBox{height: 60px;float: left;width: 88%;position: relative;margin: 15px;
			input{height: 100%;display: block;width: 100%;border-radius:10px;background: #f1f1f1;border:none;padding: 0 55px;}
			#span(){position: absolute;display: block;background-size:100% 100%;width: 33px;height: 33px;top: 12px;}
			.searchIcon{#span;left: 10px;background-image: url(../../assets/image/searchIcon.png);}
			.searchDelete{#span;left: auto;right: 10px;background-image: url(../../assets/image/searchDelete.png);}
		}
	}
	.searchList li{height: 180px;width: 690px;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;
		.left,.right{float: left;height: 100%;padding:30px;width: 60%;
			p{text-align: left;height: 40px;line-height: 40px;font-size: 30px;
				span{margin: 0 15px;}
			}
			p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;}
		}
		.right{float: right;width: 40%;
			p,span{text-align: right;}
			p.search_tltle{font-weight: normal;color: #FF6000;margin-bottom: 5px;font-size: 35px;
				span{margin: 0 10px;}
			}
		}
	}
</style>