<script>

import WINE_LIST from '../_data/wines.json';
import {SHIPPING_PER_BOTTLE, BOTTLES_PER_BOX, MAX_BOXES} from '../_data/const.js'

export let itemBoxes = 0;
export let itemBottlePrize;
export let itemPrize = 0;
export let itemName;
export let itemType;
export let itemBottles = 0;

let wines = WINE_LIST;

function decrease(i) {
	itemBoxes -= 1;
	itemBottles -= 6;
	updatePrize(i);
}

function increase(i) {
	itemBoxes += 1;
	itemBottles += 6;
	updatePrize(i);
}

function updatePrize(i) {
	itemPrize = (itemBottlePrize + SHIPPING_PER_BOTTLE) * itemBottles;
	console.log(winesGV[i]);
}

</script>

<div class="table__row">
	<div class="table__row__name">
		{itemName.replace(/ GV$| RV$| R$| CH$/g, '')}
	</div>
	<div class="table__row__bottle">
		{(itemBottlePrize + SHIPPING_PER_BOTTLE).toFixed(2)}
		<span>€</span>
	</div>
	<div class="table__row__boxes">
		<button
			class="button -small -left"
			type="button"
			disabled={itemBottles < 1}
			on:click={() => { decrease(i)}}>-</button>
		<div class="table__row__boxes__count">{itemBottles}</div>
		<button
			class="button -small -right"
			type="button"
			disabled={itemBoxes >= MAX_BOXES}
			on:click={() => { increase(i)}}>+</button>
	</div>
	<div class="table__row__prize">
		{itemPrize ? itemPrize.toFixed(2) : itemPrize}
	</div>


	<div class="table__inputs">
	<input
		type="number"
		bind:value={itemBoxes}
		class="input"
		name="{itemName}"
		readonly
		hidden />
	<input
		type="number"
		bind:value={itemPrize}
		class="input"
		name="{itemName} {itemPrize}"
		readonly
		hidden />
	</div>
</div>
