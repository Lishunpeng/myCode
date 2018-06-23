<template>
	<div id="jf_jobRequire">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			职位要求

		</header>
		
		<div class="msg">
			<div class="inputBox"><span>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</span><p>{{getHeadData.online_position_title}}</p></div>
			<div class="inputBox"><span>招&nbsp;&nbsp;聘&nbsp;&nbsp;人&nbsp;&nbsp;数：</span><p>{{getHeadData.online_position_people_number}}人</p></div>
			<div class="inputBox"><span>试&nbsp;用&nbsp;期&nbsp;工&nbsp;资：</span><p>{{getHeadData.online_position_probationary_payroll}}</p></div>
			<div class="inputBox"><span>试用期后工资：</span><p>{{getHeadData.online_position_payroll}}</p></div>
			<div class="inputBox"><span>试&nbsp;&nbsp;用&nbsp;&nbsp;期&nbsp;&nbsp;限：</span><p>{{getHeadData.online_position_probation_period}}个月</p></div>
			<div class="inputBox"><span>工&nbsp;&nbsp;作&nbsp;&nbsp;时&nbsp;&nbsp;间：</span><p>{{getHeadData.online_position_working_hours}}</p></div>
			<div class="inputBox"><span>食&nbsp;&nbsp;宿&nbsp;&nbsp;条&nbsp;&nbsp;件：</span><p>{{getHeadData.online_position_room_board}}</p></div>
			<div class="inputBox"><span>休&nbsp;&nbsp;假&nbsp;&nbsp;制&nbsp;&nbsp;度：</span><p>{{getHeadData.online_position_vacation_system}}</p></div>
			<div class="inputBox"><span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：</span><p>{{getHeadData.online_position_education}}</p></div>
			<div class="inputBox"><span>户&nbsp;&nbsp;籍&nbsp;&nbsp;要&nbsp;&nbsp;求：</span><p>{{getHeadData.online_position_household_register}}</p></div>
			<div class="inputBox"><span>身&nbsp;&nbsp;高&nbsp;&nbsp;要&nbsp;&nbsp;求：</span><p>{{getHeadData.online_position_height}}</p></div>
			
			<div class="inputBox"><span>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</span><p>{{getHeadData.online_position_age}}</p></div>
			<div class="inputBox"><span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span><p>{{getHeadData.online_position_age}}</p></div>
			<div class="otherBox"><span>其&nbsp;&nbsp;他&nbsp;&nbsp;要&nbsp;&nbsp;求：</span>
				<div class="other">{{getHeadData.online_position_other}}</div>
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
  				getHeadData:[]//获取地址的DATA
  			}
  		},
  		created(){
  			this.getHeadData = this.$route.query.data;
  			this.getHeadData = JSON.parse(this.getHeadData);
  			switch (this.getHeadData.online_position_age){
  				case 1:this.getHeadData.online_position_age = '男';
  					break;
  				case 2:this.getHeadData.online_position_age = '女';
  					break;	
  				default:this.getHeadData.online_position_age = '不限';
  					break;
  			}
  			
  			console.log(this.getHeadData)
  		},
 		methods: {
 			
		}
	}
</script>

<style lang="less" scoped="scoped">
#jf_jobRequire{
        @color:#ff6000;
        /*msg*/
        .msg{
        	#box(){border-bottom: 1px solid #e1e1e1;width: 100%;}
            .inputBox{
            	#box;
            	padding-left:30px;
                height: 90px;
                display: flex;
                span{flex: 2;line-height: 90px;}
                p{border: none;flex: 4;padding: 0 10px;line-height: 90px;}
            }
            .otherBox{
            	height: auto;display: block;padding: 10px 30px;
            	 .other{text-indent: 50px;line-height: 50px;}
            	 span.left{float: left;}
            	 span.right{float: right;}
            	 div{height: auto;width: 100%;overflow: hidden;height: auto;line-height: 40px;padding: 15px 10px;border-bottom: 1px solid #E1E1E1;color: #888888;
            	 	ul{margin-top:20px;
            	 		li{float: left;height: 70px;border: 2px solid #FF6000;border-radius:10px;text-align: center;line-height: 70px;padding: 0 10px;width: auto;margin-left: 15px;}
            	 	}
            	 }
            }
           background:#fff;
        } 
    }
</style>