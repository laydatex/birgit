<script>

let total;

</script>

<svelte:head>
	<title>Success</title>
	<meta name="description" content="Success" />
</svelte:head>

<div class="page scc">
	<div class="scc_tile">
		<h1>Bravo!</h1>
		<p>
			Mas objednano, posli prachy, sedni si a cekej na telefon.<br/>
			-{total}-
		</p>
		<img src="staring.jpg" alt="cekej" />
	</div>
</div>

<style lang="stylus">
.scc
	display flex
	align-items center
	justify-content center

	&_tile
		padding 4rem
		background-color #fff
		border-radius 1rem
</style>
