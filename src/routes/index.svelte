<script>

import { onMount } from 'svelte';
import WINE_LIST from '../_data/wines.json';
import { SHIPPING_PER_BOTTLE, BOTTLES_PER_BOX, MAX_BOXES } from '../_data/const.js'
import Row from '../components/row.svelte';

let wines = WINE_LIST;
let step = 'wines';
let userEmailValid;
let userNameValid;
let userName;
let userEmail;
let orderItem;

let itemBoxes = 0;
let itemBottlePrize;
let itemPrize = 0;
let itemName;
let itemType;
let itemBottles = 0;

$: winesGV = wines.filter(item => item.itemType === 'GV');
$: winesRV = wines.filter(item => item.itemType === 'RV');
$: winesR = wines.filter(item => item.itemType === 'R');
$: winesCH = wines.filter(item => item.itemType === 'CH');

$: prizeGV = winesGV.reduce(function(sum, current) {
	return sum + current.itemBottlePrize * current.itemBottles;
}, 0);

function confirmBottles() {
	step = 'name';
}

function confirmName() {
	step = 'summary';
}

function backToBottles() {
	step = 'wines';
}

function backToName() {
	step = 'name';
}

function validateUserName() {
	if ( userName !== '' ) {
		userNameValid = true;
	} else {
		userNameValid = false;
	}
}

function validateUserEmail() {
	if ( userEmail.match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ) ) {
		userEmailValid = true;
	} else {
		userEmailValid = false;
	}
}

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

onMount( () => {
	wines = wines.sort((a, b) => a.itemType - b.itemType);
	console.log(wines.sort((a, b) => a.itemType - b.itemType));
});

</script>

<svelte:head>
	<title>Cenik</title>
	<meta name="description" content="Cenik vin" />
</svelte:head>

<form name="order" method="post" data-netlify="true" action="/success" class="frm">

	<div class="frm_step" class:-visible={step === 'wines'}>

		<div class="table">
			<div class="table__header">
				<div class="table__row__name">Grüner Veltliner</div>
				<div class="table__row__prize">€</div>
			</div>

			{#each wines as wine, i}
			<div class="table__row">
				<div class="table__row__name">
					<!-- {wine.itemName.replace(/ GV$| RV$| R$| CH$/g, '')} -->
					{wine.itemName}
				</div>
				<div class="table__row__bottle">
					{(wine.itemBottlePrize + SHIPPING_PER_BOTTLE).toFixed(2)}
					<span>€</span>
				</div>
				<div class="table__row__boxes">
					<button
						class="button -small -left"
						type="button"
						disabled={wine.itemBottles < 1}
						on:click={() => { decrease(i)}}>-</button>
					<div class="table__row__boxes__count">{wine.itemBottles}</div>
					<button
						class="button -small -right"
						type="button"
						disabled={wine.itemBoxes >= MAX_BOXES}
						on:click={() => { increase(i)}}>+</button>
				</div>
				<div class="table__row__prize">
					{wine.itemPrize ? wine.itemPrize.toFixed(2) : wine.itemPrize}
				</div>


				<div class="table__inputs">
				<input
					type="number"
					bind:value={wine.itemBoxes}
					class="input"
					name="{wine.itemName}"
					readonly
					hidden />
				<input
					type="number"
					bind:value={wine.itemPrize}
					class="input"
					name="{wine.itemName} {wine.itemPrize}"
					readonly
					hidden />
				</div>
			</div>
			{/each}

			<!-- {#each winesGV as wineGV, i}
				<Row
					itemBoxes={wineGV.itemBoxes}
					itemBottlePrize={wineGV.itemBottlePrize}
					itemPrize={wineGV.itemPrize}
					itemName={wineGV.itemName}
					itemType={wineGV.itemType} />
			{/each}

			<div class="table__header">
				<div class="table__row__name">Roter Veltliner</div>
				<div class="table__row__prize">€</div>
			</div>

			{#each winesRV as {itemName, itemBottlePrize, itemBoxes, itemPrize, itemType}}
				<Row {itemBoxes} {itemBottlePrize} {itemPrize} {itemName} {itemType} />
			{/each}

			<div class="table__header">
				<div class="table__row__name">Riesling</div>
				<div class="table__row__prize">€</div>
			</div>

			{#each winesR as {itemName, itemBottlePrize, itemBoxes, itemPrize, itemType}}
				<Row {itemBoxes} {itemBottlePrize} {itemPrize} {itemName} {itemType} />
			{/each}

			<div class="table__header">
				<div class="table__row__name">Chaardonnay</div>
				<div class="table__row__prize">€</div>
			</div>

			{#each winesCH as {itemName, itemBottlePrize, itemBoxes, itemPrize, itemType}}
				<Row {itemBoxes} {itemBottlePrize} {itemPrize} {itemName} {itemType} />
			{/each} -->
		</div>

	</div>

	<div class="frm_step" class:-visible={step === 'name'}>
		<!-- <div class="page pge_name">

			<input name="userName" class="input" class:-error={userNameValid === false} placeholder="Jmeno" bind:value={userName} on:input={validateUserName}/>

			<input name="userEmail" type="email" class="input" class:-error={userEmailValid === false} placeholder="E-mail" bind:value={userEmail} on:input={validateUserEmail} />

			<button type="button" disabled={!userNameValid || !userEmailValid} class="button -submit frm_submit" on:click={confirmName}>Dalsi</button>
			<button type="button" class="a -secondary frm_back" on:click={backToBottles}>Ne, posral sem to</button>

		</div> -->
	</div>

	<div class="frm_step" class:-visible={step === 'summary'}>
		<div class="page">

			<h1>Souhlasi?</h1>

			<!-- <table class="table">
				<tr>
					<th class="win_name">Víno</th>
					<th class="win_prize">Krabic</th>
				</tr>
				{#each wines as {name, bottle, boxes, prize}}
					{#if boxes > 0}
						<tr>
							<td class="win_name">{name}</td>
							<td class="win_prize">{boxes}</td>
						</tr>
					{/if}
				{/each}
				<tr>
					<td class="win_name">Celkem</td>
					<td class="win_prize">
						<strong>{bottles / BOTTLES_PER_BOX}</strong>
					</td>
				</tr>
			</table> -->

			<!-- <input type="hidden" name="total" bind:value={total} /> -->

			<button type="submit" disabled={!userName || !userEmail} class="button -submit frm_submit">Objednat</button>
			<button type="button" class="a -secondary frm_back" on:click={backToName}>Ne, posral sem to</button>

		</div>
	</div>

	<div class="cart">
		<div class="cart__inner">
			{#if step === 'wines'}
				<button type="button" class="button -submit" on:click={confirmBottles}>Dalsi</button>
			{/if}
			<p class="cart__total">
				{prizeGV}
				<span class="cart__euro">€</span>
			</p>
		</div>
	</div>

</form>

<style lang="stylus">

.frm
	position absolute
	top 0
	right 0
	bottom 10rem
	left 0
	overflow auto

.frm_submit
	margin 4rem auto 0
	display block

.frm_step
	width 100%
	position absolute
	left 100%
	opacity 0
	transition opacity .05s, left .3s
	padding 2rem 4rem

	&.-visible
		opacity 1
		left 0
		transition opacity .5s, left .3s

.frm_back
	margin-top 2rem

.pge_name
	margin 0 auto
	text-align center

</style>
