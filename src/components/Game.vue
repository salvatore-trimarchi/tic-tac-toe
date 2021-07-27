// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
// %               COMPONENT: Game              % 
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 

// # COMPONENT BODY # 
<template>
	<div class="hello">
		<!-- <h1>{{ msg }}</h1> -->
		<div class="game_field card">
			<div v-if="!isGameOn" class="start_layer">
				<div class="shadow"></div>
				<a @click="startGame" class="btn btn_start">Game Start</a>
			</div>
		</div>
		<div v-if="isGameOn" @click="restartGame" class="btn btn_restart">Restart Game</div>
	</div>
</template>

// # SOCKETS & PLUGS # 
<script>

// * component socket: ... * //
// ...

// * component plug: HelloWorld * //
export default {
	name: "Game",
	props: {
		msg: String,
	},
	data() {
		return {
			isGameOn: false,
		}
	},
	methods: {
		startGame() {
			console.log('start game');
			this.isGameOn = true;
		},
		restartGame() {
			console.log('restart game');
		},

	},
	created() {
		console.log('app created');
		
	},
	mounted() {
		console.log('app mounted');
	},
};
</script>

// # SCOPED STYLE MANAGEMENT # 
<style scoped lang="scss">
	//
</style>
