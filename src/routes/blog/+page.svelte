<script lang="ts">

    export let data
</script>


<!-- Posts -->
<section>
    <ul class="posts">
        {#each data.posts as post}
            <li class="post">
                <a href={'blog/'+post.slug} class="title">{post.title}</a>
                <p class="date">{(post.date)}</p>
                <p class="description">{post.description}</p>
            </li>
        {/each}
    </ul>
</section>

<style>
    .posts {
        display: grid;
        gap: 2rem;
    }

    .post {
        max-inline-size: var(--size-content-3);
    }

    .post:not(:last-child) {
        border-bottom: 1px solid var(--border);
        padding-bottom: var(--size-7);
    }

    .title {
        font-size: var(--font-size-fluid-3);
        text-transform: capitalize;
    }

    .date {
        color: var(--text-2);
    }

    .description {
        margin-top: var(--size-3);
    }
</style>
