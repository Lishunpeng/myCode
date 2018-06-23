<template>
	<div id="com_collectCenter">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				简历收藏
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="searchList">
				<li v-for="data in com_collect">
					<router-link :to="{path:'/user/per_resume/myResumeDetail',query:{id:data.resume_id}}">
						<div class="left">
							<p class="search_tltle" v-text="data.resume_name"></p>
							<p>{{data.resume_sex==1?'男':'女'}}<span>｜</span>{{data.dictionary_endcation_name}}</p>
						</div>
						<div class="right">
							<p class="search_tltle">{{data.resume_position_name}}<span>|</span>{{data.dictionary_resume_service_name}}</p>
							<p v-text="data.create_time"></p>
						</div>
					</router-link>
				</li>
			</ul>
		</mt-loadmore>
	</div>
</template>


<script>
	export default {
  		name: 'com_collectCenter',
  		data(){
  			return{
  				page:1,
  				com_collect:[],
  				allLoaded:false
  			}
  			
  		},
  		created(){
  			this.myfun.getData(this,'com_collect','/app/com_collection/'+this.page,['companyCollectionViewPage','list']);
  		},
 		methods: {
 			loadBottom() {
				this.page++;
				this.myfun.getData(this,'com_collect','/app/com_collection/'+this.page,['companyCollectionViewPage','list']);
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	.searchList li{height: 140px;width: 690px;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;
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