<template>
	<div id="newsShow">
		<header>
			<span class="left" @click="$router.back(-1)"></span> 详情
		</header>
		<div class="container">
			<div class="titleBox">
				<div class="title" v-text="newsData.news_title"></div>
				<div class="time" v-text="newsData.news_publish_time"></div>
			</div>
			<div class="content newsShowContent" v-html="newsData.news_content"></div>
			<div>附件下载：</div>
			<a v-for="data in attachmentInfo" v-text="data.attachment_name" :href="$ips+'/downloadData?filePath='+data.attachment_path+'&fileName='+data.attachment_name"></a>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'newsShow',
		data() {
			return {
				getId: '',
				newsData: '',
				attachmentInfo: []
			}
		},
		created() {
//			this.destroy();
			isNeedBack = true;
			this.getId = this.$route.query.id;
//			console.log(goToHtml,'api');
			this.myfun.getAxios({
				path: '/app/huntingNewsShow/' + this.getId
			}, res => {
				this.newsData = res.content.newsView;
				this.attachmentInfo = res.content.attachmentInfoList;
				this.$nextTick(()=>{
					this.changeA();
				})
			});
		},
		methods: {
			changeA() {
				var that = this;
				$('.newsShowContent').find('a').on('click', function(e){
					var $href =$(this).attr('href');
					localStorage.myPath = $href;
					location.href = './static/outside.html';
//					that.$router.push({path:'newsShowIframe',query:{href:$href}});
					if(e && e.preventDefault) {
						e.preventDefault();
					} else {
						window.event.returnValue = false;
					}
					return false;
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.container {
		padding: 20px;
		background: #fff;
		.titleBox {
			height: auto;
			border-bottom: 1px solid #e1e1e1;
			padding-bottom: 5px;
			.title {
				font-size: 40px;
				line-height: 50px;
				letter-spacing: 5px;
				color: #404040;
				font-weight: bold;
				min-height: 50px;
			}
			.time {
				text-align: right;
				color: #898989;
				font-size: 25px;
			}
		}
		.content {
			margin-top: 20px;
		}
		a {
			margin-left: 20px;
		}
	}
</style>