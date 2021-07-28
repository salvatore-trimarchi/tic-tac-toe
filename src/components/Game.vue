// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 
// %               COMPONENT: Game              % 
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% 

// # COMPONENT BODY # 
<template>
	<div class="container">

		<div v-if="!isGameOn" @click="startGame" class="btn">Game Start</div>

		<div v-if="isGameOn" class="game_box">

			<div class="game_head">
				<div class="txt_2">
					<span>Next Move Player:</span>
					<div v-if="!isGameOver" class="next_move">
						<span v-if="activePlayer == 'X'"><i class="fas fa-times"></i></span>
						<span v-else><i class="far fa-circle"></i></span>
					</div>
					<div v-else class="next_move">-</div>
				</div>
				<div @click="restartGame" class="btn">Restart Game</div>
			</div>
			
			<div class="game_field card">
				<div class="grid_box">
					<div v-for="cell in cells" :key="cell" @click="clickCell(cell)" class="grid_cell" :class="isGameOver ? getWinClass(cell) : ''">
						<div v-if="isCellPlayed(cell,playedByXCells)"><i class="fas fa-times"></i></div>
						<div v-if="isCellPlayed(cell,playedByOCells)"><i class="far fa-circle"></i></div>
					</div>
				</div>
				<div v-if="isGameOver" class="game_status txt_2">
					<div class="txt_3"> 
						<span v-if="winner =='X'">Player <i class="fas fa-times"></i> wins!</span>
						<span v-if="winner =='O'">Player <i class="far fa-circle"></i> wins!</span>
						<span v-if="winner ==''" >No one wins!</span>
					</div>
					<div>
						<div>Total score</div>
						<div>Player <i class="fas fa-times"></i>  : {{score.X}}</div>
						<div>Player <i class="far fa-circle"></i> : {{score.O}}</div>
					</div>
				</div>
			</div>

		</div>

	</div>
</template>

// # SOCKETS & PLUGS # 
<script>

// * component socket: ... * //
// ...

// * component plug: Game * //
export default {
	name: "Game",
	data() {
		return {
			isGameOn		: false,
			isGameOver		: false,
			score			: {X:0,O:0},
			winner			: '',
			cells			: [1,2,3,4,5,6,7,8,9],
			playedCells		: [],
			playedByXCells	: [],
			playedByOCells	: [],
			activePlayer	: 'X',
			winSet			: [],
			winCellSets		: [
				[1,2,3],[4,5,6],[7,8,9],
				[1,4,7],[2,5,8],[3,6,9],
				[1,5,9],[3,5,7]
			],
		}
	},
	methods: {
		startGame() {
			this.isGameOn = true;
		},
		restartGame() {
			this.playedCells	= [];
			this.playedByXCells = [];
			this.playedByOCells = [];
			this.winSet			= [];
			this.winner			= '';
			this.activePlayer	= 'X';
			this.isGameOver 	= false;	
		},
		clickCell(cell) {
			if (!this.isGameOver && !this.playedCells.includes(cell)) {
				this.playedCells.push(cell);
				let playerCells;
				if (this.activePlayer == 'X') {
					this.playedByXCells.push(cell);
					playerCells = this.playedByXCells;
				} else {
					this.playedByOCells.push(cell);
					playerCells = this.playedByOCells;
				}
				if (this.isWinSet(playerCells)) 
					this.setWinner(this.activePlayer);
				else if (this.playedCells.length == this.cells.length) 
					this.setWinner('');
				this.activePlayer = (this.activePlayer == 'X') ? 'O' : 'X';
			}
		},
		isCellPlayed(cell,cellSet) {
			if (cellSet.includes(cell)) 
				return true;
			else 
				return false; 
		},
		isWinSet(playedSet) {
			let ret = false;
			if (playedSet.length >= 3) {
				this.winCellSets.forEach(winSet => {
					const matchSet = winSet.filter(winEl => playedSet.includes(winEl));
					if (matchSet.length == 3) {
						this.winSet = matchSet;
						ret = true;
						// return true;
					}
				});
			}
			return ret;
			// return false;
		},
		setWinner(winner) {
			this.isGameOver = true;
			if (winner) {
				this.score[winner]++;
				this.winner = winner;
			}
		},
		getWinClass(cell) {
			if (this.winSet.includes(cell))
				return 'win_class';
			else
				return '';
		}
	}
};
</script>
