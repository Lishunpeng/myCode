import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login/login'
import register from '@/components/login/register'
import forgetPassword from '@/components/login/forgetPassword'
import searchPeopleList from '@/components/search/searchPeopleList'
import searchPeople from '@/components/search/searchPeople'
import com_info from '@/components/search/com_info'
import searchJob from '@/components/search/searchJob'
import searchJobList from '@/components/search/searchJobList'
import jobDetail from '@/components/search/jobDetail'
import userCenter from '@/components/user/userCenter'
import safeCenter from '@/components/user/safeInfo/safeCenter'
import changePsw from '@/components/user/safeInfo/changePsw'
import regPhone from '@/components/user/safeInfo/regPhone'
import editEmail from '@/components/user/safeInfo/editEmail'
import editUserName from '@/components/user/safeInfo/editUserName'
import perInvateCenter from '@/components/user/per_invate/perInvateCenter'
import per_regCenter from '@/components/user/per_registerCom/per_regCenter'
import per_collectCenter from '@/components/user/per_collect/per_collectCenter'
import per_lookMeCenter from '@/components/user/per_lookMe/per_lookMeCenter'
import per_applyCenter from '@/components/user/per_apply/per_applyCenter'
import com_collectCenter from '@/components/user/com_collect/com_collectCenter'
import myResumeDetail from '@/components/user/per_resume/myResumeDetail'
import com_getResumeCenter from '@/components/user/com_getResume/com_getResumeCenter'
import com_recruitCenter from '@/components/user/com_recruit/com_recruitCenter'
import recruitDetail from '@/components/user/com_recruit/recruitDetail'
import recruitCenter from '@/components/user/com_recruit/recruitCenter'
import editResume from '@/components/user/per_resume/editResume'
import resumeCenter from '@/components/user/per_resume/resumeCenter'
import editWork from '@/components/user/per_resume/editWork'
import editEducation from '@/components/user/per_resume/editEducation'
import jobConsultCenter from '@/components/jobConsult/jobConsultCenter'
import newsShow from '@/components/jobConsult/newsShow'
import newsShowIframe from '@/components/jobConsult/newsShowIframe'
import com_recomTalent from '@/components/user/com_recomTalent/com_recomTalent'
import per_recomJob from '@/components/user/per_recomJob/per_recomJob'
import com_infoShow from '@/components/user/com_infoShow/comInfoShow'
import per_infoShow from '@/components/user/per_infoShow/per_infoShow'
import jobFairCenter from '@/components/jobFair/jobFairCenter'
import onlineReserve from '@/components/jobFair/onlineReserve'
import internetRecruit from '@/components/jobFair/internetRecruit'
import internetRecruitDetail from '@/components/jobFair/internetRecruitDetail'
import com_onlineReserve from '@/components/user/com_onlineReserve/com_onlineReserve'
import reserveDetail from '@/components/jobFair/reserveDetail'
import jf_jobRequire from '@/components/jobFair/jf_jobRequire'
import reserve_choosePlace from '@/components/jobFair/reserve_choosePlace'
import editReserve from '@/components/jobFair/editReserve'
import editJobRequire from '@/components/jobFair/editJobRequire'
import jf_comInfoShow from '@/components/jobFair/jf_comInfoShow'
import on_index from '@/components/online/on_index'
import on_msList from '@/components/online/company/on_msList'
import on_msDetail from '@/components/online/company/on_msDetail'
import on_msApply from '@/components/online/company/on_msApply'
import on_apply from '@/components/online/company/on_apply'
import on_applyList from '@/components/online/company/on_applyList'
import on_applyDetail from '@/components/online/company/on_applyDetail'
import on_enterPeople from '@/components/online/company/on_enterPeople'
import on_appointment from '@/components/online/person/on_appointment'
import on_appointList from '@/components/online/person/on_appointList'
import on_appointDetail from '@/components/online/person/on_appointDetail'
import on_comInter from '@/components/online/person/on_comInter'
import on_appointInter from '@/components/online/person/on_appointInter'
import online_wait from '@/components/online/online_wait'
import onlineDetail from '@/components/jobFair/onlineDetail'





