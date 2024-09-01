<script>
    export let users;
</script>
{#each users as user}
    {user.Tag} {user.Duel_rank- user.Duel_sigma}
{/each}
