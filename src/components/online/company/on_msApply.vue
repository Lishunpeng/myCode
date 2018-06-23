<template>
	<div id="on_msApply">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			面试申请
		</header>
		<div class="container">
			<ul>
				<li>
					<router-link :to="{path:'on_applyList',query:{state:2}}">
						<span class="success"></span>申请成功<i class="right"></i>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'on_applyList',query:{state:0}}">
						<span class="fail"></span>申请失败<i class="right"></i>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'on_applyList',query:{state:1}}">
						<span class="appointing"></span>申请中...<i class="right"></i>
					</router-link>
				</li>
			</ul>
			<router-link to="on_apply">
				<div class="btn">申请</div>
			</router-link>
		</div>
	</div>
</template>

<script>
</script>
<style lang="less" scoped="scoped">
	.container{
		.btn{width: 100%;position: fixed;margin: 0;left: 0;bottom: 0;top: auto;border-radius:0 ;}
		ul{height: auto;background: #fff;
			li{width: 100%;height: 90px;padding:0 30px;border-bottom: 2px solid #e1e1e1;line-height: 90px;transition: background-color 0.3s linear;
				a{display: block;height: 100%;width: 100%;}
				span{top: 8px;position: relative;display: inline-block;width: 40px;height: 40px;background: center no-repeat;background-size:100% 100%;margin-right: 15px;}
				i{background:url(../../../assets/image/linkRight_col.png) center no-repeat;background-size:100% 100%;display: block;width: 20px;height: 40px;float: right;margin-top: 25px;}
				span.success{background-image: url(../../../assets/image/on_yySuccess.png);}
				span.fail{background-image: url(../../../assets/image/on_yyFail.png);}
				span.appointing{background-image: url(../../../assets/image/on_appointing.png);}
				&:active{background: #e1e1e1;}
			}
		}
	}
</style>