<template>
	<div id="reserveDetail">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			预订详情
		</header>

		<div class="container">
			<div class="header">
				<div class="title">梅州就业服务管理局招聘单位登记表</div>
				<div class="time">日期：{{onlineCompany.online_company_book_time}}</div>
			</div>
			<p><span>单位名称：</span>{{comInfo.company_name}}</p>
			<p><span>联系人：</span>{{comInfo.company_legal}}</p>
			<p><span>营业执照号码：</span>{{comInfo.company_business_license}}</p>
			<p class="lineBroke"><span>详细地址：</span>广东省梅州市</p>
			<p><span>电话号码：</span>{{comInfo.company_mobile_phone}}</p>
			<p><span>单位性质：</span>{{comInfo.company_nature_name}}</p>
			<p><span>单位简介：</span></p>
			<p class="detail">{{comInfo.company_brief_introduction}}</p>
			<p><span>招聘会主题：</span>{{onlineCompany.online_booking_title}}</p>
			<p><span>已选展位：</span>{{onlineCompany.online_booking_place}}</p>
			<ul class="listBox">
				<div class="list_header">招聘职位要求</div>
				<li v-for="data in onlinePosition">
					<router-link :to="{path:'jf_jobRequire',query:{data:JSON.stringify(data)}}">
						<p><span class="left">{{data.online_position_title}}</span><span class="right" style="color: #FF6000;">试用期工资：{{data.online_position_probationary_payroll}}</span></p>
						<p><span class="left">招聘人数：{{data.online_position_people_number}}人</span><span class="right">试用期：{{data.online_position_probation_period}}个月</span></p>
					</router-link>
				</li>
			</ul>
			<div class="otherBox" v-if="onlinePosition.length"><span>单位情况获知：</span>
				<div><span class="left">1.签订规范的劳动合同</span><span class="right">{{onlinePosition[0].online_position_labor_contract == 1 ? "是" : "否"}}</span></div>
				<div><span class="left">1.劳动合同期限</span><span class="right">{{onlinePosition[0].online_position_labor_contract_period}}个月</span></div>
				<div><span class="left">1.办理住房公积金</span><span class="right">{{onlinePosition[0].online_position_housing_provident_fund == 1 ? "是" : "否"}}</span></div>
				<div><span>4.办理社会保险</span>
					<ul>
						<li v-for="data in sociatyPro" v-text="data"></li>
					</ul>
					
				</div>
			</div>
			<p class="_important">预定提交后无法修改，如有特殊情况请联系我们！</p>
			<p class="_important">补充说明：{{onlineCompany.online_booking_explain}}</p>
			<p class="lineBroke">地址：{{onlineCompany.online_booking_address}}</p>
			<p>联系电话：{{onlineCompany.online_booking_phone}}</p>
			<p>传真电话：{{onlineCompany.online_booking_fax}}</p>
			
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'reserveDetail',
		data(){
			return{
				getId:'',//获取头部ID
				comInfo:'',//公司信息
				onlineCompany:'',//展位信息
				onlinePosition:[],//招聘列表
				sociatyPro:''//社会保险数据
			}
		},
		created(){
			this.getId = this.$route.query.id;
			this.myfun.getAxios({path:'/app/jobFairInfoShow/'+this.getId},res=>{
				res = res.content;
				console.log(res);
				this.comInfo = res.companyView;
				this.onlineCompany = res.onlineCompanyView;
				this.onlinePosition = res.onlinePositions;
				this.onlinePosition.length>0?this.sociatyPro = this.onlinePosition[0].online_position_social_insurance.split(','):'';
				
				var getTime = Date.parse(new Date(this.onlineCompany.online_company_book_time.replace(/-/g, '/')));
				this.onlineCompany.online_company_book_time = this.myfun.timestampToTime(getTime);
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container{padding: 30px;background: #fff;
		.header{
			height: auto;border-bottom:1px solid #E1E1E1;margin-bottom:20px;
			.title{font-size: 38px;color: #1B1B1B;font-weight: bold;text-align: center;height: 50px;line-height: 50px;letter-spacing: 4px;}		
			.time{text-align: right;color: #888888;margin: 10px 0;}	
		}
		p{line-height: 50px;height: auto;span{color: #000;font-weight: bold;}}
		p.detail{text-indent: 50px;}
		._important{color: #FF0000;}
		ul.listBox{margin: 30px 0;
			.list_header{height: 40px;border-left:10px solid #FF6000;color: #000000;padding-left: 30px;font-size: 35px;font-weight: bold;}
			li{min-height: 135px;box-shadow: 2px 2px 10px #888888;width: 100%;border-radius:10px;margin-top: 30px;padding: 20px;
				p{height: 50px;line-height: 50px;
					span{font-weight: normal;color: #888888;}
					span.left{float:left;}
					span.right{float:right;}
				}
			}			
		}
		.otherBox{
        	height: auto;display: block;padding: 10px 0;
        	 .other{text-indent: 50px;line-height: 50px;}
        	 span.left{float: left;}
        	 span.right{float: right;}
        	 div{height: auto;width: 100%;overflow: hidden;height: auto;line-height: 40px;padding: 15px 10px;border-bottom: 1px solid #E1E1E1;color: #888888;
        	 	ul{margin-top:20px;
        	 		li{float: left;height: 70px;border: 2px solid #FF6000;border-radius:10px;text-align: center;line-height: 70px;padding: 0 10px;width: auto;margin-left: 15px;}
        	 	}
        	 }
        }
	}
</style>