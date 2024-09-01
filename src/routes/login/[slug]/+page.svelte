<script>
export let data;
</script>

{#if data.status.success}
Registration successful
{:else}
Registration failed, {data.status.reason}
{/if}
