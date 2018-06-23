<template>
	<div id="on_enterPeople">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			报名人数
			<!--<router-link :to="">-->
				<span class="right" @click="interMS">进入面试</span>
			<!--</router-link>-->
		</header>
		<ul>
			<div v-if="!enterList.length">
				<div class="noneBox">
					<img src="../../../assets/image/on_enterPeople_none.png"/>
					<p>还没有人报名，请耐心等待~</p>
					<!--<div class="btn">去申请吧！</div>-->
				</div>
			</div>
			<li v-for="(data,list) in enterList">
				<router-link :to="{path:'/user/per_resume/myResumeDetail',query:{id:data.resume_info_id,applyId:data.sp_sign_up_id}}">
					<span class="leftTop">{{(list+1)<10?'0'+(list+1):(list+1)}}</span>
					<div class="top">
						<div class="left">
							<p class="search_tltle" v-text="data.resume_name"></p>
							<p>{{data.resume_sex==1?'男':'女'}}<span>｜</span>{{data.resume_education_name}}</p>
						</div>
						<div class="right">
							<p class="search_tltle" v-text="data.sp_sign_up_position"></p>
							<p v-text="data.sp_sign_up_create_time" class="time"></p>
						</div>
					</div>
				</router-link>	
				<div class="bottom">
					<span>状态：</span>
					<!--<p v-text="companyResumeStateMapList[data.bid_state]"></p>-->
					<p v-text="companyResumeStateMap[data.sp_sign_up_state]"></p>
				</div>
				<!--<div class="bottom" v-if="data.bid_state>=7">
					<span>操作：</span>
					<p style="color: #898989;">无操作</p>
				</div>-->
				<div class="bottom">
					<span>操作：</span>
					<select @change="choose(list,$event)" class="selectBox" v-if="data.sp_sign_up_state==1 || data.sp_sign_up_state==2">
						<option value="0">请选择操作</option>
						<option v-for="(optionData,index) in enterOption1" v-text="optionData.name" :value="optionData.state"></option>
					</select>
					<select @change="choose(list,$event)" class="selectBox" v-else-if="data.sp_sign_up_state==3">
						<option value="0">请选择操作</option>
						<option v-for="(optionData,index) in enterOption2" v-text="optionData.name" :value="optionData.state"></option>
					</select>
					<select @change="choose(list,$event)" class="selectBox" v-else>
						<option value="0">请选择操作</option>
					</select>
					<!--<select v-if="data.bid_state%2==0" @change="chooseOp('#state_0',data.id,list)" id="state_0">
						<option value="0">请选择操作</option>
						<option v-for="(optionData,index) in companyResumeStateMapList" v-text="optionData" :value="index" v-if="parseInt(index)>parseInt(data.bid_state)"></option>
					</select>-->
					<!--<select v-else @change="chooseOp('#state_1',data.id,list)" id="state_1">
						<option value="0">请选择操作</option>
						<option v-for="(optionData,index) in companyResumeStateMapList" v-text="optionData" :value="index" v-if="parseInt(index)>parseInt(data.bid_state)+1"></option>
					</select>-->
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default{
		name:'on_enterPeople',
		data(){
			return{
//				enterList:[{name:'王小小',sex:1},{name:'王1',sex:1},{name:'王2',sex:1},{name:'王3',sex:0},{name:'王4',sex:1}],
				enterList:[],
				enterOption1:[{name:'同意',state:3},{name:'拒绝',state:4}],
				enterOption2:[{name:'录用',state:5},{name:'未录用',state:6}],
				getId:'',
				isMsOpen:-1,
				companyResumeStateMap:{1: "未查看",2: "已查看",3:"同意",4:"拒绝",5:"录用",6:"未录用"}
			}
		},
		created(){
			this.getId = this.$route.query.id;
			this.isMsOpen = this.$route.query.isMsOpen;
			this.initData();
		},
		methods:{
			choose(val,e){
				var $state = $(e.currentTarget).find('option:selected').val();
				if($state==0 || $state == '0'){
					return;
				}
				if(this.enterList[val].sp_sign_up_state==1){
					return MessageBox('提示','您还未查阅该简历，请先查阅！');
				}
				this.myfun.getAxios({path:'/app/userSpSignUpChangeState/'+this.enterList[val].sp_sign_up_id+'-'+$state},res=>{
					if($state==4){
						this.enterList.splice(val,1);						
					}else if($state==3){
						this.initData();
					}
					return Toast('提交成功！');
				})
			},
			initData(){
				this.myfun.getAxios({path:'/app/applicationPeopleList/'+this.getId},res=>{
					for (let i in res.content) {
						res.content[0].sp_sign_up_create_time = this.myfun.getMyDate(res.content[0].sp_sign_up_create_time);
					}
					this.enterList = res.content;
				});
			},
			interMS(){
				console.log(this.isMsOpen,'this.isMsOpen');
				if(!this.isMsOpen || this.isMsOpen=='0'){
					MessageBox('提示','面试未开始！');
				}else{
					this.$router.push({path:'../online_wait',query:{isCompany:1,id:this.getId}});
				}
				
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
#on_enterPeople ul{padding-bottom: 30px;
	.noneBox{width: 100%;height: auto;margin: 250px 0;
		img{width: 170px;display: block;margin: 200px auto;margin-bottom: 10px;}
		p{text-align: center;margin-top: 20px;font-size: 35px;color: #535353;letter-spacing: 2px;}
		.btn{margin: 20px auto;width: 30%;}
	}
	li{position: relative;height: auto;width: 690px;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;padding:20px 30px;
		span.leftTop{display: block;position: absolute;left: 0;top: 0;width:55px;height:55px;background: url(../../../assets/image/on_enterPeople.png) no-repeat center;background-size:100% 100%;color: #fff;font-size: 28px;padding: 5px 15px 15px 5px;}
		.left,.right{float: left;height: 140px;padding:30px 0;
			p{height: 40px;line-height: 40px;font-size: 30px;}
			p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;}
			p.time{color: #999;}
		}
		.bottom{display: flex;height: 40px;
			span{flex: 2;height: 100%;line-height: 40px;display: block;}
			select,p{flex: 6;outline: none;border: none;display: block;line-height: 40px;padding-left:15px ;}
			p{padding-left:15px;color: #FF6000;}
		}
		.top{height: auto;overflow: hidden;border-bottom: 1px solid #E1E1E1;margin-bottom: 10px;}
		.right{float: right;
			p{text-align: right;}
			p.search_tltle{font-weight: normal;color: #FF6000;margin-bottom: 5px;font-size: 35px;
				span{margin: 0 10px;}
			}
		}
	}
}
</style>