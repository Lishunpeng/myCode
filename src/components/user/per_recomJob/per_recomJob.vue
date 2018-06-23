<template>
	<div id="perInvateCenter">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				推荐职位
		</header>
		<ul class="searchList">
			<li v-for="data in recomJob">
				<div class="left">
					<router-link :to="{path:'/user/com_recruit/recruitDetail',query:{id:data.id}}"><p class="search_tltle" v-text="data.recruit_title"></p></router-link>
					<router-link :to="{path:'/search/com_info',query:{comId:data.company_id}}"><p v-text="data.company_name" class="marginTop lineBroke"></p></router-link>
				</div>
				<div class="right">
					<p class="search_tltle" v-text="data.salary_name"></p>
					<p v-text="data.workplace_name" class="lineBroke"></p>
					<p v-text="data.recruit_release_date"></p>
				</div>
			</li>
		</ul>
	</div>
</template>


<script>
	export default {
  		name: 'perInvateCenter',
  		data(){
  			return{
  				recomJob:[]
  			}
  		},
  		created(){
  			this.myfun.getAxios({path:'/app/recommendJob/'},res=>{
  				console.log(res);
  				this.recomJob = res.content.queryRecruitInfoViewList;
  				for (let i in this.recomJob) {
  					this.recomJob[i].workplace_name = this.myfun.changeAddr(this.recomJob[i].workplace_name);
  				}
  			})
  		},
  		
 		methods: {
		}
	}
</script>

<style lang="less" scoped="scoped">
	.searchList li{height: 170px;width: 690px;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;
		.left,.right{float: left;height: 100%;padding:30px;width: 50%;
			p{text-align: center;height: 40px;line-height: 40px;font-size: 30px;}
			p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;}
			.marginTop{margin-top: 30px;}
		}
		.right{float: right;width: 50%;
			p.search_tltle{font-weight: normal;color: #FF6000;margin-bottom: 5px;font-size: 35px;}
		}
	}
</style>