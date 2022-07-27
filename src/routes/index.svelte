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

$: netto = wines.reduce((sum, current) => {
		current.boxes = current.boxes || 0;
		current.prize = current.bottle * current.boxes * bottlesPerBox || 0;
		return sum + current.prize;
	}, 0);
$: bottles = wines.reduce((sum, current) => {
		current.bottles = current.boxes * bottlesPerBox;
		return sum + current.bottles;
	}, 0);
$: shipping = shippingPerBottle * bottles;
$: total = shipping + netto;

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

<form name="order" method="post" action="/success/" data-netlify="true" class="frm">

	<input type="hidden" name="form-name" value="order" />

	<div class="pge_cart">
		<table class="table">
			<tr>
				<td class="win_name">Netto</td>
				<td colspan="3" class="win_prize">
					{netto ? (Math.round((netto + Number.EPSILON) * 100) / 100).toFixed(2) : 0}
				</td>
			</tr>
			<tr>
				<td class="win_name">Doprava</td>
				<td colspan="3" class="win_prize">
					{shipping ? shipping.toFixed(2) : 0}
				</td>
			</tr>
			<tr>
				<td class="win_name">Total</td>
				<td colspan="3" class="win_prize win_total">
					{total ? total.toFixed(2) : 0}
					<span>€</span>
				</td>
			</tr>
		</table>
	</div>

	<div class="frm_step" class:-visible={step === 'wines'}>
		<div class="page pge_order">

			<div>
				<table class="table">
					<tr>
						<th class="win_name">Víno</th>
						<th class="win_prize -bottle">Lahev</th>
						<th>Krabic (x6)</th>
						<th class="win_prize">€</th>
					</tr>
					{#each wines as {name, bottle, boxes, prize}}
						<tr>
							<td class="win_name">
								{name}
							</td>
							<td class="win_prize -bottle">
								{bottle}
							</td>
							<td>
								<div class="win_boxes">
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
							</td>
							<td class="win_prize">
								{prize ? prize.toFixed(2) : 0}
							</td>
						</tr>
					{/each}
				</table>

				<button type="button" disabled={bottles < 1} class="button -submit frm_submit" on:click={confirmBottles}>Dalsi</button>

			</div>

		</div>
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

</form>

<style lang="stylus">

.win_name
	text-align start

.win_prize
	text-align end
	width 5em

	&.-bottle
		padding-right 1rem

.win_total
	font-weight bold
	font-size var(--font-size-large)
	color var(--color-accent)
	position relative

	span
		position absolute
		left 100%
		top 0
		bottom 0
		display flex
		align-items center
		color var(--color-text)

.win_boxes
	display flex
	align-items center
	justify-content center

	input
		width 3rem
		margin 0

.frm_submit
	margin 4rem auto 0
	display block

.frm_step
	width calc( 100% - 34rem )
	position absolute
	left 100%
	opacity 0
	transition opacity .05s, left .3s
	padding 4rem

	&.-visible
		opacity 1
		left 0
		transition opacity .5s, left .3s

.frm_back
	margin-top 2rem

.pge_name
	margin 0 auto
	text-align center

.pge_cart
	position fixed
	top 0
	right 0
	padding 4rem
	margin 4rem
	background-color #fff
	border-radius 1rem
	width 30rem
	z-index 9

</style>
