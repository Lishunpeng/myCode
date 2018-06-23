<template>
	<div id="recruitCenter">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			招聘中心
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<div>
				<div class="resumeList" v-for="(data,index) in recruitData">
					<router-link :to="{path:'recruitDetail',query:{id:data.id}}">
						<div class="listTitle">{{data.recruit_title}}<span>{{data.salary_name}}</span>
							<p class="time">有效期：{{data.recruit_valid_date}}</p>
						</div>
					</router-link>	
						<div class="inputBox"><span>操作：</span>
							<select @change="chooseOption('.myOption'+index,data.id,index)" :class="'myOption'+index">
								<option>请点击选择操作</option>
								<option value="1">取消发布</option>
								<option value="2">发布</option>
								<option value="3">截止招聘</option>
								<option value="4">修改</option>
								<option value="5">删除</option>
							</select>
						</div>
						<div class="inputBox"><span>状态：</span>
							<input type="text" readonly="readonly" value="未发布" v-if="data.recruit_state==1" style="color: #FF6000;"/>
							<input type="text" readonly="readonly" value="已发布" v-else-if="data.recruit_state==2" style="color: #FF6000;"/>
							<input type="text" readonly="readonly" value="截止招聘" v-else-if="data.recruit_state==3" style="color: #FF6000;"/>	
						</div>
					
				</div>
				<!--<router-link :to="isCompleteInfo?{path:'com_recruitCenter',query:{id:''}}:{path:'/user/com_infoShow/comInfoShow'}">-->
					<div class="addWorkExp" @click="addData">
							<span></span>
							添加
					</div>
				<!--</router-link>-->
			</div>
		</mt-loadmore>
		
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		name:'recruitCenter',
		data(){
			return{
				isShow:true,
				page:1,
  				allLoaded:false,
  				recruitData:[],
  				isCompleteInfo:true
			}
		},
		created(){
			this.myfun.getData(this,'recruitData','/app/com_resumeCenter/'+this.page,['queryRecruitInfoViewPage','list']);
		},
		methods:{
			loadBottom() {
				this.page++;
				this.myfun.getData(this,'recruitData','/app/com_resumeCenter/'+this.page,['queryRecruitInfoViewPage','list']);
			},
			//选中操作
			chooseOption(obj,id,val){
				var sel_val = $(obj).children('option:selected').val();
				if(sel_val<=3){
					this.myfun.getAxios({path:'/app/comRecruitCenterState/'+this.page+'-'+id+'-'+sel_val},res=>{
						this.recruitData[val].recruit_state = sel_val;
						return Toast(res.msg);
						console.log(res);
					});					
				}else if(sel_val==4){
					this.$router.push({path:'com_recruitCenter',query:{id:id}});
				}else if(sel_val==5){
					this.myfun.getAxios({path:'/app/comRecruitInfoDelete/'+this.page+'-'+id},res=>{
						this.recruitData.splice(val,1);
						return Toast(res.msg);
					});	
				}
			},
			//添加
			addData(){
				if(this.isCompleteInfo){
					this.$router.push({path:'com_recruitCenter',query:{id:''}});
				}else{
					Toast('请填写网站企业信息再发布招聘！');
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#recruitCenter{
		.addWorkExp{width: 90%;height: 90px;border-radius:5px;border: 2px solid #ccc;margin: 60px auto;text-align: center;line-height: 90px;color: #B5B5B5;
        		span{background-size:100% 100%;height: 44px;width: 44px;background-image:url(../../../assets/image/addworkEXP.png);display: inline-block;position: relative;top: 10px;}
        		&:active{background: #ccc;}
        }
		div.resumeList{width: 100%;background: #fff;height: auto;padding:0 30px;margin-top:20px;
		.listTitle{height: auto;line-height: 50px;position: relative;font-weight: bold;
			.time{color: #898989;font-weight: normal;}
			span{float: right;display: block;height: 90px;line-height: 90px;font-weight: normal;}
		}
		.inputBox{
            	border-top: 2px solid #e1e1e1;
                height: 70px;
                width: 100%;
                display: flex;
                span{flex: 2;line-height: 70px;}
                select,input{border: none;flex: 10;border: none;outline: none;}
                input{padding-left: 10px;}
            }
		}
	}
</style>