<script context="module">
	export const prerender = true;
</script>

<script>

import WINE_LIST from '../_data/wines.json';

let wines = WINE_LIST;
let step = 'wines';
let userEmailValid;
let userNameValid;
let userName;
let userEmail;
let total;

const shippingPerBottle = .5;
const bottlesPerBox = 6;
const maxBoxes = 30;

$: total = wines.reduce((sum, current) => {
		current.boxes = current.boxes || 0;
		current.prize = (shippingPerBottle + current.bottle) * current.boxes * bottlesPerBox || 0;
		return sum + current.prize;
	}, 0);
$: bottles = wines.reduce((sum, current) => {
		current.bottles = current.boxes * bottlesPerBox;
		return sum + current.bottles;
	}, 0);
$: shipping = shippingPerBottle * bottles;

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

</script>

<svelte:head>
	<title>Cenik</title>
	<meta name="description" content="Cenik vin" />
</svelte:head>

<form name="order" method="post" data-netlify="true" action="/success" class="frm">

	<input type="hidden" name="form-name" value="order" />

	<div class="frm_step" class:-visible={step === 'wines'}>

		<div class="table">
			<div class="table__header">
				<div class="table__row__name">Víno</div>
				<div class="table__row__bottle">Lahev</div>
				<div class="table__row__boxes">Krabic (x6)</div>
				<div class="table__row__prize">€</div>
			</div>

			{#each wines as {name, bottle, boxes, prize}}
				<div class="table__row">
					<div class="table__row__name">
						{name}
					</div>
					<div class="table__row__bottle">
						{(bottle + shippingPerBottle).toFixed(2)}
					</div>
					<div class="table__row__boxes">
						<button
							class="button -small -left"
							type="button"
							disabled={boxes < 1}
							on:click={() => boxes -= 1}>-</button>
						<input
							type="number"
							min="0"
							max="10"
							maxlength="2"
							bind:value={boxes}
							class="input"
							name="{name}"
							readonly />
						<button class="button -small -right" type="button" disabled={bottles / bottlesPerBox >= maxBoxes} on:click={() => boxes += 1}>+</button>
					</div>
					<div class="table__row__prize">
						{prize ? prize.toFixed(2) : 0}
					</div>
				</div>
			{/each}
		</div>

		<button type="button" disabled={bottles < 1} class="button -submit frm_submit" on:click={confirmBottles}>Dalsi</button>


	</div>

	<div class="frm_step" class:-visible={step === 'name'}>
		<div class="page pge_name">

			<input name="userName" class="input" class:-error={userNameValid === false} placeholder="Jmeno" bind:value={userName} on:input={validateUserName}/>

			<input name="userEmail" type="email" class="input" class:-error={userEmailValid === false} placeholder="E-mail" bind:value={userEmail} on:input={validateUserEmail} />

			<button type="button" disabled={!userNameValid || !userEmailValid} class="button -submit frm_submit" on:click={confirmName}>Dalsi</button>
			<button type="button" class="a -secondary frm_back" on:click={backToBottles}>Ne, posral sem to</button>

		</div>
	</div>

	<div class="frm_step" class:-visible={step === 'summary'}>
		<div class="page">

			<h1>Souhlasi?</h1>

			<table class="table">
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
						<strong>{bottles / bottlesPerBox}</strong>
					</td>
				</tr>
			</table>

			<input type="hidden" name="total" bind:value={total} />

			<button type="submit" disabled={bottles < 1 || !userName || !userEmail} class="button -submit frm_submit">Objednat</button>
			<button type="button" class="a -secondary frm_back" on:click={backToName}>Ne, posral sem to</button>

		</div>
	</div>

	<div class="cart">
		<div class="cart__inner">
			<span></span>
			<p class="cart__total">
				{total ? total.toFixed(2) : 0}
				<span class="cart__euro">€</span>
			</p>
		</div>
	</div>

</form>

<style lang="stylus">

.frm_submit
	margin 4rem auto 0
	display block


.frm_step
	width 100%
	position absolute
	left 100%
	opacity 0
	transition opacity .05s, left .3s
	padding 4rem 4rem 10rem

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
