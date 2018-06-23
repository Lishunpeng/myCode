<template>  
  <div id="app">  
    <mt-picker :slots="slots" @change="onValuesChange" ></mt-picker>   
    <input placeholder="请点击选择地址" type="text" readonly="readonly" @click="myshow('#myArea')" v-model="areaString" id="myArea">
    <router-view></router-view>  
  </div>  
</template>  
  
<script>  
  
export default {  
  name: 'app',  
  data () {  
    return {  
        slots:  
	        [  
		        {  
		          flex: 1,  
		          values: ['年假', '事假', '病假', '婚假', '其他'],  
		          className: 'slot1',  
		          textAlign: 'left'  
		        }, {  
		          divider: true,  
		          content: '-',  
		          className: 'slot2'  
		        }, {  
		          flex: 1,  
		          values: ['2015-11', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],  
		          className: 'slot3',  
		          textAlign: 'right'  
		        }  
	      	],
	    areaString:''
    }  
  },  
  created(){  
  		this.$nextTick(() => {
				//使用定位
//				this.myfun.beginAddr(this);
				var that = this;
	        	//点击去除盒子
	        	$('.picker').on('click',function(){
	        		that.myfun.removeArea(this);
	        	});
	    	});
  },  
  methods: {  
        onValuesChange(picker, values) {  
            this.areaString = values[0]+values[1];
   		},
   		//显示地址
		myshow(id){
			this.myfun.showArea(id);
		},
  }  
}  
</script>  
  
<style>  
  
</style>  