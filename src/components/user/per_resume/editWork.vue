<template>
	<div id="editWork">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			工作经验
		</header>
		<div class="inputBox"><span>入职时间：</span>
			<mt-datetime-picker v-model="inJobTime_hide"  ref="in_picker" :startDate="_startDate" :endDate="_endTime" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="chooseInJobTime">
			</mt-datetime-picker>
			<input type="text" placeholder="请选择入职时间"  v-model="inJobTime_show" @click="myshow('in_picker')" readonly="readonly"/>
		</div>
		<div class="inputBox"><span>离职时间：</span>
			<mt-datetime-picker v-model="outJobTime_hide"  ref="out_picker" :startDate="_startDate" :endDate="_endTime" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="chooseOutJobTime">
			</mt-datetime-picker>
			<input type="text" placeholder="请选择离职时间"  v-model="outJobTime_show" @click="myshow('out_picker')" readonly="readonly"/>
		</div>
		<div class="inputBox"><span>公司名称：</span>
			<input type="text" placeholder="请输入公司名称" v-model="com_name"/>
		</div>
		<div class="inputBox"><span>职业名称：</span>
			<input type="text" placeholder="请输入职业名称" v-model="job_name"/>
		</div>
		<div class="inputBox"><span>工作待遇：</span>
			<input type="number" placeholder="请输入工作待遇(元)" v-model="workTreat"/>
		</div>
		<div class="workDescribe">
			<span>工作描述：</span>
			<textarea placeholder="请输入工作描述" @keyup="stringNum" v-model="workDescribe"></textarea>
			<input type="text"  readonly="readonly" v-model="textNum"/>
		</div>
		<div class="btnBox" v-if="hasDelet">
			<div class="btn" @click="save">
					保存
			</div>
			<div class="btn" @click="delet" v-if="hasDelet">
					删除
			</div>
		</div>	
		<div class="btn" @click="save" v-else>
			保存
		</div>
	</div>
</template>

<script>
	import { MessageBox,DatetimePicker,Toast} from 'mint-ui';
	export default{
		name:'editWork',
		data(){
			return{
				hasDelet:false,//是否含有删除按钮
				resumeId:'',
				workId:'',
				workDescribe:'',
				textNum:'0/500',
				_startDate:'',
  				_endTime:'',
  				inJobTime_hide:'',//入职时间初始化
  				outJobTime_hide:'',//离职时间
  				inJobTime_show:'',//入职时间初始化
  				outJobTime_show:'',//离职时间
  				com_name:'',//公司名称
  				job_name:'',//职业名称
  				workTreat:'',//工资待遇
  				workInfo:{}//当前数据
			}
		},
		created(){
			this.resumeId = this.$route.query.resumeId;
			this.workId = this.$route.query.workId;
			this.myfun.inputExpress(this);
			if(this.workId!=''){
				this.hasDelet = true;
				this.myfun.getAxios({path:'/app/resumeInfo/'+this.resumeId},res=>{
					var workInfo = res.content.workInfoList;
					for(let i in workInfo){
						if(workInfo[i].id==this.workId){
							this.workInfo = workInfo[i];
						}
					}
					console.log(this.workInfo);
					this.inJobTime_show = this.workInfo.work_start;
					this.outJobTime_show = this.workInfo.work_end;
					this.workTreat = this.workInfo.wages;
					this.workDescribe = this.workInfo.work_content;
					this.textNum = this.workDescribe.length+'/500';
					
					
					this.job_name = this.workInfo.position_name;		
					this.com_name = this.workInfo.company_name;		
					
				})
			}

			this.inJobTime_hide = new Date();
			this.outJobTime_hide = new Date();
			this._endTime = new Date();
			this._startDate = new Date('1970-01-01');
		},
		methods:{
			chooseInJobTime(){
 				this.inJobTime_show = this.myfun.getMyDate(this.inJobTime_hide);
 			},
			chooseOutJobTime(){
 				this.outJobTime_show = this.myfun.getMyDate(this.outJobTime_hide);
 			},
			stringNum(){
				this.myfun.substrTextarea(this,'workDescribe');
			},
			//显示地址
			myshow(str){
				this.$refs[str].open();
			},
			save(){
				if(!this.com_name || !this.job_name || !this.workTreat || !this.workDescribe || !this.inJobTime_show || !this.outJobTime_show){
					return MessageBox('提示','信息不能为空！');
				}
				if(!this.workTreat){
					return MessageBox('提示','工资待遇不能超过11位！');
				}
				else if(this.myfun.timeToTimestamp(this.inJobTime_show)>this.myfun.timeToTimestamp(this.outJobTime_show)){
					return MessageBox('提示','入职时间不能大于离职时间！');
				}
				var postData = {
					'resumeId':this.resumeId,
					'workInfo.id':this.workId,
					'workInfo.work_start':this.inJobTime_show,
					'workInfo.work_end':this.outJobTime_show,
					'workInfo.company_name':this.com_name,
					'workInfo.position_name':this.job_name,
					'workInfo.wages':this.workTreat,
					'workInfo.work_content':this.workDescribe
				}
				console.log(postData)
				this.myfun.postAxios({path:'/app/resumeInfoSave'},postData,res=>{
 					return MessageBox('提示',res.msg).then(()=>{
 						this.$router.back(-1);
 					});
 				})		
			},
			//删除
			delet(){
				this.myfun.getAxios({path:'/app/workInfoDelete/'+this.resumeId+'-'+this.workId},res=>{
					Toast(res.msg);
					return this.$router.back(-1);
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	#editWork{
		.btn{margin: 100px auto;}
		.inputBox{background: #fff;border-bottom: 1px solid #e1e1e1; padding-left:30px; height: 90px; width: 100%; display: flex;margin-top: 3px;
				@flex:6;
                span{flex: 2;line-height: 90px;}
                input{border: none;flex: @flex;padding: 0 10px;}
                p{flex: @flex;padding: 0 10px;line-height: 90px;}
                select{border: none;outline: none;flex: @flex;}
               
       	}
       	.btnBox{display: flex;
       		.btn{margin: 100px 50px 0 50px;}
       	}
       	.workDescribe{padding: 30px;background: #fff;height: auto;padding-bottom: 20px;overflow: hidden;
       		span{margin-bottom: 20px;display: block;}
        	textarea{padding: 20px;border: 2px solid #e1e1e1;width: 100%;height:350px;border-radius:20px ;}
        	input{background: transparent;float: right;text-align: right;border: none;outline: none;padding: 10px;display: block;height: 40px;}
        }
	}
</style>