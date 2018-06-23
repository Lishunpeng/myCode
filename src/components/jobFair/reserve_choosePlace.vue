<template>
    <!--<link rel="stylesheet" type="text/css" href="https://cdn.bootcss.com/mui/3.4.0/css/mui.min.css">-->
	
	<div id="reserve_choosePlace">
		<header><span class="left"  @click="$router.back(-1)"></span>展位选择</header>
		<div class="container">
			<div class="top">
				<div class="header">
					<div class="title" v-text="onlineBookingData.online_booking_title"></div>
				</div>
				<div class="content" v-html="onlineBookingData.news_content"></div>
				<div class="list_header">展位示意图</div>
				<div class="imgbox"><img :src="$ips+'/downloadData/img?filePath='+onlineBookingData.online_booking_exhibition_picture"/></div>
				<p style="text-align: center;">点击查看大图</p>
			</div>
			<div class="bottom">
				<div class="list_header">展位选择
					<p><span class="choose"></span>选中</p>
					<p><span class="ischoose"></span>已预订</p>
					<p><span class="unchoose"></span>可预订</p>
				</div>
				<p style="color: #FF0000;">温馨提示：为了取得更好的招聘效果，请您根据摊位示意图尽量选择靠近大门的位置。</p>
				<ul class="placeLi">
					<li v-for="(data,index) in onlinePlaceData" v-text="data.num" :class="[data.isChoose?'ischoose':'',clickNum==index?'active':'']" @click="chooseLi(index)"></li>
				</ul>
			</div>
			
		</div>
		<div class="bigBtn" @click="next">下一步</div>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import flyZommImg from '../../assets/js/fly-zomm-img.min.js';
	export default{
		name:'reserve_choosePlace',
		data(){
			return{
//				imgData:{url:'../../../static/reservePlace.png'},
				getId:'',
				onlineBookingData:'',//展位数据
				onlinePlaceData:[],
				clickNum:-1
			}
		},
		created(){	
			this.getId = this.$route.query.id;
			console.log(this.getId);
			this.myfun.getAxios({path:'/app/jobFairPlace/'+this.getId},res=>{
				console.log(res);
				res = res.content;
				this.onlineBookingData = res.onlineBookingView;
				for (let i = 1;i<=this.onlineBookingData.online_booking_number;i++) {
					var myObj = {}
					if(i<10){
						myObj.num = '00'+i;
					}else if(i<100){
						myObj.num = '0'+i;
					}else{
						myObj.num = i.toString();
					}
					if(res.player.indexOf(myObj.num)>=0){
						myObj.isChoose = true;
					}else{
						myObj.isChoose = false;
					}
					this.onlinePlaceData.push(myObj);
				}
				this.showImg();
			});
		},
		methods:{
			next(){
				if(this.clickNum==-1){
					return MessageBox('提示','请选择展位！');
				}
				this.$router.push({path:'editReserve',query:{id:this.getId+'-'+this.onlinePlaceData[this.clickNum].num}});
			},
			chooseLi(val){
				if(this.onlinePlaceData[val].isChoose){
					return;
				}
				this.clickNum = val;
			},
			showImg(){
				var b = new flyZommImg($('.imgbox'), {
					rollSpeed: 200, //切换速度
					miscellaneous: true, //是否显示底部辅助按钮
					closeBtn: true, //是否打开右上角关闭按钮
					hideClass: 'hide', //不需要显示预览的 class
					imgQuality: 'thumb', //图片质量类型  thumb 缩略图  original 默认原图
					slitherCallback: function(direction, DOM) { //左滑动回调 两个参数 第一个动向 'left,firstClick,close' 第二个 当前操作DOM
						//                   console.log(direction,DOM);
					}
				});
				b._init();
			}
		}
	}
	
</script>

<style lang="less" type="text/less" scoped="scoped">
	.container{padding: 30px;background: #fff;
		.list_header{height: 40px;border-left:10px solid #FF6000;color: #000000;padding-left: 30px;font-size: 35px;font-weight: normal;margin: 50px 0 20px 0;
			p{float: right;padding: 0 10px;
				span{height: 20px;width: 20px;display: inline-block;border: 1px solid #E1E1E1;margin-right: 5px;border-radius:3px ;}
				span.choose{border: 1px solid #FF6000;background: #FF6000;}
				span.unchoose{border: 2px solid #ccc;background: #fff;}
				span.ischoose{border: 1px solid #E1E1E1;background: #ccc;}
			}
		}
		.top{height: auto;
			.header{
				height: auto;margin-bottom:20px;
				.title{font-size: 38px;color: #1B1B1B;font-weight: bold;text-align: center;min-height: 50px;line-height: 50px;letter-spacing: 4px;}		
			}
			.content{text-indent:50px;}
			.imgbox{width: 100%;height: auto;
				img{width: 100%;}
			}
		}
		.placeLi{margin-top: 10px;min-height: 400px;max-height: 600px;padding: 10px 0;width: 100%;overflow: auto;margin-bottom: 100px;border:solid #E1E1E1 ;border-width:5px 0;
			li{float: left;border: 2px solid #E1E1E1;text-align: center;width: 15%;height: 60px;margin-top: 10px;margin-left: 2%;line-height: 60px;font-size: 25px;color:#888888;}
			li:nth-child(6n+1){margin-left: 0;}
			li.ischoose{background: #e1e1e1;border-color:#e1e1e1;}
			li.active{background: #FF6000;border-color:#FF6000;color: #fff;}
		}
	}
	.bigBtn{height: 90px;line-height: 90px;text-align: center;color: #fff;background: #ff6000;position: fixed;bottom: 0px;width: 100%;}
</style>