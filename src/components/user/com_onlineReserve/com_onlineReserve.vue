<template>
	<div id="reserveDetail">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				在线预订
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="list">
				<li v-for="data in online_booking">
					<router-link :to="{path:'/jobFair/reserveDetail',query:{id:data.online_booking_id}}">
						<p class="tltle" v-text="data.online_booking_title"></p>
						<p v-text="data.online_company_book_time" class="time"></p>
					</router-link>	
				</li>
			</ul>
		</mt-loadmore>
		<!--<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		<ul class="searchList">
			<li v-for="data in lookMe">
				<div class="left">
					<router-link :to="{path:'/search/com_info',query:{comId:data.company_id}}"><p class="search_tltle" v-text="data.company_name"></p></router-link>
					<p>{{data.company_nature_name}}<span>|</span>{{data.company_staff_number}}人<span>|</span>{{data.company_product_name}}</p>
					<router-link :to="{path:'/user/per_resume/myResumeDetail',query:{id:data.resume_id}}"><p class="small">浏览：{{data.resume_title}}</p></router-link>
				</div>
				<div class="right">
					<p v-text="data.create_time"></p>
				</div>
			</li>
		</ul>
		</mt-loadmore>-->
	</div>
</template>


<script>
	export default {
  		name: 'perInvateCenter',
  		data(){
  			return{
  				online_booking:[],
  				page:1,
  				allLoaded:false
  			}
  		},
  		created(){
			this.myfun.getData(this,'online_booking','/app/onlineReserve/'+this.page,['onlineCompanyViewPage','list']);
  		},
  		
 		methods: {
 			loadBottom() {
				this.page++;
				this.myfun.getData(this,'online_booking','/app/onlineReserve/'+this.page,['onlineCompanyViewPage','list']);
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	.list li{padding: 20px;min-height: 100px;width: 690px;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;
		.tltle{height: auto;line-height: 50px;color: #1b1b1b;font-size: 35px;}
		.time{text-align: right;color: #888888;}
	}
</style>