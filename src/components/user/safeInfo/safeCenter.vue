<template>
	<div id="login">
		<header>
			<span class="left" @click="$router.back(-1)"></span>
			安全中心
		</header>
		
		<div class="msg">
			<router-link :to="{path:'/user/safeInfo/editUserName',query:{attr:safeData.substation_name}}">
				<div class="inputBox"><span>用户名称：</span>
					<p v-text="(safeData.substation_name==''||safeData.substation_name==null)?'不详':safeData.substation_name"></p><i></i>
				</div>
			</router-link>	
			<router-link :to="{path:'/user/safeInfo/editEmail',query:{attr:safeData.substation_email}}"><div class="inputBox"><span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
				<p v-text="(safeData.substation_email==''||safeData.substation_email==null)?'未绑定':'已绑定'"></p>
				<i></i></div></router-link>
			<router-link :to="{path:'/user/safeInfo/regPhone',query:{attr:safeData.substation_phone}}"><div class="inputBox"><span>手机号码：</span><p v-text="safeData.substation_phone"></p><i></i></div></router-link>
			<router-link to='/user/safeInfo/changePsw'><div class="inputBox"><span>更改密码：</span><p></p><i></i></div></router-link>
		</div>
		
		<div class="btn" @click="loginOut">
			退出登录
		</div>
	</div>
</template>

<script>
	import { MessageBox,Toast } from 'mint-ui';
	export default { 
  		name: 'login',
  		data(){
  			return{
  				safeData:{}
  			}
  		},
  		created(){
  			this.myfun.getAxios({path:'/app/safeCenter'},res=>{
  				this.safeData = res.content.substationLogin;
  				console.log(this.safeData)
  			});
  		},
 		methods: {
 			loginOut(){
 				this.myfun.getAxios({path:'/app/logOut'},res=>{
 					console.log(res);
 					localStorage.removeItem('code_ap');
 					return MessageBox('提示','退出登录！点击确定重新返回登录页面！').then(()=>{
 						this.$router.push({path:'/login/login'});
 					})
 				});
 			}
		}
	}
</script>

<style lang="less" scoped="scoped">
#login{
        @color:#ff6000;
        /*msg*/
        .msg{
            .inputBox{
            	border-bottom: 1px solid #e1e1e1;
                padding-left:30px;
                height: 90px;
                width: 100%;
                display: flex;
                span{flex: 10;line-height: 90px;}
				p{flex: 26;text-align: right;height: 100%;line-height: 90px;color: #898989;}
				i{display: block;flex: 1;background: url(../../../assets/image/linkRight_col.png);background-size:100% 100%;height: 40px;margin:25px 15px;}
            }
            margin-top: 30px;
            background:#fff;
        } 
    }
</style>