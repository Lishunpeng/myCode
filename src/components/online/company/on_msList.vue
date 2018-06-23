<template>
	<div id="on_appointList">
		<header><span class="left" @click="$router.back(-1)"></span>面试列表</header>
		<div class="container">
			<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul>
					<div v-if="!appointList.length">
						<div class="noneBox">
							<img src="../../../assets/image/on_mxList_none.png"/>
							<p>暂无面试~</p>
							<div class="btn">去申请吧！</div>
						</div>
					</div>
					<li v-for="data in appointList" v-else>
						<router-link :to="{path:'on_msDetail',query:{id:data.sp_application_id,state:data.$status}}">
							<div class="left">
								<div class="detail lineBroke">{{data.sp_application_company}}</div>
								<div class="company lineBroke">{{data.sp_application_title}}</div>
								<div class="company" v-bind:style="appointTitle[1].color"><span>状态：</span>{{appointTitle[data.$status].name}}</div>
							</div>
							<div class="right">
								<div class="resumeName lineBroke">预约列表：<span>{{data.num}}</span>人</div>
								<div class="time" v-text="data.sp_application_bespoke_start_time+'-'+data.sp_application_bespoke_end_time"></div>
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
				appointTitle:[{myClass:'grey',name:'未开始'},{myClass:'origin',name:'预约中'},{myClass:'grey',name:'已结束'}],
//				appointTitle:[{name:'预约失败',color:{color:'#535353'}},{name:'预约中',color:{color:'#ff6000'}}],
//				appointList:[{company:'华峰公司',detail:'华峰公司的招聘信息',resume:'我的简历2号',time:'2018-01-01到2018-01-02'},
//					{company:'华峰公司',detail:'华峰公司的招聘信息',resume:'我的简历2号',time:'2018-01-01到2018-01-02'},
//					{company:'华峰公司',detail:'华峰公司的招聘信息',resume:'我的简历2号',time:'2018-01-01到2018-01-02'}
//				],
				page:1,
				getNowtimestamp:'',
				appointList:[],
				allLoaded:false
			}
		},
		created(){
//			this.state = this.$route.query.state;
			this.getNowtimestamp = Date.parse(new Date());
			this.myfun.getData(this,'appointList','/app/myApplicationList/'+this.page+'-'+2,['SpApplication','list']);
			
		},
		methods:{
			loadBottom() {
				this.page++;
				this.myfun.getData(this,'applyList','/app/myApplicationList/'+this.page+'-'+2,['SpApplication','list']);
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container{
		ul{height: auto;
			.noneBox{width: 100%;height: auto;margin: 250px 0;
				img{width: 170px;display: block;margin: 200px auto;margin-bottom: 10px;}
				p{text-align: center;margin-top: 20px;font-size: 35px;color: #535353;letter-spacing: 2px;}
				.btn{margin: 20px auto;width: 30%;}
			}
			li{background:#fff;
				height: auto;border-bottom: 2px solid #e1e1e1;display: flex;padding: 20px 30px;
				a{width: 100%;height: 100%;display: block;}
				.left{width:60%;float:left;
					.detail{color: #1B1B1B;width: 100%;font-weight: bold;}
					.company{color: #535353;width: 100%;margin-top: 10px;font-size: 26px;span{color: #535353;}}
					
				}
				.right{width:37%;float:right;margin-left: 3%;
					.resumeName{font-weight:bold;text-align: right;span{color: #ff6000;}}
					.time{color: #B6B6B6;text-align: right;font-size: 25px;margin-top: 10px;}
				}
			}
		}
	}
</style>