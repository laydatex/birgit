<script context="module">
	export const prerender = true;
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
			<p>Posli prachy,<br/> sedni si<br/> a cekej.</p>
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

	img
		max-width 100%

	&__text
		position absolute
		text-align start
		padding 4rem
		color #000
		text-shadow 0 -1px 0 rgba(#fff, .5)
</style>
