<template>
	<div id="searchPeopleList">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				找人才搜索结果
				<!--<div class="searchBox">
					<span class="searchIcon"></span>
					<input type="text" placeholder="请输入搜索内容" v-model="searchMsg"/>
					<span class="searchDelete" @click="login"></span>
				</div>-->
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="searchList">
				<li v-for="data in personData">
					<router-link :to="{path:'/user/per_resume/myResumeDetail',query:{id:data.id}}">
					<div class="left">
						<p class="search_tltle" v-text="data.resume_name"></p>
						<p>{{data.resume_sex==1?'男':'女'}}<span>｜</span>{{data.resume_education_name}}</p>
					</div>
					<div class="right">
						<p class="search_tltle">{{data.resume_position_name_cs}}<span>|</span>{{data.resume_service_name}}</p>
						<p class="time" v-text="data.resume_refresh_date"></p>
					</div>
					</router-link>
				</li>
			</ul>
		</mt-loadmore>
		
	</div>
</template>
<script>
	import { Loadmore } from 'mint-ui';
	export default {
  		name: 'searchPeopleList',
  		data(){
  			return{
  				postString:'',
  				allLoaded:false,
  				personData:[],
  				page:1
  			}
  		},
  		created(){
  			this.postString = this.$route.query.data;
  			this.myfun.getData(this,'personData','/app/lookingTalent/'+this.page+this.postString,['resumeInfoPage','list']);
  		},
 		methods: {
			loadBottom() {
				this.page++;
				this.myfun.getData(this,'personData','/app/lookingTalent/'+this.page+this.postString,['resumeInfoPage','list']);
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
	.searchList li{height: 140px;width: 690px;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;
		.left,.right{float: left;height: 100%;padding:30px;
			p{height: 40px;line-height: 40px;font-size: 30px;}
			p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;}
		}
		.right{float: right;
			p,span{color: #FF6000;}
			p.search_tltle{font-weight: normal;color: #FF6000;margin-bottom: 5px;font-size: 35px;
				span{margin: 0 10px;}
			}
			.time{text-align: right;}
		}
	}
</style>