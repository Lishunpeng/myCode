<template>
	<div id="jobDetail">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			职位详情
		</header>
		<div class="jobHeader">
			<div class="left">
				<div class="title">产品主管</div>
				<div class="text">广东省重创广东省重创广东省重创</div>
				<div class="text">民营<span>｜</span>150人-200人<span>|</span>房地产</div>
			</div>
			<div class="right">
				<span></span>
			</div>
		</div>
		
		<div class="jobContainer">
			<div class="title">职位介绍：</div>
			<ul class="text">
				<li>职业名称：产品主管</li>
				<li>招聘人数：3人</li>
				<li>性别要求：不限</li>
				<li>语言要求：不限</li>
				<li>工资待遇：面议</li>
				<li>户籍要求：不限</li>
				<li>工作年龄：不限</li>
				<li>所属部门：不限</li>
				<li>工作地点：梅州梅县</li>
				<li>发布日期：2018-01-10</li>
				<li>工作性质：全职</li>
				<li>有效日期：2018-01-10</li>
				<li>学历要求：高中以上</li>
			</ul>
		</div>
		
		<div class="jobContainer">
			<div class="title">福利待遇：</div>
			<ul class="list">
				<li>养老保险</li>
				<li>养老保险</li>
				<li>养老保险</li>
				<li>养老保险</li>
				<li>养老保险</li>
				<li>养老保险</li>
				<li>养老保险</li>
				<li>养老保险</li>
				<li>养老保险</li>
				<li>养老保险</li>
			</ul>
		</div>
		
		<div class="jobContainer">
			<div class="title">职位描述：</div>
			<ul class="content">
				
			</ul>
		</div>
		
		<div class="jobContainer" style="margin-bottom: 1.3rem;">
			<div class="title">公司信息：</div>
			<ul class="content">
				
			</ul>
		</div>
		
		<div class="btnBox">
			<button class="btn"><span></span>收藏</button>
			<button class="btn"><span></span>申请</button>
		</div>
		
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	.jobHeader{
		height: 170px;background: #fff;padding: 0 30px;margin-bottom: 30px;display: flex;
		.left{flex:15;
			.title{font-weight: bold;font-size: 35px;height:70px;line-height: 70px;}
			.text{height: 45px;
				span{margin: 0 15px;}
			}
		}
		.right{flex:1;
			span{background: url(../../assets/image/linkRight_col.png);height: 40px;width: 20px;background-size:100% 100%;display:block;margin: 65px auto;}
		}	
	}
	.jobContainer{background: #fff;padding: 0 30px;margin-bottom: 30px;height: auto;
		.title{color: #404040;font-weight: bold;border-bottom: 2px solid #e6e6e6;height: 90px;font-size: 35px;line-height: 90px;}
		ul.text{height: auto;width: 100%;overflow: hidden;
			li{width: 50%;float: left;height: 70px;line-height: 70px;text-align: left;}
		}
		ul.list{height: auto;width: 100%;overflow: hidden;padding-bottom: 30px;
			li{padding: 0 10px;height: 40px;border: 1px solid #FF6000;border-radius:10px;float: left;margin-top: 20px;margin-left:30px;}
			li:nth-child(4n+1){margin-left: 0;}
		}
		ul.content{
			height: auto;width: 100%;padding-bottom: 30px;
			li{width: 100%;height: 40px;line-height: 40px;}
		}
	}
	.btnBox{height: 100px;width: 100%;background: #fff;display: flex;position: fixed;bottom: 0;padding: 0 30px;
		button.btn{display: block;flex: 1;border:1px solid #ff6000;margin: 0;outline: none;font-size:28px;
			span{display: inline-block;height: 28px;width: 30px;background-image:url(../../assets/image/collectBtn.png);background-size:100% 100%;margin-right: 10px;position: relative;top: 2px;}
		}
		button.btn+button.btn{margin-left: 100px;
			span{background-image:url(../../assets/image/applyBtn.png);}
		}
		button.btn:nth-child(1){background: transparent;color: #FF6000;
			&:active{background: #f7b48c;}		
		}
	}
</style>