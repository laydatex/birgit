<script>
import WINE_LIST from '../data/wines.json';

let wines = WINE_LIST;

let step = 'order';

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


// function onSubmit(e) {
// 	const formData = new FormData(e.target);
// 	const data = {wines, total};
//
// 	for (let field of formData) {
// 		const [key, value] = field;
// 		data[key] = value;
// 	}
//
// 	console.log(data);
// }

function back() {
	step = 'order';
}

function confirm() {
	step = 'summary';
}

</script>

<svelte:head>
	<title>Cenik</title>
	<meta name="description" content="Cenik vin" />
</svelte:head>

<form name="order" method="POST" data-netlify="true">

	{#if step === 'order'}
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
								name="{name}-count"
								readonly />
							<button class="button -small -right" type="button" disabled={bottles / bottlesPerBox >= maxBoxes} on:click={() => boxes += 1}>+</button>
						</div>
					</td>
					<td class="win_prize">
						{prize ? prize.toFixed(2) : 0}
					</td>
				</tr>
			{/each}
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

		<button type="button" disabled={bottles < 1} class="button -submit win_submit" on:click={confirm}>Objednat</button>

	{:else if step === 'summary'}

		<p>
			Chystas se objednat <strong>{bottles / bottlesPerBox}</strong> krabic (tj. {bottles} lahvi)<br/>
			za <strong>{total.toFixed(2)}€</strong>. Souhlas?
		</p>

		<input name="name" class="input" required placeholder="Jmeno" />

		<input name="email" type="email" class="input" required placeholder="E-mail" />

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
		</table>

		<div data-netlify-recaptcha="true" />

		<button type="submit" class="button -submit sum_submit">Ano</button>
		<button type="button" class="a -secondary" on:click={back}>Ne, posral sem to</button>

	{/if}

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

.win_submit
	margin 2rem auto
	display block

.sum_submit
	margin 2rem auto
	display block

</style>
