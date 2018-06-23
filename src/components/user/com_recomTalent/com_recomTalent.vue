<template>
	<div id="perInvateCenter">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				推荐人才
		</header>
		<ul class="searchList">
			<li v-for="data in recomTalent">
				<router-link :to="{path:'/user/per_resume/myResumeDetail',query:{id:data.id}}">
					<div class="left">
						<p class="search_tltle" v-text="data.resume_name"></p>
						<p>{{data.resume_sex==1?'男':'女'}}<span>｜</span>{{data.resume_education_name}}</p>
					</div>
					<div class="right">
						<p class="search_tltle">{{data.resume_position_name_cs}}<span>|</span>{{data.resume_service_name}}</p>
						<p v-text="data.resume_create_date"></p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>


<script>
	export default {
  		name: 'perInvateCenter',
  		data(){
  			return{
  				recomTalent:[]
  			}
  		},
  		created(){
  			this.myfun.getAxios({path:'/app/com_recommendTalent/'+this.page},res=>{
  				this.recomTalent = res.content.resumeInfoViewList;
  				console.log(res);
  			})
//			this.myfun.getData(this,'lookMe','/app/lookMe/'+this.page,['companyReadViewPage','list']);
  		},
  		
 		methods: {
		}
	}
</script>

<style lang="less" scoped="scoped">
	.searchList li{height: 130px;width: 90%;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;
		.left,.right{float: left;height: 100%;padding:30px;
			p{text-align: center;height: 40px;line-height: 40px;font-size: 30px;}
			p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;}
		}
		.right{float: right;
			span{color: #FF6000;}
			p{color: #898989;}
			p.search_tltle{color: #FF6000;font-weight: normal;margin-bottom: 5px;font-size: 35px;
				span{margin: 0 10px;}
			}
		}
	}
</style>