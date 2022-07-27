<script>

</script>

<svelte:head>
	<title>Success</title>
	<meta name="description" content="Success" />
</svelte:head>

<div class="page scc">
	<div class="scc_tile">
		<h1>Bravo!</h1>
		<p>
			Mas objednano. Posli prachy, sedni si a cekej na telefon.<br/>
			<!-- -{$store}- -->
		</p>
		<img src="staring.jpg" alt="cekej" />
	</div>
</div>

<style lang="stylus">
.scc
	display flex
	align-items center
	justify-content center
	position absolute
	min-height 100%
	min-width 100%

	&_tile
		padding 4rem
		background-color #fff
		border-radius 1rem
</style>
