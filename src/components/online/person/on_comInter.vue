<template>
	<div id="on_comInter">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			企业面试
		</header>
		<div class="container">
			<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul>
					<li v-for="data in com_appointData">
						<router-link :to="{path:'on_appointInter',query:{id:data.sp_application_id}}">
							<div class="title lineBroke">{{data.sp_application_company}}<span></span>{{data.sp_application_title}}</div>
							<div class="text">
								<div class="left">状态：<span :class="statusList[data.$status].myClass">{{statusList[data.$status].name}}</span></div>
								<div class="time">{{data.sp_application_bespoke_start_time}}到{{data.sp_application_bespoke_end_time}}</div>
							</div>
						</router-link>
					</li>
				</ul>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
	export default{
		name:'on_comInter',
		data(){
			return{
				com_appointData:[],
				page:1,
				allLoaded:false,
				getNowtimestamp:'',
				statusList:[{myClass:'grey',name:'未开始'},{myClass:'origin',name:'预约中'},{myClass:'grey',name:'已结束'}]
			}
		},
		created(){
			this.getNowtimestamp = Date.parse(new Date());
			this.myfun.getData(this,'com_appointData','/app/applicationList/'+this.page,['SpApplication','list']);
		},
		methods:{
			loadBottom() {
				this.page++;
				this.myfun.getData(this,'com_appointData','/app/applicationList/'+this.page,['SpApplication','list']);
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
.container{
	ul{height: auto;background: #fff;
		li{height: auto;padding: 20px;border-bottom: 2px solid #e1e1e1;
			.title{color: #404040;width: 100%;font-size: 32px;span{margin-left: 20px;}}
			.text{margin-top: 20px;overflow: hidden;
				.left{float: left;color: #b5b5b5;span.origin{color: #FF6000;}span.grey{color: #B5B5B5;}}
				.time{float: right;color: #b5b5b5;font-size: 24px;}
			}
		}
	}
}
</style>