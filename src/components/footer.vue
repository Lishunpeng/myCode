<template>
		<footer>
			<li v-for="data in footData">
				<router-link :to="data.linkTo">
					<div :class="['imgbox',data.myClass,data.isClick?'cur':'']"></div>
					<div :class="['title',data.isClick?'cur':'']" v-text="data.name"></div>
				</router-link>
			</li>
		</footer>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default{
		props:['num'],
		data(){
			return{
				footData:[],
				myNumber:this.num
			}
		},
		created(){
			isNeedBack = false;
			this.footData =	this.myfun.getFootData(this.myNumber);
			/*this.$nextTick(()=>{
				$('.onlineView').on('click',(e)=>{
//					location.href = './static/videoInterview.html';
					return;
				})
			})*/
		}
	}
</script>

<style>
</style>