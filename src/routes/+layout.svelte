<script>
export let data;
</script>

<div class="app">
	<nav>
		<div class="nav-container">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/projects">Projects</a></li>
				<li><a href="/blog">Blog</a></li>
				<li><a href="/login">Login</a></li>
			</ul>
		</div>
	</nav>
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background: #f1edc9;
		border: #ff00dd;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;

		margin: 0 auto;
		box-sizing: border-box;
		//border: dotted red;
	}
	nav{
		display: flex;
		flex-direction: column;
		padding: 0rem;
		width: 100%;
		max-width: 64rem;

		margin: 0 auto;
		box-sizing: border-box;
		//border: dotted green;
		align-items: center;

	}
	.nav-container{
		max-width: 70%;
		width: 50%;
		background: #fff5ce;
		padding: 0;
	}
	ul{
		display: flex;
		flex-direction: row;
		//border: dotted #ff00dd;
		list-style-type: none;
		padding: 0;
		justify-content: space-evenly;
	}
	li{
		min-width: 5rem;
		max-width: 20%;
		flex-grow: 1;
		//border: solid #424040;
		background: #e4d4b1;
		text-align: center;
	}
</style>