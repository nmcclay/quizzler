<script>
    import { onMount } from 'svelte';
    export let id;

    let title;
    let question;
    let answers = [];

    onMount(async () => {
        const res = await fetch(`/api/quiz/${id}`);
        const quiz = await res.json();
        title = quiz.title;
        question = quiz.questions[0].question;
        answers = quiz.questions[0].answers;
    });
</script>

<style>
    .quiz {
        width: 100%;
        max-width: 500px;
    }

    .card {
        border: 1px solid white;
        margin: 20px;
        padding: 20px;
    }

    .question {
        font-size: 21px;
        padding-bottom: 20px;
        border-bottom: 1px solid white;
    }

    .answers {
        padding: 0;
    }

    .answers li {
        list-style: none;
        padding: 10px;
        margin: 10px 0;
        border-radius: 5px;
    }

    .answers li:first-child {
        border: 1px solid aqua;
        color: aqua;
    }

    .answers li:nth-child(2) {
        border: 1px solid red;
        color: red;
    }

    .answers li:nth-child(3) {
        border: 1px solid orange;
        color: orange;
    }

    .answers li:last-child {
        border: 1px solid green;
        color: green;
    }
</style>

<div class="quiz">
    <h2>{title}</h2>
    <div class="card">
        <p class="question">{question}</p>
        <ul class="answers">
            {#each answers as answer}
                <li>{answer}</li>
            {/each}
        </ul>
    </div>
</div>
