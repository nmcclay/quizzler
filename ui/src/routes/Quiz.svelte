<script>
    import { onMount } from 'svelte';
    export let id;
    export let quiz;

    let title;
    let question;
    let questionCount;
    let answers = [];
    let correctAnswer;

    onMount(async () => {
        const res = await fetch(`/api/quiz/${id}`);
        quiz = await res.json();
        title = quiz.title;
        setQuestion(0);
    });

    function setQuestion(num) {
        questionCount = num;
        question = quiz.questions[num].question;
        answers = quiz.questions[num].answers;
        correctAnswer = answers.findIndex(answer => answer.includes('|*'));
        if (correctAnswer < 0) throw new Error("Oops! This quiz has no right answer!");
        answers[correctAnswer] = answers[correctAnswer].replace("|*","");
    }

    function checkAnswer(i) {
        const isCorrect = i == correctAnswer;
        if (isCorrect) getNextQuestion();
    }

    function getNextQuestion() {
        const nextQuestionCount = questionCount + 1;
        if (nextQuestionCount >= quiz.questions.length) {
            throw new Error("ALL DONE!");
        }
        setQuestion(nextQuestionCount);
    }
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
        cursor: pointer;
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
            {#each answers as answer, i}
                <li on:click={() => checkAnswer(i)}>{answer}</li>
            {/each}
        </ul>
    </div>
</div>
