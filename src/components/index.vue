<template>
	<div id="index">
		<header>
			<div class="searchBox">
				<span class="searchIcon" @click="mySearch"></span>
				<input type="text" placeholder="请输入内容搜索工作职位" v-model="my_search" class="searchClass"/>
				<span class="searchDelete" @click="delSearch"></span>
			</div>
		</header>
		<div class="indexContainer">
			<div class="swipeBox">
				<mt-swipe :auto="4000" >
					<mt-swipe-item v-if="!newsShufflingList.length">
						<div class="bannerBox">
							<img src="../assets/image/noneImg.png"/>
						</div>
					</mt-swipe-item>
					<mt-swipe-item v-else v-for="data in newsShufflingList">
						<div class="bannerBox">
							<img :src="$ips+'/downloadData/img?filePath='+data.news_img"/>
						</div>
					</mt-swipe-item>
				</mt-swipe>
			</div>
			
			<ul class="conNav">
				<li v-for="data in conNavData">
					<router-link :to="data.myLink">
						<div :class="['imgbox',data.myclass]"></div>
						<div class="title" v-text="data.title"></div>
					</router-link>
				</li>
			</ul>
			
			<ul class="indexList">
				<router-link to="/jobFair/jobFairCenter">
					<li class="listHeader">
						<i></i><p class="lineBroke">日常招聘</p><span></span>
					</li>
				</router-link>
				<li v-if="!largeRecruitment.length" class="isNone">
					暂无数据
				</li>
				<li v-for="data in largeRecruitment" v-else>
					<router-link :to="{path:'/jobConsult/newsShow',query:{id:data.id}}">
						<p class="lineBroke" v-text="data.news_title"></p><span></span>
					</router-link>
				</li>
			</ul>
			
			<ul class="upJob">
				<router-link :to="{path:'/search/searchPeopleList',query:{data:'--------2'}}">
					<li class="listHeader">
						<i></i><p class="lineBroke">线下求职</p><span></span>
					</li>
				</router-link>
				<li v-if="!newestResumelLine.length" class="isNone">
					暂无数据
				</li>
				<li class="listContent" v-for="data in newestResumelLine" v-else>
					<router-link :to="{path:'/user/per_resume/myResumeDetail',query:{id:data.id}}">
						<div class="left">
							<p class="search_tltle lineBroke" v-text="data.resume_name"></p>
							<p>{{data.resume_sex==1?'男':'女'}}<span>｜</span>{{data.resume_education_name}}</p>
						</div>
						<div class="right">
							<p class="search_tltle lineBroke">{{data.resume_position_name_cs}}<span>|</span>{{data.resume_service_name}}</p>
							<p v-text="data.resume_create_date"></p>
						</div>
					</router-link>
				</li>
			</ul>
			
			<ul class="upRecrit">
				<router-link :to="{path:'/search/searchJobList',query:{data:'-------2'}}">
					<li class="listHeader">
						<i></i><p class="lineBroke">线下招聘</p><span></span>
					</li>
				</router-link>
				<li v-if="!queryRecruitInfoView.length" class="isNone">
					暂无数据
				</li>
				<li class="listContent" v-for="data in queryRecruitInfoView" v-else>
					<router-link :to="{path:'/user/com_recruit/recruitDetail',query:{id:data.id}}">
						<div class="left">
							<p class="search_tltle lineBroke" v-text="data.recruit_title"></p>
							<p v-text="data.company_name_xx" class="lineBroke"></p>
							<p class="lineBroke">{{data.company_nature_name}}<span>|</span>{{data.company_staff_number_name}}<span>|</span>{{data.company_scope}}</p>
						</div>
						<div class="right">
							<p class="search_tltle " v-text="data.salary_name"></p>
							<p v-text="data.workplace_name" class="lineBroke"></p>
							<p v-text="data.recruit_release_date"></p>
						</div>
					</router-link>
				</li>
				
			</ul>
		</div>
		<myFoot :num="0"></myFoot>
	</div>
</template>

