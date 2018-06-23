<template>
	<div id="on_appointList">
		<header><span class="left" @click="$router.back(-1)"></span>{{applyTitle[state]}}</header>
		<div class="container">
			<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul>
					<div v-if="!applyList.length && page==1">
						<div class="noneBox">
							<img src="../../../assets/image/on_enterPeople_none.png"/>
							<p>您还没有申请面试~</p>
							<router-link to="on_apply">
								<div class="btn">去申请吧！</div>
							</router-link>
						</div>
					</div>
					<li v-for="data in applyList" v-else>
						<router-link :to="{path:'on_applyDetail',query:{id:data.sp_application_id,state:state}}">
							<div class="detail lineBroke" v-text="data.sp_application_company"></div>
							<div class="company lineBroke" v-text="data.sp_application_title"></div>
							<div class="time" v-text="data.sp_application_create_time"></div>
						</router-link>
					</li>
				</ul>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
	export default{
		name:'on_appointList',
		data(){
			return{
				state:'',
				page:1,
				allLoaded:false,
				applyTitle:['申请失败','申请中','申请成功'],
				applyList:[]
			}
		},
		created(){
			this.state = this.$route.query.state;
			this.myfun.getData(this,'applyList','/app/myApplicationList/'+this.page+'-'+this.state,['SpApplication','list']);
		},
		methods:{
			loadBottom() {
				this.page++;
				this.myfun.getData(this,'applyList','/app/myApplicationList/'+this.page+'-'+this.state,['SpApplication','list']);
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container{
		ul{height: auto;
			.noneBox{width: 100%;height: auto;margin: 200px 0;
				img{width: 170px;display: block;margin: 200px auto;margin-bottom: 10px;}
				p{text-align: center;}
				.btn{margin: 20px auto;width: 30%;}
			}
			li{background:#fff;height: auto;border-bottom: 2px solid #e1e1e1;display: flex;padding: 20px 30px;
				a{width: 100%;height: 100%;display: block;}
				.detail{color: #1B1B1B;width: 100%;font-weight: bold;}
				.company{color: #535353;width: 100%;margin-top: 10px;font-size: 26px;}
				.time{color: #B6B6B6;text-align: right;font-size: 26px;margin-top: 10px;float: right;}
			}
		}
	}
</style>