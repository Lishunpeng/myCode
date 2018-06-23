<template>
	<div id="perInvateCenter">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				谁看过我
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		<ul class="searchList">
			<li v-for="data in lookMe">
				<div class="left">
					<router-link :to="{path:'/search/com_info',query:{comId:data.company_id}}"><p class="search_tltle" v-text="data.company_name"></p></router-link>
					<p>{{data.company_nature_name}}<span>|</span>{{data.company_staff_number}}人<span>|</span>{{data.company_scope}}</p>
					<router-link :to="{path:'/user/per_resume/myResumeDetail',query:{id:data.resume_id}}"><p class="small">浏览：{{data.resume_title}}</p></router-link>
				</div>
				<div class="right">
					<p v-text="data.create_time"></p>
				</div>
			</li>
		</ul>
		</mt-loadmore>
	</div>
</template>


<script>
	export default {
  		name: 'perInvateCenter',
  		data(){
  			return{
  				lookMe:[],
  				page:1,
  				allLoaded:false
  			}
  		},
  		created(){
  			this.myfun.getData(this,'lookMe','/app/lookMe/'+this.page,['companyReadViewPage','list']);
  		},
  		
 		methods: {
 			loadBottom() {
				this.page++;
				this.myfun.getData(this,'lookMe','/app/lookMe/'+this.page,['companyReadViewPage','list']);
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	.searchList li{height: 170px;width: 690px;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;
		.left,.right{float: left;height: 100%;padding:30px;
			p{text-align: center;height: 40px;line-height: 40px;font-size: 30px;text-align: left;}
			p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;}
			p.small{font-size: 24px;}
			span{margin: 0 15px;}
		}
		.right{float: right;
			p{font-weight: normal;color: #FF6000;margin-bottom: 5px;margin-top: 80px;color: #898989;}
		}
	}
</style>