<template>
	<div id="online_wait">
		<header><span class="left" @click="stopBack"></span>等待面试</header>
		<div class="container">
			<div class="loading">
				<img src="../../assets/image/loading.gif"/>
			</div>
			<div style="text-align: center;">正在准备面试，请耐心等待......</div>
			<div class="text" v-if="isCompany">距离面试还有<input type="text" v-model="com_h" readonly="readonly"/>小时<input type="text" v-model="com_m" readonly="readonly"/>分钟，请耐心等待并且准时进入面试！</div>
			<div class="text" v-else>
				<p v-if="isOpen">您目前排在第
					<input type="text" v-model="peopleOrder"/>位，前面还有<input type="text" v-model="peopleF"/>
					位面试者等待，最长需要等待 <input type="text" v-model="peopleTime" /> 分钟，为了避免错过面试，请尽量不要退出页面！</p>
				<p v-else>这场面试还有<input type="text" v-model="com_h" readonly="readonly"/>小时<input type="text" v-model="com_m" readonly="readonly"/>分开始！</p>
			</div>
		</div>
		<!--<div class="btn" @click="$router.back(-1)">取消</div>-->
		<div class="btn" @click="stopBack">取消</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default{
		name:'online_wait',
		data(){
			return{
				isCompany:-1,
				timer:null,
				com_h:'',
				com_m:'',
				getId:'',
				per_m:'',
				isOpen:false,
				msOrder:'',
				msTime:'',
				person_m:'',
				person_now:'',
				peopleNum:0,
				peopleOrder:0,
				peopleF:0,
				peopleTime:0
			}
		},
		created(){
			this.getId = this.$route.query.id;
			let timeOut = 1000;//1秒钟拿一次
			this.isCompany = parseInt(this.$route.query.isCompany);
			this.msOrder = 	parseInt(this.$route.query.msOrder);
			this.msTime = this.$route.query.msTime;
			console.log(this.msOrder,'msOrder');
			console.log(this.msTime,'msTime');
			this.isCompany = parseInt(this.$route.query.isCompany);
			//初始化值
			if(this.isCompany){
				this.comGetFun();
				this.timer = setInterval(()=>{
					this.comGetFun();
				},timeOut);
	//				location.href = './static/videoInterview.html#'+this.isCompany;
			}else{
				this.perGetFun();
				this.timer = setInterval(()=>{
					this.perGetFun();
				},timeOut)
			}
		},
		methods:{
			stopBack(){
				clearInterval(this.timer);
				this.$router.back(-1);
			},
			countTime(time){
				var times = time;
				this.com_h = Math.floor(times/3600000);
				this.com_m = Math.floor((times - (this.com_h*3600000))/60000);
			},
			comGetFun(){
				this.myfun.getAxios({path:'/app/interviewCompanyMessage/'+this.getId},res=>{
					if(res.content.state){
						this.isOpen = true;
						clearInterval(this.timer);
						return	location.href = './static/videoInterview.html?isCompany='+this.isCompany+'&id='+this.getId;
					}else if(res.content.msg.indexOf('面试已结束')>=0){
						clearInterval(this.timer);
						MessageBox('提示',res.content.msg);
						return this.$router.back(-1);
					}
					this.isOpen = false;
					this.countTime(res.content.startTime);
				});
			},
			perGetFun(){
				this.myfun.getAxios({path:'/app/interviewPersonalMessage/'+this.getId},res=>{
					console.log(res);
					if(res.content.state){
						this.isOpen = true;
						this.person_m = Math.floor(res.content.peopleEveryTime/60000);
						this.person_now = Math.floor(res.content.remainingTime/60000);
						this.peopleNum = res.content.peopleNum;
						this.peopleOrder = this.msOrder-this.peopleNum+1;
						this.peopleF = this.msOrder-this.peopleNum;
						this.peopleTime = this.person_m*(this.peopleF-1)+this.person_now;
						if(this.msOrder<res.content.peopleNum){
							Toast('您的面试已结束！');
							clearInterval(this.timer);
							return this.$router.back(-1);
						}
						if(res.content.toYou){
							clearInterval(this.timer);								
							return	location.href = './static/videoInterview.html?isCompany='+this.isCompany+'&id='+this.getId;
						}
					}else{
						this.countTime(res.content.startTime);
						this.isOpen = false;
//							clearInterval(this.timer);
//							MessageBox('提示','该场面试还未开始,请确定面试时间！');
//							return this.$router.back(-1);
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
#online_wait{padding: 30px;
	.container{height: auto;width: 100%;padding: 30px;background:#fff;border-radius:10px ;padding-bottom: 300px;
		.loading{width: 400px;margin: 100px auto;img{width: 100%;}margin-bottom: 10px;}
		.text{color: #B6B6B6;font-size: 26px;margin-top: 10px;}
		input{width: 40px;border: none;display: inline-block;text-align: right;}
	}
	.btn{margin: 100px auto;width: 100%;}
}
</style>