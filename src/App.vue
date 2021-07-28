// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
// %            ROOT COMPONENT: App             % 
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 

// # COMPONENT BODY # 
<template>
	<div id="app">
		<!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
		<header>
			<h1>Tic Tac Toe</h1>
			<span class="txt_1">«Whenever you fight you lose»</span>
		</header>
		<main>
			<Game />
		</main>
		<footer>
			<div class="txt_1">by Salvatore Trimarchi</div>
		</footer>
	</div>
</template>

// # SOCKETS & PLUGS # 
<script>

// * component socket: Game * //
import Game from "./components/Game.vue";

// * component plug: App * //
export default {
	name: "App",
	components: {
		Game,
	},
};

</script>

// # STYLE MANAGEMENT # 
<style lang="scss">

// * MAIN STYLE * //
@import "./assets/scss/app.scss"; 

</style>
