<template>
	<div id="on_appointList">
		<header><span class="left" @click="$router.back(-1)"></span>{{appointTitle[state[0]]}}</header>
		<div class="container">
			<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul>
					<div v-if="!appointList.length">
						<div class="noneBox">
							<img src="../../../assets/image/on_list_none.png"/>
							<p>您还没有预约面试~</p>
							<div class="btn"><router-link to="on_comInter">去报名吧！</router-link></div>
						</div>
					</div>
					<li v-for="data in appointList" v-else>
						<router-link :to="{path:'on_appointDetail',query:{id:data.sp_application_id,state:data.sp_sign_up_state,resume_title:data.resume_title,number:data.sp_sign_up_interview_number}}">
							<div class="left">
								<div class="detail lineBroke" v-text="data.sp_application_company"></div>
								<div class="company lineBroke" v-text="data.sp_sign_up_position"></div>
							</div>
							<div class="right">
								<div class="resumeName lineBroke" v-text="data.resume_title"></div>
								<div class="time" v-text="data.sp_sign_up_create_time"></div>
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
		name:'on_appointList',
		data(){
			return{
				state:'',
				/*appointList:[{company:'华峰公司',detail:'华峰公司的招聘信息',resume:'我的简历2号',time:'2018-01-01'},
					{company:'华峰公司',detail:'华峰公司的招聘信息',resume:'我的简历2号',time:'2018-01-01'},
					{company:'华峰公司',detail:'华峰公司的招聘信息',resume:'我的简历2号',time:'2018-01-01'}
				],*/
				//2成功，0失败，1为预约中
				appointTitle:['','预约中..','','预约成功','预约失败'],
				page:1,
				allLoaded:false,
				appointList:[]
			}
		},
		created(){
			this.state = this.$route.query.state.split(',');
			this.myfun.getData(this,'appointList','/app/myOrder/'+this.page+'-'+this.$route.query.state,['list']);
		},
		methods:{
			loadBottom() {
				this.page++;
				this.myfun.getData(this,'appointList','/app/myOrder/'+this.page+'-'+this.$route.query.state,['list']);
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
				.btn{margin: 20px auto;width: 30%;
					a{width: 100%;height: 100%;color: #fff;display: block;}
				}
			}
			li{background:#fff;
				a{width: 100%;height: 100%;display: block;}
				height: 140px;border-bottom: 2px solid #e1e1e1;display: flex;padding: 20px 30px;
				.left{width:65%;float:left;
					.detail{color: #1B1B1B;width: 100%;font-weight: bold;}
					.company{color: #535353;width: 100%;margin-top: 10px;font-size: 26px;}
				}
				.right{width:30%;float:right;margin-left: 5%;
					.resumeName{color: #ff6000;font-weight:bold;text-align: right;}
					.time{color: #B6B6B6;text-align: right;font-size: 26px;margin-top: 10px;}
				}
			}
		}
	}
</style>