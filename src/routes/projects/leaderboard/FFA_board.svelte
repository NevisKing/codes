<script>
    export let users;
</script>
{#each users as user}
    {user.Tag} {user.FFA_rank - user.FFA_sigma}
{/each}
