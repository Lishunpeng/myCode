<template>
	<div id="perInvateCenter">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				我的申请
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
		<ul class="searchList">
			<li v-for="(data,index) in applyData">
				<div class="left">
					<p class="search_tltle" v-text="data.recruit_title"></p>
					<router-link :to="{path:'/search/com_info',query:{comId:data.company_id}}"><p v-text="data.company_name" class="lineBroke"></p></router-link>
					<router-link :to="{path:'/user/per_resume/myResumeDetail',query:{id:data.resume_id}}"><p class="small" v-text="'投递简历：'+data.resume_title"></p></router-link>
				</div>
				<div class="right">
					<p>申请状态：<span @click="showApplyInfo($event,index)">{{data.bid_title}}<i :class="isClickSpan==index?'active':''"></i></span></p>
					<p>已有<span v-text="data.recruit_number"></span>人申请</p>
					<p class="grey" v-text="'申请时间：'+data.create_time"></p>
				</div>
				<div :class="['applyState_detail',isClickSpan==index?'show':'hide']" >
					<span class="arrow_out"></span>
					<span class="arrow_in"></span>
					<!--已收到1-->
					<div :class="['apply_detail_box',data.bid_state==1?'active':'']" v-if="data.bid_state>=1">
						<div class="top"><span style="display: block;"></span><i style="float: left;" class="publicTitle">已收到</i><i style="float: right;color: #B5B5B5;">2018-01-20 20:30</i></div>
						<div class="bottom">HR收到了您的简历</div>
					</div>
					<!--已查看2-->
					<div :class="['apply_detail_box',data.bid_state==2?'active':'']" v-if="data.bid_state>=2">
						<div class="top"><span style="display: block;"></span><i style="float: left;" class="publicTitle">已查阅</i><i style="float: right;color: #B5B5B5;">2018-01-20 20:30</i></div>
						<div class="bottom">HR查看了您的简历</div>
					</div>
					<!--邀面试3-->
					<div :class="['apply_detail_box',data.bid_state>=3 && data.bid_state<=6?'active':'']" v-if="data.bid_state>=3 && data.bid_state!=4">
						<div class="top"><span style="display: block;"></span><i style="float: left;" class="publicTitle">邀面试</i><i style="float: right;color: #B5B5B5;">2018-01-20 20:30</i></div>
						<div class="bottom">HR查看了您的简历详情内容，还需要与其他简历进行筛选</div>
					</div>
					<!--拒绝邀面试4-->				
					<div :class="['apply_detail_box',data.bid_state==4?'active':'']"  v-if="data.bid_state==4">
						<div class="top"><span style="display: block;"></span><i style="float: left;" class="publicTitle">拒绝面试</i><i style="float: right;color: #B5B5B5;">2018-01-20 20:30</i></div>
						<div class="bottom">HR查看了您的简历详情内容，拒绝面试</div>
					</div>
					<!--邀面试5-->
					<!--<div class="apply_detail_box active" v-else-if="data.bid_state==5">
						<div class="top"><span style="display: block;"></span><i style="float: left;" class="publicTitle">邀面试</i><i style="float: right;color: #B5B5B5;">2018-01-20 20:30</i></div>
						<div class="bottom">HR查看了您的简历详情内容，还需要与其他简历进行筛选</div>
					</div>-->
					<!--邀面试6-->				
					<!--<div class="apply_detail_box active" v-else-if="data.bid_state==6">
						<div class="top"><span style="display: block;"></span><i style="float: left;" class="publicTitle">邀面试</i><i style="float: right;color: #B5B5B5;">2018-01-20 20:30</i></div>
						<div class="bottom">HR查看了您的简历详情内容，还需要与其他简历进行筛选</div>
					</div>-->

					<!--未录用7-->					
					
					<div class="apply_detail_box" v-if="data.bid_state>=7">
						<div class="top"><span style="display: block;"></span><i style="float: left;" class="publicTitle">已面试</i><i style="float: right;color: #B5B5B5;">2018-01-20 20:30</i></div>
						<div class="bottom">你已面试，请等待结果</div>
					</div>
					<div :class="['apply_detail_box',data.bid_state==7?'active':'']" v-if="data.bid_state==7">
						<div class="top"><span style="display: block;"></span><i style="float: left;" class="publicTitle">未录用</i><i style="float: right;color: #B5B5B5;">2018-01-20 20:30</i></div>
						<div class="bottom">经过面试拒绝了你的申请</div>
					</div>
					<!--已录用8-->				
					
					<div :class="['apply_detail_box',data.bid_state==8?'active':'']" v-if="data.bid_state==8">
						<div class="top"><span style="display: block;"></span><i style="float: left;" class="publicTitle">已录用</i><i style="float: right;color: #B5B5B5;">2018-01-20 20:30</i></div>
						<div class="bottom">你已通过面试</div>
					</div>
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
  				isClickSpan:-1,
  				page:1,
  				allLoaded:false,
  				applyData:[]
  			}
  		},
  		created(){
  			this.myfun.getData(this,'applyData','/app/myApply/'+this.page,['personalBidViewPage','list']);
  		},
 		methods: {
 			showApplyInfo:function(e,val){
 				var $e = window.event || e;
 				this.isClickSpan==val?this.isClickSpan=-1:this.isClickSpan=val;
 			},
 			loadBottom() {
				this.page++;
				this.myfun.getData(this,'applyData','/app/myApply/'+this.page,['personalBidViewPage','list']);
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	.applyState_detail{transition: opacity 0.3s;z-index: 1000;background: #fff;width: 80%;height: auto;border: 2px solid #FF6000;position: absolute;margin-top: 10px;padding: 20px;left: auto;right: 10px;top: 80px;
		.arrow_in{z-index: 1200;top: -20px;display: block;left: 90%;position: absolute;width: 0;height: 0; border-left: 14px solid transparent;border-right: 14px solid transparent;border-bottom: 20px solid #FF6000;}
		.arrow_out{top: -20px;z-index: 1300;display: block;left: 90.7%;position: absolute;width: 0;height: 0; border-left: 10px solid transparent;border-right: 10px solid transparent;border-bottom: 22px solid #fff;}
	}
 	.apply_detail_box{height: 75px;width: 100%;
 		.top{height:30px;width: 100%;font-size:25px;float:left;
 			span{margin: 8px;margin-right:20px;display: block;float: left;width: 14px;height: 14px;background: #e1e1e1;border-radius:50% ;}
 			.publicTitle{font-size: 30px;}
 		}
 		.bottom{line-height: 40px;float:left;border-left:2px solid #E1E1E1 ;width: 100%;height: auto;margin-left: 14px;margin-top: 5px;padding-left: 25px;color: #B5B5B5;font-size: 20px;}
 	}
	.apply_detail_box.active{
		.top span{background: #FF6000;}
		.bottom{border: none;}
	}
	.searchList{padding-bottom: 500px;}
	.searchList li{height: 170px;width: 90%;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;position: relative;
		.left,.right{float: left;height: 100%;padding:30px 0;width: 50%;padding-left: 20px;
			p{height: 40px;line-height: 40px;font-size: 30px;text-align: left;}
			p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;}
			p.small{font-size: 24px;}
		}
		.right{float: right;padding-left: 0px;padding-right: 20px;
			p{text-align: right;
				span{color: #FF6000;
					i{transition: all 0.3s;transform: rotateZ(180deg);display: inline-block;height: 30px;width: 30px;background: url(../../../assets/image/down.png);background-size:100% 100%;position: relative;top: 2px;margin-left: 10px;}
					i.active{transform: rotateZ(0deg);}
				}
			}
			p.grey{color: #898989;font-size: 24px;}
		}
	}
</style>