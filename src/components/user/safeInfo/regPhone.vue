<template>
	<div id="regPhone">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			修改手机号码
			<span class="right" @click="save">保存</span>
		</header>
		
		<div class="msg">
			<div class="inputBox"><span>新手机号：</span><input type="text" placeholder="请输入手机号码" v-model="resPhone"/></div>
			<div class="inputBox emailBox"><span>短信验证：</span><input type="password" placeholder="请输入短信认证码"  v-model="verCode"/>
				<span :class="['btn',isverClick?'btn_click':'']" @click="sendPhone">发送</span>
			</div>
			<p>修改手机号码后需要用新的手机号码登录</p>
		</div>
		
	</div>
</template>

<script>
	import { MessageBox} from 'mint-ui';
	export default { 
  		name: 'regPhone',
  		data(){
  			return{
  				isverClick:false,
  				resPhone:"",//手机号
  				verCode:""//验证码
  			}
  		},
 		methods: {
// 			保存
 			save(){
 				if(!this.resPhone || !this.verCode){
 					return	MessageBox('提示','信息不能为空！');
 				}
 				if(!this.$phone.test(this.resPhone)){
 					return	MessageBox('提示','手机格式不正确！');
 				}
 				var postData = {
 					phone:this.resPhone,
 					phoneVerificationCode:this.verCode
 				}
 				this.myfun.postAxios({path:'/app/safeCenterSave'},postData,res=>{
 					return	MessageBox('提示',res.msg).then(()=>{
 						this.$router.back(-1);
 					});
 				})
 			},
// 			发送
 			sendPhone(){
 				if(!this.resPhone){
 					return	MessageBox('提示','信息不能为空！');
 				}
 				if(!this.$phone.test(this.resPhone)){
 					return	MessageBox('提示','手机格式不正确！');
 				}
 				var myobj = {path:'/app/getVerificationCode/'+this.resPhone,isVer:true};
				this.myfun.send_verifi(this,myobj);
 			}
		}
}
</script>

<style lang="less" scoped="scoped">
#regPhone{
        @color:#ff6000;
       
        .msg{
            .inputBox{
                padding:0 10px 0 30px;
                border-bottom: 2px solid #e1e1e1;
                height: 90px;
                width: 100%;
                display: flex;
                span{flex: 3;line-height: 90px;}
                input{border: none;flex: 8;padding: 0 10px;margin-bottom: 2px;}
            }
            .emailBox{
            	input{flex: 6;}
            	.btn{flex: 2;margin: 10px 0;height: 70px;line-height: 70px;}
            }
            p{font-size: 20px;color: #898989;padding: 20px 30px;}
            margin-top: 30px;
            background:#fff;
        }  
    }
</style>