<template>
	<div id="editEducation">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			教育经验
		</header>
		<div class="inputBox"><span>入学时间：</span>
			<mt-datetime-picker v-model="inSchoolTime_hide"  ref="in_picker" :startDate="_startDate" :endDate="_endTime" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="chooseInSchoolTime">
			</mt-datetime-picker>
			<input type="text" placeholder="请选择入学时间"  v-model="inSchoolTime_show" @click="myshow('in_picker')" readonly="readonly"/>
		</div>
		<div class="inputBox"><span>离校时间：</span>
			<mt-datetime-picker v-model="outSchoolTime_hide"  ref="out_picker" :startDate="_startDate" :endDate="_endTime" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="chooseOutSchoolTime">
			</mt-datetime-picker>
			<input type="text" placeholder="请选择离校时间"  v-model="outSchoolTime_show" @click="myshow('out_picker')" readonly="readonly"/>
		</div>
		<div class="inputBox"><span>学校名称：</span>
			<input type="text" placeholder="请输入学校名称" v-model="schoolName"/>
		</div>
		<div class="inputBox"><span>专业：</span>
			<input type="text" value="" placeholder="请输入专业" v-model="major"/>
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
		name:'editEducation',
		data(){
			return{
				hasDelet:false,//是否含有删除按钮
				resumeId:'',
				workId:'',
				_startDate:'',
  				_endTime:'',
  				schoolName:'',//学校名称
  				major:'',//专业
  				inSchoolTime_hide:'',//入职时间初始化
  				outSchoolTime_hide:'',//离职时间
  				inSchoolTime_show:'',//入职时间初始化
  				outSchoolTime_show:'',//离职时间
  				educationInfo:{}//当前数据
			}
		},
		created(){
			this.resumeId = this.$route.query.resumeId;
			this.eduId = this.$route.query.eduId;
			if(this.eduId!=''){
				this.hasDelet = true;
				this.myfun.getAxios({path:'/app/resumeInfo/'+this.resumeId},res=>{
					var educationInfo = res.content.educationInfoList;
					for(let i in educationInfo){
						if(educationInfo[i].id==this.eduId){
							this.educationInfo = educationInfo[i];
						}
					}
					console.log(this.educationInfo);
					this.inSchoolTime_show = this.educationInfo.education_start;
					this.outSchoolTime_show = this.educationInfo.education_end;
					this.schoolName = this.educationInfo.school_name;
					this.major = this.educationInfo.major;
				})
			}

			this.inSchoolTime_hide = new Date();
			this.outSchoolTime_hide = new Date();
			this._endTime = new Date();
			this._startDate = new Date('1970-01-01');
		},
		methods:{
			chooseInSchoolTime(){
 				this.inSchoolTime_show = this.myfun.getMyDate(this.inSchoolTime_hide);
 			},
			chooseOutSchoolTime(){
 				this.outSchoolTime_show = this.myfun.getMyDate(this.outSchoolTime_hide);
 			},
			//显示地址
			myshow(str){
				this.$refs[str].open();
			},
			save(){
				if(!this.schoolName || !this.major || !this.inSchoolTime_show || !this.outSchoolTime_show){
					return MessageBox('提示','信息不能为空！');
				}
				else if(this.myfun.timeToTimestamp(this.inSchoolTime_show)>this.myfun.timeToTimestamp(this.outSchoolTime_show)){
					return MessageBox('提示','入职时间不能大于离职时间！');
				}
				var postData = {
					'resumeId':this.resumeId,
					'educationInfo.id':this.eduId,
					'educationInfo.education_start':this.inSchoolTime_show,
					'educationInfo.education_end':this.outSchoolTime_show,
					'educationInfo.school_name':this.schoolName,
					'educationInfo.major':this.major,
				}
				this.myfun.postAxios({path:'/app/resumeInfoSave'},postData,res=>{
 					return MessageBox('提示',res.msg).then(()=>{
 						this.$router.back(-1);
 					});
 				})		
			},
			//删除
			delet(){
				this.myfun.getAxios({path:'/app/educationInfoDelete/'+this.resumeId+'-'+this.eduId},res=>{
					Toast(res.msg);
					return this.$router.back(-1);
				})
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	#editEducation{
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
       	.btn{margin: 100px auto;}
	}
</style>