<template>
	<div id="jf_jobRequire">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			职位要求
			
		</header>
		
		<div class="msg">
			<div class="inputBox"><span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</span><input type="text" placeholder="请输入职位(必填)" v-model="ojob"/></div>
			<div class="inputBox"><span>招&nbsp;&nbsp;聘&nbsp;&nbsp;人&nbsp;&nbsp;数：</span><input type="text" placeholder="请输入招聘人数(必填)" v-model="oneedPeople"/></div>
			<div class="inputBox"><span>试&nbsp;用&nbsp;期&nbsp;工&nbsp;资：</span><input type="text" placeholder="请输入试用期工资(必填)" v-model="obeginTryMoney"/></div>
			<div class="inputBox"><span>试用期后工资：</span><input type="text" placeholder="请输入试用期后工资(必填)" v-model="oendTryMoney"/></div>
			<div class="inputBox"><span>试&nbsp;&nbsp;用&nbsp;&nbsp;期&nbsp;&nbsp;限：</span><input type="text" placeholder="请输入试用期限(必填)" v-model="otryTime"/></div>
			<div class="inputBox"><span>工&nbsp;&nbsp;作&nbsp;&nbsp;时&nbsp;&nbsp;间：</span><input type="text" placeholder="请输入工作时间(必填)" v-model="oworkTime"/></div>
			<div class="inputBox"><span>食&nbsp;&nbsp;宿&nbsp;&nbsp;条&nbsp;&nbsp;件：</span><input type="text" placeholder="请输入食宿条件(必填)" v-model="oconfi_eat"/></div>
			<div class="inputBox"><span>休&nbsp;&nbsp;假&nbsp;&nbsp;制&nbsp;&nbsp;度：</span><input type="text" placeholder="请输入休假制度(必填)" v-model="ovacation"/></div>
			<div class="inputBox"><span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：</span><input type="text" placeholder="请输入学历(必填)" v-model="oedu"/></div>
			<div class="inputBox"><span>户&nbsp;&nbsp;籍&nbsp;&nbsp;要&nbsp;&nbsp;求：</span><input type="text" placeholder="请输入户籍要求(选填)" v-model="oplace"/></div>
			<div class="inputBox"><span>身高要求(cm)：</span><input type="text" placeholder="请输入身高要求(选填)" v-model="oheight"/></div>
			
			<div class="inputBox"><span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</span><input type="text" placeholder="(必填)年龄范围(格式：XX-XX)" v-model="oage"/></div>
			<div class="inputBox"><span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
				<ul>
					<li :class="isChoose==1?'cur':''" @click="changeSelet(1)">男</li>
					<li :class="isChoose==2?'cur':''" @click="changeSelet(2)">女</li>
					<li :class="isChoose==3?'cur':''" @click="changeSelet(3)">不限</li>
				</ul>
			</div>
			<div class="inputBox"><span>其&nbsp;&nbsp;他&nbsp;&nbsp;要&nbsp;&nbsp;求：</span><input type="text" placeholder="请输入其他要求(选填)" v-model="oother"/></div>
			<div class="btn" @click="save">
				保存
			</div>
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default { 
  		name: 'jf_jobRequire',
  		data(){
  			return{
  				textNum:'',
  				isChoose:1,
  				ojob:'',//职位
  				oneedPeople:'',//招聘人数
  				obeginTryMoney:'',//试用期工资
  				oendTryMoney:'',//试用期后工资
  				otryTime:'',//试用时间
  				oworkTime:'',//工作时间
				oconfi_eat:'',//食宿条件
				oedu:'',//学历
				oplace:'',//户籍要求
				oheight:'',//身高要求
				oage:'',//年龄
				osex:1,
				oother:'',//其他要求
				ovacation:'',//休假制度
				getId:'',
				
  			}
  		},
  		created(){
  			this.getId = this.$route.query.id;
  			if(this.getId!=-1){
  				var localArray = JSON.parse(localStorage.my_postData);
  				this.oage = localArray[this.getId].online_position_age;
  				this.oedu = localArray[this.getId].online_position_education;
  				this.oheight = localArray[this.getId].online_position_height;
  				this.oplace = localArray[this.getId].online_position_household_register;
  				this.oother = localArray[this.getId].online_position_other;
  				this.oendTryMoney = localArray[this.getId].online_position_payroll;
  				this.oneedPeople = localArray[this.getId].online_position_people_number;
  				this.otryTime = localArray[this.getId].online_position_probation_period;
  				this.obeginTryMoney = localArray[this.getId].online_position_probationary_payroll;
  				this.oconfi_eat = localArray[this.getId].online_position_room_board;
  				this.ojob = localArray[this.getId].online_position_title;
  				this.oworkTime = localArray[this.getId].online_position_working_hours;
  				this.ovacation = localArray[this.getId].online_position_vacation_system;
  				this.isChoose = localArray[this.getId].online_position_sex;
  			}
  		},
 		methods: {
 			//切换婚姻状况
			changeSelet(val){
				this.isChoose = val;
			},
			save(){
				var minSize = 20;
				if(!this.ojob || !this.oneedPeople ||!this.obeginTryMoney ||!this.oendTryMoney ||!this.otryTime ||!this.oworkTime ||!this.oconfi_eat ||!this.oedu  ||!this.oage  ||!this.ovacation){
					return MessageBox('提示','所填信息不能为空！');
				}
				var myObj = [
					{_key:this.ojob,msg:'职位',minSize:minSize},
					{_key:this.oneedPeople,msg:'招聘人数',minSize:minSize},
					{_key:this.obeginTryMoney,msg:'试用期工资',minSize:minSize},
					{_key:this.oendTryMoney,msg:'试用期后工资',minSize:minSize},
					{_key:this.otryTime,msg:'试用时间',minSize:minSize},
					{_key:this.oworkTime,msg:'工作时间',minSize:minSize},
					{_key:this.oconfi_eat,msg:'食宿条件',minSize:minSize},
					{_key:this.oedu,msg:'学历',minSize:minSize},
					{_key:this.oplace,msg:'户籍要求',minSize:minSize},
					{_key:this.oheight,msg:'身高要求',minSize:minSize},
					{_key:this.oage,msg:'年龄',minSize:minSize},
					{_key:this.oother,msg:'其他要求',minSize:minSize},
					{_key:this.ovacation,msg:'休假制度',minSize:minSize}
				]
				if(!this.myfun.judeyStrLen(myObj)){
					return;
				}
				else if(this.oneedPeople<=0){
					return MessageBox('提示','招聘人数最少1个！');
				}
				var oage = this.oage;//年龄
				if(oage.indexOf('-')<0){
					return MessageBox('提示','年龄范围输入不符合,参照格式(XX-XX)');
				}
				var $number = /^[1-9][0-9]*$/;
				var myAgeArray = oage.split('-');
				if(myAgeArray.length>2){
					return	MessageBox('提示','年龄范围输入不符合,参照格式(XX-XX)');
				}
				else if(!$number.test(myAgeArray[0]) || !$number.test(myAgeArray[1])){
					return MessageBox('提示','年龄范围输入不符合,参照格式(XX-XX)');
				}
				else if(parseInt(myAgeArray[0]) >= parseInt(myAgeArray[1])){
					return MessageBox('提示','年龄范围第一个必须比第二个小');
				}
				else if(parseInt(myAgeArray[1])>200){
					return MessageBox('提示','年龄没有大于200岁的');
				}
				this.oage = parseInt(myAgeArray[0])+'至'+myAgeArray[1]+'岁';
				var postData = {
					'online_position_age':this.oage,
					'online_position_education':this.oedu,
					'online_position_height':this.oheight,
					'online_position_household_register':this.oplace,
					'online_position_other':this.oother,
					'online_position_payroll':this.oendTryMoney,
					'online_position_people_number':this.oneedPeople,
					'online_position_probation_period':this.otryTime,
					'online_position_probationary_payroll':this.obeginTryMoney,
					'online_position_room_board':this.oconfi_eat,
					'online_position_title':this.ojob,
					'online_position_vacation_system':this.ovacation,
					'online_position_working_hours':this.oworkTime,
					'online_position_sex':this.isChoose
				}
				if(localStorage.my_postData){
					var postArray = JSON.parse(localStorage.my_postData);
				}else{
					var postArray = [];
				}
				if(this.getId==-1){
					postArray.push(postData);
				}else{
					postArray.splice(this.getId,1,postData);
				}
				localStorage.my_postData = JSON.stringify(postArray);
				Toast('保存成功！');
				this.$router.back(-1);
			}
			
		}
	}
</script>

<style lang="less" scoped="scoped">
#jf_jobRequire{
        @color:#ff6000;
        /*msg*/
        .msg{
        	#box(){border-bottom: 2px solid #e1e1e1;width: 100%;}
            .inputBox{
            	#box;
            	padding-left:30px;
                height: 90px;
                display: flex;
                span{flex: 2;line-height: 90px;}
               	input{border: none;flex: 4;padding: 0 10px;line-height: 90px;margin-bottom: 2px;}
               	ul{display: flex;flex: 4;height: 60px;margin: 15px;border-radius:20px;border:2px solid #e1e1e1;
                	li:nth-child(1){border-radius:20px 0 0 20px ;}
                	li:nth-child(3){border-radius:0 20px 20px 0;}
                	li{flex: 1;line-height: 60px;text-align: center;}
                	li+li{border-left:2px solid #E1E1E1 ;}
                	li.cur{background: #FF6000;color: #fff;}
                }
               	
            }
            .btn{margin: 150px auto;}
           background:#fff;overflow:hidden;
        } 
    }
</style>