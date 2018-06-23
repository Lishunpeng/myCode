<template>
	<div id="perInvateCenter">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				职位收藏
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="searchList">
				<li v-for="data in myCollectData">
					<div class="left">
						<router-link :to="{path:'/user/com_recruit/recruitDetail',query:{id:data.recruit_id}}"><p class="search_tltle" v-text="data.recruit_title"></p></router-link>
						<router-link :to="{path:'/search/com_info',query:{comId:data.company_id}}"><p v-text="data.company_name" class="marginTop lineBroke"></p></router-link>
					</div>
					<div class="right">
						<p class="search_tltle" v-text="data.recruit_salary_name"></p>
						<p v-text="data.recruit_workplace_name" class="lineBroke"></p>
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
  				page:1,
  				allLoaded:false,
  				myCollectData:[]
  			}
  		},
  		created(){
  			this.myfun.getData(this,'myCollectData','/app/myCollections/'+this.page,['personalCollectionViewPage','list']);
  		},
 		methods: {
 			loadBottom() {
				this.page++;
				this.myfun.getData(this,'myCollectData','/app/myCollections/'+this.page,['personalCollectionViewPage','list']);
			},
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