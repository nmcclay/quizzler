<script>
    import { Link } from "svelte-navigator";
    import { onMount } from 'svelte';
    export let name;
    let quizzes = [];

    onMount(async () => {
        const res = await fetch(`/api/quiz`);
        quizzes = await res.json();
    });
</script>

<div>
    <h1>Welcome to {name}!</h1>
    <ul class="quizzes">
        {#each quizzes as quiz}
            <li><Link to="quiz/{quiz}">{quiz}</Link></li>
        {:else}
            <p>loading...</p>
        {/each}
    </ul>
</div>


<style>
    .quizzes {
        max-width: 400px;
        margin: auto;
        padding: 0;
    }

    .quizzes li {
        list-style: none;
        border: 1px solid white;
        padding: 20px 10px;
        margin: 5px 0;
    }
</style>
