<template>
	<div id="resumeCenter">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			简历中心
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<div v-for="(data,index) in resumeList">
				<div class="resumeList">
					<div class="listTitle"><router-link :to="{path:'myResumeDetail',query:{id:data.id}}">{{data.resume_title}}</router-link><span @click="showBox($event,index)"></span>
						<ul :class="isShow==index?'show':'hide'" @click="returnClick($event)">
							<li><router-link :to="{path:'/user/per_resume/editResume',query:{id:data.id}}"><i class="edit"></i>编辑</router-link></li>
							<li @click="copyResume(data.id,index)"><i class="copy"></i>复制</li>
							<li @click="delResume(data.id,index)"><i class="delet"></i>删除</li>
						</ul>
					</div>
					
					<div class="inputBox"><span>公开状态：</span>
						<select @change="changeState(data.id,'.select_'+index)" :class="'select_'+index" v-if="data.resume_state==3">
							<option value="3">所有人公开</option>
							<option value="2">只对企业公开</option>
							<option value="1">完全保密</option>
						</select>
						<select @change="changeState(data.id,'.select_'+index)" :class="'select_'+index" v-else-if="data.resume_state==2">
							<option value="2">只对企业公开</option>
							<option value="3">所有人公开</option>
							<option value="1">完全保密</option>
						</select>
						<select @change="changeState(data.id,'.select_'+index)" :class="'select_'+index" v-else-if="data.resume_state==1">
							<option value="1">完全保密</option>
							<option value="2">只对企业公开</option>
							<option value="3">所有人公开</option>
						</select>
					</div>
				</div>
			</div>
			<!--<router-link to="editResume">-->
			<div class="addWorkExp" @click="addResume">
				<span></span>
				添加
			</div>
			<!--</router-link>-->
		</mt-loadmore>
		<!---->
		
		
		
	</div>
</template>

<script>
	import { Loadmore,Toast} from 'mint-ui';
	export default{
		name:'resumeCenter',
		data(){
			return{
				isShow:-1,
				allLoaded:false,
				page:1,
				resumeList:[],//数据列表
				isCompleteInfo:true
			}
		},
		created(){
			localStorage.removeItem('isClick');
			this.windowClick();
			this.myfun.getData(this,'resumeList','/app/resumeCenter/'+this.page,['resumeInfoPage','list']);
		},
		methods:{
			showBox:function(e,val){
				var oEvent = window.event || e;
				this.isShow = val;
				oEvent.cancelBubble = true;
			},
			windowClick:function(){
				var that = this;
				this.$nextTick(()=>{
					$(window).on('click',()=>{
						this.isShow = -1;
					});
				},0);
			},
			returnClick:function(e){
				var oEvent = window.event || e;
				oEvent.cancelBubble = true;
				return;
			},
			loadBottom:function(){
				this.page++;
				console.log(111);
				this.myfun.getData(this,'resumeList','/app/resumeCenter/'+this.page,['resumeInfoPage','list']);
			},
			//添加简历
			addResume(){
				if(!this.isCompleteInfo){
					return Toast('请完善个人信息再填写简历！');
				}
				this.myfun.getAxios({path:'/app/resumeInfoSave/'},res=>{
					Toast('添加成功！');
					this.resumeList.push(res.content);
				});
			},
			copyResume(id,val){
				this.isShow = -1;
				this.myfun.getAxios({path:'/app/resumeInfoCopy/'+id},res=>{
					Toast('复制成功！');
					console.log(res);
					this.resumeList.push(JSON.parse(JSON.stringify(this.resumeList[val])));
					var str = this.resumeList[val].resume_title;
					this.resumeList[this.resumeList.length-1].resume_title = str+'_复制';
				});
			},
			//删除
			delResume(id,val){
				this.isShow = -1;
				this.myfun.getAxios({path:'/app/resumeInfoDelete/'+id},res=>{
					Toast('删除成功！');
					this.resumeList.splice(val,1);
				});
			},
			changeState(id,obj){
				var _state = $(obj).find('option:selected').val();
				var postData = {
					'resumeId':id,
					'resumeInfo.resume_state':_state
				}
				this.myfun.postAxios({path:'/app/resumeStateSave'},postData,res=>{
					Toast(res.msg);
				});
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#resumeCenter{
		.addWorkExp{width: 90%;height: 90px;border-radius:5px;border: 2px solid #ccc;margin: 60px auto;text-align: center;line-height: 90px;color: #B5B5B5;
    		span{background-size:100% 100%;height: 44px;width: 44px;background-image:url(../../../assets/image/addworkEXP.png);display: inline-block;position: relative;top: 10px;}
    		&:active{background: #ccc;}
    	}
		.resumeList{width: 100%;background: #fff;height: 160px;padding:0 30px;margin-top:20px;
		.listTitle{height: 90px;line-height: 90px;position: relative;border-bottom: 1px solid #e1e1e1;
			a{color: #FF6000;font-weight: bold;}
			span{float: right;background: url(../../../assets/image/more.png);background-size:100% 100%;display: block;width: 50px;height: 10px;margin-top: 40px;}
			ul{padding:5px 25px;position: absolute;height: auto;width: 200px;box-shadow: 1px 1px 5px #555555;top: 30px;left: auto;right: 0px;background: #fff;z-index: 1000;
				li{height: 90px;}
				li+li{border-top:1px solid #E1E1E1;}
				i{background-size:100% 100%;width: 40px;display: inline-block;margin-right: 20px;}
				i.edit{background-image: url(../../../assets/image/updateIcon.png);height: 35px;position: relative;top: 3px;}
				i.copy{background-image: url(../../../assets/image/copyIcon.png);height: 38px;position: relative;top: 3px;}
				i.delet{background-image: url(../../../assets/image/deleteIcon.png);height: 40px;position: relative;top: 3px;}
			}
		}
		.inputBox{
            	height: 70px;
                width: 100%;
                display: flex;
                span{flex: 2;line-height: 70px;}
                select{border: none;flex: 6;border: none;outline: none;}
            }
		}
	}
</style>