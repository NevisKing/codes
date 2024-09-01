<script lang="ts">
export let data;
export let form;

</script>


<form method="POST">
	{#if form?.success}<p>If we found a valid email, we have sent you a password reset link</p>{/if}
	<label>
		Email
		<input name="email" type="email">
	</label>
	<button>Reset</button>
</form>

<style>
</style>