<script>
	import { Swipe, SwipeItem,Toast } from 'mint-ui';
	import myFoot from './footer.vue';
	
	export default{
		name:'index',
		data(){
			return{
				conNavData:[{title:'找工作',myclass:'findJob',myLink:'/search/searchJob'},
					{title:'找人才',myclass:'findPeople',myLink:'/search/searchPeople'},
					{title:'招聘会',myclass:'recrit',myLink:'/jobFair/jobFairCenter'},
					{title:'网络招聘',myclass:'internetRecrit',myLink:'/jobFair/internetRecruit'}
				],
				newsShufflingList:[],//banner图
				largeRecruitment:[],//招聘信息
				newestResumelLine:[],//线下求职
				queryRecruitInfoView:[],//线下招聘
				my_search:'',
				areaCode:'',
				areaString:''
			}
		},
		components:{myFoot},
		created(){
			localStorage.removeItem('userCenter');
			localStorage.removeItem('isPerson');
			this.$nextTick(()=>{
				this.myfun.getPositionAddr(this);
				this.changeHeight();
				var that = this;
				$('.searchClass').focus(()=>{
					document.onkeydown=function(event){
			            var e = event || window.event || arguments.callee.caller.arguments[0];
			            if(e && e.keyCode==13){ // enter 键
			                that.mySearch();
			            }
		       		}; 
				})
				$('.searchClass').blur(()=>{
					document.onkeydown = null;
				})
			});
			this.myfun.getAxios({path:'/app/index'},res=>{
				console.log(res);
				res = res.content;
				this.newsShufflingList = res.newsShuffling;
				this.largeRecruitment = res.largeRecruitmentList;
				this.newestResumelLine = res.newestResumelLineList;
				this.queryRecruitInfoView = res.queryRecruitInfoViewList;
				for(let i in this.queryRecruitInfoView){
					this.queryRecruitInfoView[i].company_scope = this.queryRecruitInfoView[i].company_scope?this.myfun.changeString(this.queryRecruitInfoView[i].company_scope):'';
					this.queryRecruitInfoView[i].workplace_name = this.queryRecruitInfoView[i].workplace_name?this.myfun.changeAddr(this.queryRecruitInfoView[i].workplace_name):'';
				}
			});
			
		},
		methods:{
			mySearch(){
				document.onkeydown = null;
				var postString = '-'+this.my_search+'-'+this.areaCode+','+this.areaString+'-----';
				this.$router.push({ path:'/search/searchJobList',query:{data:postString}});
			},
			delSearch(){
				this.my_search = '';
			},
			changeHeight(){
				var windowH = $(window).height();
				window.onresize = function() {
					if(windowH == $(window).height()) {
						$('footer').css('position', 'fixed');
						$('.upRecrit').css('marginBottom','1.33rem');
					} else {
						$('footer').css('position', 'inherit');
						$('.upRecrit').css('marginBottom','0px');
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	#index{
		/*.noneImgBox{background: url(../assets/image/noneImg.png) no-repeat; background-size:100% 100%;}*/
		header{
			.searchBox{height: 60px;float: left;width: 88%;position: relative;margin: 15px 0px;display: block;left:6%;
				input{height: 100%;display: block;width: 100%;border-radius:10px;background: #f1f1f1;border:none;padding: 0 55px;}
				#span(){position: absolute;display: block;background-size:100% 100%;width: 33px;height: 33px;top: 12px;}
				.searchIcon{#span;left: 10px;background-image: url(../assets/image/searchIcon.png);}
				.searchDelete{#span;left: auto;right: 10px;background-image: url(../assets/image/searchDelete.png);}
			}
		}
		.isNone{padding: 30px;font-size: 30px;}
		.indexContainer{height: auto;
			.swipeBox{height: 445px;background: #ccc;width: auto;
				.bannerBox{width: 100%;height: 100%;
					img{width: 100%;}
				}
			}
			
			.conNav{display: flex;padding: 10px 30px;height: 190px;background: #fff;
				li{flex: 1;height: 100%;padding: 0px 20px;
					.imgbox{width: 100px;background-size:100% 100%;height: 100px;margin: 10px auto;}
					.findJob{background-image: url(../assets/image/findJob.png);}
					.findPeople{background-image: url(../assets/image/findPeople.png);}
					.recrit{background-image: url(../assets/image/recrit.png);}
					.internetRecrit{background-image: url(../assets/image/internetRecrit.png);}
					.title{text-align: center;}
					&:active{background: #E1E1E1;}
				}
			}
			#list(){
				height: auto;padding: 0 20px;background: #fff;margin-top: 20px;
				.listHeader{display: flex;height: 90px;border-bottom: 1px solid #E1E1E1;
					i{flex: 0.4;height: 34px;background: #ff6000;margin: 28px 0;border-radius:20px;}
					p{flex: 24.6;padding-left: 10px;text-align: left;line-height: 90px;font-size: 32px;}
					span{background-image: url(../assets/image/linkRight_col.png);flex: 0.8;height: 40px;background-size:100% 100%;margin: 20px 0;}
					&:active{background: #e5e5e5;}
				}
			}
			.upJob{
				#list;padding-bottom:30px;
				li.listContent{height: 140px;width: 100%;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;
					a{display: block;width: 100%;height: 100%;}
					.left,.right{float: left;height: 100%;padding:30px;width: 50%;
						p{text-align: left;height: 40px;line-height: 40px;font-size: 30px;}
						p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;width: 100%;}
					}
					.right{float: right;
						p{color: #898989;text-align: right;}
						p.search_tltle{font-weight: normal;color: #FF6000;margin-bottom: 5px;font-size: 35px;
							span{margin: 0 10px;}
						}
					}
				}
			}
			.upRecrit{#list;padding-bottom:30px;margin-bottom: 100px;
				li.listContent{height: 180px;width: 100%;;background: #fff;margin: 0 auto;margin-top: 30px;box-shadow: 2px 2px 15px #b5b5b5;border-radius:10px;
					.left,.right{float: left;height: 100%;padding:30px;width: 60%;
						p{text-align: left;height: 40px;line-height: 40px;font-size: 30px;width: 100%;
							span{margin: 0 15px;}
						}
						p.search_tltle{font-weight: bold;color: #404040;margin-bottom: 5px;font-size: 35px;}
					}
					.right{float: right;width: 40%;
						p,span{text-align: right;}
						p.search_tltle{font-weight: normal;color: #FF6000;margin-bottom: 5px;font-size: 35px;
							span{margin: 0 10px;}
						}
					}
				}
			}
			.indexList{
				#list;
				li{height: 90px;transition: background-color 0.3s;
					a{
						display: flex;height: 100%;
						p{flex: 25;text-align: left;line-height: 90px;font-size: 28px;padding-left: 20px;}
						span{flex: 0.6;background: url(../assets/image/lineRight.png);height: 30px;background-size:100% 100%;margin: 30px 5px;}
					}
					&:active{background: #e5e5e5;}
				}
				li+li{border-top: 1px solid #E1E1E1;}
			}
		}
	}
</style>