import test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    //登录页面
    {
      path: '/login/login',
      name: 'login',
      component: login
    },
    //测试页面
    {
      path: '/test',
      name: 'test',
      component: test
    },
    //注册页面
    {
      path: '/login/register',
      name: 'register',
      component: register
    },
    //忘记密码页面
    {
      path: '/login/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    //找人才列表页面
    {
      path: '/search/searchPeopleList',
      name: 'searchPeopleList',
      component: searchPeopleList
    },
     //找人才页面
    {
      path: '/search/searchPeople',
      name: 'searchPeople',
      component: searchPeople
    },
     //公司信息
    {
      path: '/search/com_info',
      name: 'com_info',
      component: com_info
    },
     //找工作
    {
      path: '/search/searchJob',
      name: 'searchJob',
      component: searchJob
    },
     //找工作列表
    {
      path: '/search/searchJobList',
      name: 'searchJobList',
      component: searchJobList
    },
     //找工作详情
    {
      path: '/search/jobDetail',
      name: 'jobDetail',
      component: jobDetail
    },
    //用户中心
    {
      path: '/user/userCenter',
      name: 'userCenter',
      component: userCenter
    },
    //安全中心
    {
      path: '/user/safeInfo/safeCenter',
      name: 'safeCenter',
      component: safeCenter
    },
    //更改密码
    {
      path: '/user/safeInfo/changePsw',
      name: 'changePsw',
      component: changePsw
    },
    //认证手机号码
    {
      path: '/user/safeInfo/regPhone',
      name: 'regPhone',
      component: regPhone
    },
    //编辑邮箱
    {
      path: '/user/safeInfo/editEmail',
      name: 'editEmail',
      component: editEmail
    },
    //编辑用户名
    {
      path: '/user/safeInfo/editUserName',
      name: 'editUserName',
      component: editUserName
    },
     //面试邀请
    {
      path: '/user/per_invate/perInvateCenter',
      name: 'perInvateCenter',
      component: perInvateCenter
    },
    //企业认证
    {
      path: '/user/per_registerCom/per_regCenter',
      name: 'per_regCenter',
      component: per_regCenter
    },
     //收藏（个人）
    {
      path: '/user/per_collect/per_collectCenter',
      name: 'per_collectCenter',
      component: per_collectCenter
    },
    //谁看过我
    {
      path: '/user/per_lookMe/per_lookMeCenter',
      name: 'per_lookMeCenter',
      component: per_lookMeCenter
    },
     //我的申请
    {
      path: '/user/per_apply/per_applyCenter',
      name: 'per_applyCenter',
      component: per_applyCenter
    },
      //（企业）简历收藏
    {
      path: '/user/com_collect/com_collectCenter',
      name: 'com_collectCenter',
      component: com_collectCenter
    },
       //我的简历
    {
      path: '/user/per_resume/myResumeDetail',
      name: 'myResumeDetail',
      component: myResumeDetail
    },
      //（企业）收到简历
    {
      path: '/user/com_getResume/com_getResumeCenter',
      name: 'com_getResumeCenter',
      component: com_getResumeCenter
    },
      //（企业）发布职位
    {
      path: '/user/com_recruit/com_recruitCenter',
      name: 'com_recruitCenter',
      component: com_recruitCenter
    },
     //（企业）职位中心
    {
      path: '/user/com_recruit/recruitCenter',
      name: 'recruitCenter',
      component: recruitCenter
    },
     //（企业）职位详情
    {
      path: '/user/com_recruit/recruitDetail',
      name: 'recruitDetail',
      component: recruitDetail
    },
      //（个人）简历编辑
    {
      path: '/user/per_resume/editResume',
      name: 'editResume',
      component: editResume
    },
     //简历中心
    {
      path: '/user/per_resume/resumeCenter',
      name: 'resumeCenter',
      component: resumeCenter
    },
    //工作经验编辑
    {
      path: '/user/per_resume/editWork',
      name: 'editWork',
      component: editWork
    },
    //教育经验编辑
    {
      path: '/user/per_resume/editEducation',
      name: 'editEducation',
      component: editEducation
    },
    //就业咨询
    {
      path: '/jobConsult/jobConsultCenter',
      name: 'jobConsultCenter',
      component: jobConsultCenter
    },
    //新闻详情
    {
      path: '/jobConsult/newsShow',
      name: 'newsShow',
      component: newsShow
    },
    //新闻详情
    {
      path: '/jobConsult/newsShowIframe',
      name: 'newsShowIframe',
      component: newsShowIframe
    },
    //推荐人才
    {
      path: '/user/com_recomTalent/com_recomTalent',
      name: 'com_recomTalent',
      component: com_recomTalent
    },
     //推荐职位
    {
      path: '/user/per_recomJob/per_recomJob',
      name: 'per_recomJob',
      component: per_recomJob
    },
     //企业信息
    {
      path: '/user/com_infoShow/comInfoShow',
      name: 'com_infoShow',
      component: com_infoShow
    },
    //个人信息
    {
      path: '/user/per_infoShow/per_infoShow',
      name: 'per_infoShow',
      component: per_infoShow
    },
    //招聘会首页
    {
      path: '/jobFair/jobFairCenter',
      name: 'jobFairCenter',
      component: jobFairCenter
    },
    //招聘会在线预订
    {
      path: '/jobFair/onlineReserve',
      name: 'onlineReserve',
      component: onlineReserve
    },
     //招聘会网络招聘
    {
      path: '/jobFair/internetRecruit',
      name: 'internetRecruit',
      component: internetRecruit
    },
     //招聘会招聘详情
    {
      path: '/jobFair/internetRecruitDetail',
      name: 'internetRecruitDetail',
      component: internetRecruitDetail
    },
     //个人中心在线预订
    {
      path: '/user/com_onlineReserve/com_onlineReserve',
      name: 'com_onlineReserve',
      component: com_onlineReserve
    },
     //招聘会预订详情
    {
      path: '/jobFair/reserveDetail',
      name: 'reserveDetail',
      component: reserveDetail
    },
     //招聘会预订详情中的职位要求
    {
      path: '/jobFair/jf_jobRequire',
      name: 'jf_jobRequire',
      component: jf_jobRequire
    },
    //招聘会在线预订中的展位选择
    {
      path: '/jobFair/reserve_choosePlace',
      name: 'reserve_choosePlace',
      component: reserve_choosePlace
    },
    //招聘会在线预订中的编辑预定
    {
      path: '/jobFair/editReserve',
      name: 'editReserve',
      component: editReserve
    },
    //招聘会在线预订中的编辑职位要求
    {
      path: '/jobFair/editJobRequire',
      name: 'editJobRequire',
      component: editJobRequire
    },
     //招聘会在线预订中的公司信息详情
    {
      path: '/jobFair/jf_comInfoShow',
      name: 'jf_comInfoShow',
      component: jf_comInfoShow
    },
     //在线面试
    {
      path: '/online/on_index',
      name: 'on_index',
      component: on_index
    },
     //面试列表
    {
      path: '/online/company/on_msList',
      name: 'on_msList',
      component: on_msList
    },
     //面试详情
    {											
      path: '/online/company/on_msDetail',
      name: 'on_msDetail',
      component: on_msDetail
    },
     //报名人数
    {											
      path: '/online/company/on_enterPeople',
      name: 'on_enterPeople',
      component: on_enterPeople
    },
    //面试申请
    {											
      path: '/online/company/on_msApply',
      name: 'on_msApply',
      component: on_msApply
    },
    //面试列表
    {											
      path: '/online/company/on_applyList',
      name: 'on_applyList',
      component: on_applyList
    },
    //申请详情
    {											
      path: '/online/company/on_applyDetail',
      name: 'on_applyDetail',
      component: on_applyDetail
    },
     //申请
    {											
      path: '/online/company/on_apply',
      name: 'on_apply',
      component: on_apply
    },
     //面试预约
    {
      path: '/online/person/on_appointment',
      name: 'on_appointment',
      component: on_appointment
    },
    //预约状态
    {
      path: '/online/person/on_appointList',
      name: 'on_appointList',
      component: on_appointList
    },
    //预约详情
    {
      path: '/online/person/on_appointDetail',
      name: 'on_appointDetail',
      component: on_appointDetail
    },
    //企业面试
    {
      path: '/online/person/on_comInter',
      name: 'on_comInter',
      component: on_comInter
    },
    //预约面试
    {
      path: '/online/person/on_appointInter',
      name: 'on_appointInter',
      component: on_appointInter
    },
    //预约面试
    {
      path: '/jobFair/onlineDetail',
      name: 'onlineDetail',
      component: onlineDetail
    },
     //等待面试
    {
      path: '/online/online_wait',
      name: 'online_wait',
      component: online_wait
    },
  ]
})