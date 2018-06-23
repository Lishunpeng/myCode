<template>
	<div id="per_regCenter">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			企业认证
		</header>
		<ul class="myTitle">
			<li :class="placeNum==1?'cur':''">1.填写信息</li>
			<li :class="placeNum==2?'cur':''">2.等待审核</li>
			<li :class="placeNum==3 || placeNum==4?'cur':''">3.审核结果</li>
		</ul>
		<div  :class="['msg',placeNum==1?'show':'hide']">
			<form>
				<div class="inputBox up_imgBox"><span>上传凭证：</span>
					<div class="imgbox">
						<p>上传营业执照照片</p>
						<i class="post_bg" :style="myImgPath!=''?imgStyle:''"></i>
						<input type="file" name="verifright" accept="image/*"  @change="postImg($event)"/>
						<input type="hidden" placeholder="请输入企业名称"/>
					</div>
				</div>
			</form>	
			<div class="inputBox"><span>企业名称：</span><input type="text" placeholder="请输入企业名称" v-model="com_name"/></div>
			<div class="inputBox"><span>注&nbsp;&nbsp;册&nbsp;&nbsp;号：</span><input type="number" placeholder="请输入注册号"  v-model="resNumber"/></div>
			<div class="inputBox"><span>法人代表：</span><input type="text" placeholder="请输入法人代表"  v-model="peopleRepresentative"/></div>
			<div class="inputBox"><span>成立时间：</span>
				<mt-datetime-picker v-model="pickerValue"  ref="picker" :startDate="_startDate" :endDate="_endTime" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleChange">
				</mt-datetime-picker>
				<input type="text" placeholder="请选择成立时间"  v-model="setTime" @click="myshow('#setTime')" id="setTime" readonly="readonly"/>
			</div>
			<div class="inputBox"><span>职业人数：</span>
				<select class="peopleCount">
					<option :value="data.id" v-for="data in listPeople" v-text="data.dictionary_name"></option>
				</select>

			</div>
			<div class="inputBox"><span>注册资本(万)：</span><input type="number" placeholder="请输入注册资本"  v-model="regMoney"/></div>
			<div class="workDescribe"><span>公司简介：</span>
				<textarea type="text" placeholder="请输入公司简介"  v-model="com_intruduce" @keyup="stringNum"/>
				<input type="text"  readonly="readonly" v-model="textNum"/>
			</div>
			<div class="btn" @click="save">
				提交
			</div>
		</div>
		<div :class="['isAuditing',placeNum==2?'show':'hide']">
			<img src="../../../assets/image/isAuditing.png"/>
			<p>请耐心等待，认证一般不会超过3天</p>
			<p style="color: #FF6000;margin-top: 10px;">若您未在梅州市就业服务管理局进行登记请您尽快携带相关证据去办理登记</p>
		</div>
		<div :class="['isAuditing',placeNum==3?'show':'hide']">
			<img src="../../../assets/image/auditSecc.png"/>
			<p>认证成功</p>
		</div>
		<div :class="['isAuditing',placeNum==4?'show':'hide']">
			<img src="../../../assets/image/auditLose.png"/>
			<p>认证失败</p>
			<p>失败原因：{{loseReason}}</p>
			<div class="btn" @click="reSave">
				重新认证
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast,DatetimePicker } from 'mint-ui';
	export default { 
  		name: 'per_regCenter',
  		data(){
  			return{
  				textNum:"0/500",
  				myToken:'',
  				placeNum:1,//当前位置
  				com_name:'',//企业名称
  				resNumber:'',//注册号
  				peopleRepresentative:'',//法人代表
  				setTime:"",//成立时间
  				peopleCount:"",//人数
  				regMoney:'',//注册资本
  				com_intruduce:'',//公司简介
  				timeData:'',
  				_startDate:'',
  				_endTime:'',
  				pickerValue:null,
  				listPeople:[],
  				myImgPath:'',
  				imgStyle:{},
  				com_id:'',
  				loseReason:''
  			}
  		},
  		created(){
  			this.myToken = localStorage.token;
  			this.pickerValue = new Date();
			this._endTime = new Date();
			this._startDate = new Date('1970-01-01');
  			this.myfun.inputExpress(this);//去掉e
  			this.myfun.getAxios({path:'/app/com_certification'},res=>{
				res = res.content;
				console.log(res);
				var company = res.company;
				if(company.company_img){
					this.myImgPath = this.$ips +'/downloadData/img?filePath='+company.company_img;
					this.imgStyle = {
						backgroundSize:'90% 90%',
						backgroundImage:'url('+this.myImgPath+')'
					}
				}
				this.peopleCount = company.company_staff_number;
				
				
				
				this.com_id = company.id;
 				this.com_name = company.company_name;
 				this.resNumber = company.company_business_license;
 				this.peopleRepresentative = company.company_legal;
 				this.setTime = company.company_create_date;
				this.regMoney = company.company_registered_capital;
				this.com_intruduce = company.company_brief_introduction || '';
				this.textNum = this.com_intruduce.length+'/500' || '0/500';
				this.listPeople = res.companyStaffNumberList;
				this.placeNum = company.company_state || '1';
  				if(this.placeNum==4){
  					this.loseReason = company.company_fail_cause;
  				}
  				this.$nextTick(()=>{
  					var _that = this;
  					$('.peopleCount option').each(function(){
						if($(this).val()==_that.peopleCount){
							$(this).attr('selected','selected');
						}
					})
  				});
  			})
  		},
 		methods: {
 			handleChange(){
 				this.setTime = this.myfun.getMyDate(this.pickerValue);
 			},
 			save(){
 				this.peopleCount = $('.peopleCount option:selected').val();
 				if(!this.com_name || !this.resNumber || !this.peopleRepresentative || !this.setTime || !this.peopleCount ||!this.regMoney || !this.com_intruduce){
 					return MessageBox('提示','信息不能为空！');
 				}
 				if(!this.com_id){
 					return MessageBox('提示','图片还未上传！');
 				}
 				if(!this.$comCert.test(this.resNumber) || this.resNumber.length>18){
 					return MessageBox('提示','注册码输入格式不正确！');
 				}
 				var postData = {
 					'company.id':this.com_id,
 					'company.company_name':this.com_name,
 					'company.company_business_license':this.resNumber,
 					'company.company_legal':this.peopleRepresentative,
 					'company.company_create_date':this.setTime,
 					'company.company_staff_number':this.peopleCount,
 					'company.company_registered_capital':this.regMoney,
 					'company.company_brief_introduction':this.com_intruduce
 				}
 				this.myfun.postAxios({path:'/app/companySave'},postData,res=>{
 					MessageBox('提示',res.msg).then(()=>{
 						this.placeNum=2;
 					});
 				});
 			},
 			//重新认证
 			reSave(){
 				this.placeNum=1;
 			},
 			//提交图片
 			postImg(event){
 				var myobj = event.target.files[0];
 				this.myImgPath  = this.myfun.getObjectURL(myobj);
 				var _formData = new FormData();
 				console.log(myobj);
 				_formData.append('file',myobj);
 				_formData.append('imgType','company');
 				if(this.com_id){
 					_formData.append('companyId',this.com_id); 					
 				}
 				this.myfun.post_imgAxios({path:'/app/uploadImg'},_formData,res=>{
 					$('.post_bg').css({'background-image':'url('+this.myImgPath+')','background-size':'90% 90%'});
 					console.log(res);
 					this.myfun.getAxios({path:'/app/com_certification'},result=>{
 						this.com_id = result.content.company.id;
 					})
					Toast(res.msg);
 				});
 			},
			//显示地址
			myshow(id){
				this.$refs.picker.open();
			},
			stringNum(){
				this.myfun.substrTextarea(this,'com_intruduce');
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
#per_regCenter{
		height: auto;
		overflow: hidden;
		.show{display: block;}
		.hide{display: none;}
        @color:#ff6000;
        .myTitle{height: 60px;display: flex;margin: 20px;
        	li{flex: 1;text-align: center;line-height: 60px;background: url(../../../assets/image/titleBg.png);background-size:100% 100% ;}
        	li.cur{background-image: url(../../../assets/image/titleBg1.png);color: #fff;}
        }
        .isAuditing{
        	background: #fff;padding: 50px;
        	img{margin: 50px auto;margin-bottom: 20px;display: block;}
        	p{text-align: center;}
        }
        /*msg*/
        .msg{
        	height: auto;overflow: hidden;background: #fff;
        	.link a{float: right;margin: 10px;color: #217ec3;}
            .inputBox{
            	border-bottom: 1px solid #e1e1e1;
                padding-left:30px;
                height: 90px;
                width: 100%;
                display: flex;
                span{flex: 2;line-height: 90px;}
                input[type=text],input[type=number],select{border: none;flex: 4;padding: 0 10px;text-align: right;padding-right: 20px;}
            }
            .up_imgBox{height: auto!important;display: block;padding: 30px;overflow: hidden;
            	span{display: block;width: auto;float: left;}
            	.imgbox{display:block;position:relative;width: 320px;height: 310px;float: left;border: 1px solid #E1E1E1;margin-top: 10px;
            			p{height: 70px;background: #e1e1e1;color: #333333;text-align: center;line-height: 70px;}
            			i{height: 240px;width: 100%;display: block;background: url(../../../assets/image/addImgIcon.png) no-repeat center; background-size:35% 45%;}
                		input[type=file]{position: absolute;width: 100%;height: 240px;left: 0;top: 70px;opacity: 0;}
                	}
            }
	        .workDescribe{padding: 30px;background: #fff;height: auto;padding-bottom: 20px;overflow: hidden;
	       		span{margin-bottom: 20px;display: block;}
	        	textarea{padding: 20px;border: 2px solid #e1e1e1;width: 100%;height:350px;border-radius:20px;}
	        	input{background: transparent;float: right;text-align: right;border: none;outline: none;padding: 10px;display: block;height: 40px;}
	        }
            margin-top: 30px;
            background:#fff;
        } 
       .btn{margin: 150px auto;margin-bottom: 50px;}
    }
</style>