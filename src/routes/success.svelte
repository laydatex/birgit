<script>

</script>

<svelte:head>
	<title>Success</title>
	<meta name="description" content="Success" />
</svelte:head>

<div class="page scc">
	<div class="scc_tile tile">
		<div class="scc_tile__text">
			<h1>Bravo!</h1>
			<p>Mas objednano.</p>
			<p>Posli prachy, sedni si a cekej na telefon.</p>
			</div>
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

.scc_tile
	padding 4rem
	background-color #fff
	border-radius 1rem

	&__text
		position absolute
		text-align start
		padding 4rem
		width 26.5%
		color #000
		text-shadow 0 -1px 0 rgba(#fff, .5)
</style>
