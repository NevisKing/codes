<script lang="ts">
export let data;
</script>


	{#if data?.status?.success}<p>Your password has been updated</p>{/if}

<form method="POST">
	<label>
	New password	
		<input name="password" type="password">
	</label>
	<button>Submit</button>
</form>

<style>
</style>
