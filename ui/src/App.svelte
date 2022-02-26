<script>
	import { Router, Link, Route } from "svelte-navigator";
	import Quizzes from "./routes/Quizzes.svelte";
	import Quiz from "./routes/Quiz.svelte";
	export let name;
</script>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<Router>
	<nav>
		<Link to="/">Home</Link>
	</nav>
	<main>
		<Route path="/">
			<Quizzes name={name} />
		</Route>
		<Route path="quiz/:id" component={Quiz} />
	</main>
</Router>


