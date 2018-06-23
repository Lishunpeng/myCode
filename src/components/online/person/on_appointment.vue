<template>
	<div id="on_appointment">
		<header><span class="left" @click="$router.back(-1)"></span>我的预约</header>
		<div class="container">
			<ul>
				<li>
					<router-link :to="{path:'on_appointList',query:{state:'3,5,6'}}">
						<span class="success"></span>预约成功<i class="right"></i>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'on_appointList',query:{state:'1,2'}}">
						<span class="appointing"></span>预约中...<i class="right"></i>
					</router-link>
				</li>
				<li>
					<router-link :to="{path:'on_appointList',query:{state:'4'}}">
						<span class="fail"></span>预约失败<i class="right"></i>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
</script>

<style lang="less" scoped="scoped">
	.container{
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