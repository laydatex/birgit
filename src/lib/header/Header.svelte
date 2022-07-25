<script>
	import { page } from '$app/stores';
</script>

<header>

	<nav>
		<ul>
			<li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.url.pathname === '/wines'}>
				<a sveltekit:prefetch href="/wines">Wines</a>
			</li>
		</ul>
	</nav>

</header>

<style lang="stylus">

nav ul
	display flex
	justify-content center
	margin 0
	padding 0
	background rgba(255, 255, 255, 0.7)

	li
		list-style none

		a
			display block
			padding .5rem
			text-transform uppercase
			color inherit
			text-decoration none

			&:hover
				background rgba(#000, .2)

</style>
