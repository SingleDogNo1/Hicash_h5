import VueRouter from "vue-router";
import Index from "../views/index/index";
import User from "../views/user/user";
const routes = [
{
    path:'/', component:Index
},
{ 
    path:'/user', component:User
}];
const router = new VueRouter({ mode: 'history', routes});
module.exports = router;