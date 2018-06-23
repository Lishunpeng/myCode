<template>
	<div id="searchPeopleList">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				收到简历
		</header>
		<mt-loadmore  :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
			<ul class="searchList">
				<li v-for="(data,list) in getResume">
					<router-link :to="{path:'/user/per_resume/myResumeDetail',query:{id:data.resume_id}}">
						<div class="top">
							<div class="left">
								<p class="search_tltle" v-text="data.resume_name"></p>
								<p>{{data.resume_sex==1?'男':'女'}}<span>｜</span>{{data.dictionary_resume_education_name}}</p>
							</div>
							<div class="right">
								<p class="search_tltle" v-text="data.recruit_title"></p>
								<p v-text="data.resume_create_date"></p>
							</div>
						</div>
					</router-link>
					<div class="bottom">
						<span>状态：</span>
						<p v-text="companyResumeStateMapList[data.bid_state]"></p>
					</div>
					<div class="bottom" v-if="data.bid_state>=7">
						<span>操作：</span>
						<p style="color: #898989;">无操作</p>
					</div>
					<div class="bottom" v-else>
						<span>操作：</span>
						<select v-if="data.bid_state%2==0" @change="chooseOp('#state_0',data.id,list)" id="state_0">
							<option value="0">请选择操作</option>
							<option v-for="(optionData,index) in companyResumeStateMapList" v-text="optionData" :value="index" v-if="parseInt(index)>parseInt(data.bid_state)"></option>
						</select>
						<select v-else @change="chooseOp('#state_1',data.id,list)" id="state_1">
							<option value="0">请选择操作</option>
							<option v-for="(optionData,index) in companyResumeStateMapList" v-text="optionData" :value="index" v-if="parseInt(index)>parseInt(data.bid_state)+1"></option>
						</select>
					</div>

				</li>
			</ul>
		</mt-loadmore>
		
	</div>
</template>


<script>
	import {MessageBox,Toast} from 'mint-ui';
	export default {
  		name: 'searchPeopleList',
  		data(){
  			return{
  				allLoaded:false,
  				page:1,
  				getResume:[],
  				companyResumeStateMapList:[]
  			}
  		},
  		created(){
  			this.myfun.getData(this,'getResume','/app/com_getResume/'+this.page,['personalBidViewPage','list'],res=>{
  				this.companyResumeStateMapList = res.content.companyResumeStateMap;
  			});
  		},
 		methods: {
 			loadBottom() {
				this.page++;
				this.myfun.getData(this,'myCollectData','/app/myCollections/'+this.page,['personalCollectionViewPage','list']);
			},
			chooseOp(obj,id,val){
				console.log(val);
				var _opChoose = $(obj).find('option:selected').val();
				if(_opChoose==0){
					return;
				}
				console.log(_opChoose,'obj_vla');
				console.log(id,'id');
				var postData = {
					id: id,
					bidState:_opChoose
				}
				console.log(postData);
				this.myfun.postAxios({path:'/app/com_getResume/'+this.page},postData,res=>{
					this.getResume[val].bid_state = _opChoose;
					Toast('操作成功！');
				});
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.searchList li{height: 240px;width: 690px;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;padding:0 30px;
		.left,.right{float: left;height: 140px;padding:30px 0;
			p{height: 40px;line-height: 40px;font-size: 30px;}
			p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;}
		}
		.bottom{display: flex;height: 40px;
			span{flex: 2;height: 100%;line-height: 40px;display: block;}
			select,p{flex: 6;outline: none;border: none;display: block;line-height: 40px;}
			p{padding-left:15px;color: #FF6000;}
		}
		.top{height: auto;overflow: hidden;border-bottom: 1px solid #E1E1E1;margin-bottom: 10px;}
		.right{float: right;
			p{text-align: right;}
			p.search_tltle{font-weight: normal;color: #FF6000;margin-bottom: 5px;font-size: 35px;
				span{margin: 0 10px;}
			}
		}
	}
</style>