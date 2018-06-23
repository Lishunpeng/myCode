<template>
	<div id="editEmail">
		<header>
			<span class="left"  @click="$router.back(-1)"></span>
			绑定邮箱
			<span class="right" @click="save">保存</span>
		</header>
		
		<div class="msg">
			<div class="inputBox"><span>绑定邮箱：</span><input type="text" placeholder="请输入编辑邮箱" v-model="editEmail"/></div>
				<div class="inputBox emailBox"><span>邮箱认证：</span><input type="text" placeholder="请输入认证码"  v-model="verCode"/>
				<span :class="['btn',isverClick?'btn_click':'']" @click="sendEmail">发送</span>
			</div>
			<p>修改邮箱后需使用新邮箱号登录</p>
		</div>
		
	</div>
</template>

<script>
	import { MessageBox, Toast } from 'mint-ui';
	export default { 
  		name: 'login',
  		data(){
  			return{
  				isverClick:false,
  				editEmail:"",//邮箱
  				verCode:""//验证码
  			}
  		},
 		methods: {
// 			保存
 			save(){
 				if(!this.editEmail || !this.verCode){
 					return	MessageBox('提示','信息不能为空！');
 				}
 				if(!this.$email.test(this.editEmail)){
 					return	MessageBox('提示','邮箱格式不正确！');
 				}
 				let postData = {
 					email:this.editEmail,
 					verificationCode:this.verCode
 				}
 				this.myfun.postAxios({path:'/app/safeCenterSave'},postData,res=>{
 					return	MessageBox('提示',res.msg);
 				});
 			},
// 			发送
 			sendEmail(){
 				if(!this.editEmail){
 					return	MessageBox('提示','信息不能为空！');
 				}
 				if(!this.$email.test(this.editEmail)){
 					return	MessageBox('提示','邮箱格式不正确！');
 				}
 				var myobj = {path:'/app/safeCenterEmailMsg?email='+this.editEmail,isVer:true,getMethod:true};
				this.myfun.send_verifi(this,myobj);
 			}
		}
}
</script>

<style lang="less" scoped="scoped">
#editEmail{
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