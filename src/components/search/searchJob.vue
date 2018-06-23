<template>
	<div id="searchJob">
		<header>
				<span class="left" @click="$router.back(-1)"></span>
				找工作
		</header>
		
		<div class="container">
			<div class="searchBox">
				<span>关&nbsp;&nbsp;键&nbsp;&nbsp;字</span>
				<input type="text" placeholder="请输入关键字" v-model="cruxString"/>
			</div>
			<div class="containerBox">
				<span>行业类型</span>
				<select class="positionCategory">
					<option v-text="'不限'" value="" selected="selected"></option>
					<option v-for="data in positionCategoryList" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="containerBox">
				<span>职位类型</span>
				<select class="jobType">
					<option v-text="'不限'" value="" selected="selected"></option>
					<option value="1">线上招聘</option>
					<option value="2">线下招聘</option>
				</select>
			</div>
			<div class="containerBox">
				<span>学历要求</span>
				<select class="employEducation">
					<option v-text="'不限'" value="" selected="selected"></option>
					<option v-for="data in employEducationList" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="containerBox">
				<span>职业月薪</span>
				<select class="salary">
					<option v-text="'不限'" value="" selected="selected"></option>
					<option v-for="data in salaryList" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="containerBox">
				<span>意向地区</span>
				<mt-picker :slots="myAddress" @change="onMyAddressChange" valueKey="address"></mt-picker>
				<input placeholder="请点击选择地址" type="text" readonly="readonly" @click="myshow('#myArea')" v-model="areaString" id="myArea">
			</div>
			<div class="searchBox">
				<span>地区范围</span>
				<div class="btnBox">
					<button @click="reset_all">重置</button>
					<button @click="reset_city">重置市</button>
					<button @click="reset_area">重置区</button>
				</div>
			</div>
			<div class="containerBox">
				<span>工作性质</span>
				<select class="workingForm">
					<option v-text="'不限'" value="" selected="selected"></option>
					<option v-for="data in workingFormList" v-text="data.dictionary_name" :value="data.id"></option>
				</select>
			</div>
			<div class="btn" @click="search">
				搜索
			</div>
			<!--<div class="searchHis">
				<span class="left"><i></i>近期搜索</span>
				<span class="right"><i></i>清空</span>
			</div>
			<div class="searchHis linkList">
				<span class="left">产品经理+梅州</span>
				<span class="right"><i></i></span>
			</div>-->
		</div>
		
	</div>
</template>

<script>
	import { Picker,MessageBox } from 'mint-ui';
	export default{
		name:'searchJob',
		data(){
			return{
				areaCode:'',//获取的代码值
				cruxString:'',//关键字
				areaString:'',
				employEducationList:[],//学历数据
				salaryList:[],//职业月薪
				workingFormList:[],//工作性质
				positionCategoryList:[],//职业类型
				myAddress:'',//地址数据
				showRange:false
			}
		},
		created(){
			this.myAddress = this.myfun.areaFun();
			this.$nextTick(() => {
				//使用定位
				this.myfun.beginAddr(this);
				var that = this;
	        	//点击去除盒子
	        	$('.picker').on('click',function(){
	        		that.myfun.removeArea(this);
	        	});
	    	});
	    	this.myfun.getAxios({path:'/app/jobHunting'},res=>{
				var res = res.content;
				console.log(res);
				this.employEducationList = res.employEducationList;
				this.salaryList = res.salaryList;
				this.workingFormList = res.workingFormList;
				this.positionCategoryList = res.positionCategoryList;
			})
		},
		methods:{
			onMyAddressChange(picker, values) {
				/*返回数据*/
				var myAttr = this.myfun.myChange_mint(picker,values);
				if(myAttr){
					this.areaString = myAttr._address;
					this.areaCode = myAttr._code;
				}
			},
			//显示地址
			myshow(id){
				this.myfun.showArea(id);
			},
			//搜索
			search(){
				var positionCategoryData = $('.positionCategory').find('option:selected').val();//行业类型
				var employEducationData = $('.employEducation').find('option:selected').val();//学历要求
				var salaryData = $('.salary').find('option:selected').val();//职业月薪
				var workingFormData = $('.workingForm').find('option:selected').val();//工作性质
				var jobTypeData = $('.jobType').find('option:selected').val();//职位类型
				var searchName = this.areaCode?this.areaCode+','+this.areaString:'';
				var postString = '-'+this.cruxString+'-'+searchName+'-'+positionCategoryData+'-'+workingFormData+'-'+salaryData+'-'+employEducationData+'-'+jobTypeData;
				console.log(postString);
				this.$router.push({ path:'/search/searchJobList',query:{data:postString}});
			},
			//重置
			reset_all(){
				this.areaString = '';
				this.areaCode = '';
			},
			//重置市
			reset_city(){
				this.areaCode = this.areaCode.toString().substr(0,2) + '0000';
				var areaStringArray = this.areaString.split(',');
				this.areaString = areaStringArray[0];
			},
			//重置区
			reset_area(){
				this.areaCode = this.areaCode.toString().substr(0,4) + '00';
				var areaStringArray = this.areaString.split(',');
				areaStringArray[1]?this.areaString = areaStringArray[0]+','+areaStringArray[1]:'';
			},
			
		}
	}
</script>

<style lang="less" scoped="scoped">
	.searchBox,.containerBox{height: 90px;background: #fff;margin: 20px 0;display: flex;padding: 0 20px;
		span{height: 100%;display: block;flex: 2;line-height:90px;}
		input[type=text],select,.ageBox,.btnBox{flex: 7;display: block;border: none;}
		select{outline: none;margin-bottom: 2px;}
		.ageBox{
			input{display:block;float: left;width: 220px;border-color:#ccc;height: 60px;margin: 15px 10px;padding: 0 10px;border-width:1px;border-radius:10px ;}
			span{display:block;float: left;height: 100%;line-height: 90px;}

		}
		.btnBox{display: flex;
			button{flex: 1;border: 2px solid #FF6000;background: #F7B48C;color: #F1F1F1;height: 60px;margin-top: 15px;
				&:active{background: #FF6000;color: #fff;}
			}
			button+button{margin-left: 20px;}
		}
		/*&:active{background: #E1E1E1;}*/
	}
	.containerBox{margin: 0!important;border-bottom: 2px solid #E1E1E1;}
	.searchHis{height: 90px;background: #fff;padding: 0 20px;
		.left,.right{float: left;display:block;line-height:90px;height:100%;width:auto;
			i{background: url(../../assets/image/searchHis.png);background-size:100% 100%;height: 50px;width: 50px;display: inline-block;position: relative;top: 10px;margin: 0 10px;}
		}
		.right{float: right;color: #217EC3;
			i{background-image: url(../../assets/image/removeAll.png);}
		}
	}
	.linkList .right i{background-image: url(../../assets/image/lineRight.png);width: 20px;height: 40px;}
</style>