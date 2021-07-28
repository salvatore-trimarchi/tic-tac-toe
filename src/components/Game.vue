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
					<div v-if="!isGameOver" class="next_move_notice">
						<span v-if="activePlayer == 'X'"><i class="fas fa-times"></i></span>
						<span v-else><i class="far fa-circle"></i></span>
					</div>
					<div v-else class="next_move_notice">-</div>
				</div>
				<div @click="undoMove" class="btn" :class="(playedCells.length > 0) ? '' : 'inactive'">Undo Move</div>
				<div @click="restartGame" class="btn" :class="(playedCells.length > 0) ? '' : 'inactive'">Restart Game</div>
			</div>
			
			<div class="game_field card">
				<div class="grid_box">
					<div class="grid_cell"
						v-for="cell in cells" :key="cell" 
						:class="isGameOver ? getWinPlayedCellClass(cell) : (isCellPlayed(cell,playedCells) ? '' : 'active')"
						@click="clickCell(cell)">
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
					<div class="score">
						<div>Total score</div>
						<div><span>Player</span><span><i class="fas fa-times" ></i></span><span>{{score.X}}</span></div>
						<div><span>Player</span><span><i class="far fa-circle"></i></span><span>{{score.O}}</span></div>
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
			// dynamics
			isGameOn		: false,				// game activated
			isGameOver		: false,				// game ended by win or draw
			// players
			activePlayer	: 'X',					// next move player X or O (X always moves first)
			winner			: '',					// winner player: X or O or empty (draw)  
			score			: {X:0, O:0},			// score for player X and O
			// cells
			cells			: [1,2,3,4,5,6,7,8,9],	// base grid cell ids
			playedCells		: [],					// list of all played cell ids
			playedByXCells	: [],					// list of cell ids played by X 
			playedByOCells	: [],					// list of cell ids played by O
			winPlayedCells	: [], 					// list of winning played cell ids
			winCellSets		: [						// list of all possible sets of winning cell ids 
				[1,2,3],[4,5,6],[7,8,9],
				[1,4,7],[2,5,8],[3,6,9],
				[1,5,9],[3,5,7]
			]
		}
	},
	methods: {
		startGame() {
			this.isGameOn = true;
		},
		restartGame() {
			if (this.playedCells.length > 0) {
				this.isGameOver 	= false;	
				this.activePlayer	= 'X';
				this.winner			= '';
				this.playedCells	= [];
				this.playedByXCells = [];
				this.playedByOCells = [];
				this.winPlayedCells	= [];
			}
		},
		clickCell(cell) {
			if (!this.isGameOver && !this.playedCells.includes(cell)) {
				// collecting played cell ids
				this.playedCells.push(cell);
				let playerCells;
				if (this.activePlayer == 'X') {
					this.playedByXCells.push(cell);
					playerCells = this.playedByXCells;
				} else {
					this.playedByOCells.push(cell);
					playerCells = this.playedByOCells;
				}
				// check: winner set of cell ids
				if (this.isWinSet(playerCells))
					this.setWinner(this.activePlayer);
				// check: no more unused cells left without winner
				else if (this.playedCells.length == this.cells.length)
					this.setWinner('');
				// chnge turn (in any case)
				this.switchPlayer();
			}
		},
		isCellPlayed(cell,cellSet) {
			if (cellSet.includes(cell)) 
				return true;
			else 
				return false; 
		},
		switchPlayer() {
			this.activePlayer = (this.activePlayer == 'X') ? 'O' : 'X';
		},
		isWinSet(playedSet) {
			let ret = false;
			if (playedSet.length >= 3) {
				this.winCellSets.forEach(winSet => {
					let matchSet = winSet.filter(winEl => playedSet.includes(winEl));
					if (matchSet.length == 3) {
						// collecting all winning played cell ids
						this.winPlayedCells = this.winPlayedCells.concat(matchSet);
						ret = true;
						// return true; // why doesn't it work this way?
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
		getWinPlayedCellClass(cell) {
				if (this.winPlayedCells.includes(cell))
					return 'win_class';
				else
					return '';
		},
		undoMove() {
			if (this.playedCells.length > 0) {
				if (this.isGameOver) { 
					this.score[this.winner]--;
					this.winner = '';
					this.isGameOver = false;
				}
				this.switchPlayer();
				this.playedCells.splice(-1,1);
				this.winPlayedCells.splice(-1,1);
				if (this.activePlayer == 'X')
					this.playedByXCells.splice(-1,1);
				else
					this.playedByOCells.splice(-1,1);
			}
		},
	}
};
</script>
