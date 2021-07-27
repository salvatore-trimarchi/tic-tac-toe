// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
// %                  MAIN JS                   % 
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 

// # FRAMEWORK summons # 
import Vue from "vue";

// # ROOT COMPONENT (id="app") summons # 
import App from "./App.vue";

// # FRAMEWORK SETTINGS # 
Vue.config.productionTip = false;

// # FRAMEWORK & ROOT COMPONENT activation # 
new Vue({
  render: (h) => h(App),
}).$mount("#app");

/*
|-------------------------------------------------------------------------------------------|
|																							|
| 	main.js	{import}	<---	Vue															|
|			{import}	<---	{export} App.vue {import}	<---	{export} Game.vue		|
|																							|
|-------------------------------------------------------------------------------------------|
*/