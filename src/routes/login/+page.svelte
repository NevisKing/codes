<script lang="ts">
export let data;
export let form;

</script>


<form method="POST" action="?/login">
	{#if form?.success && !form?.login}<p>Check your email for a verification link!</p>{/if}
	{#if form?.success == false}<p class="error">{form?.reason}</p>{/if}
	<label>
		Email
		<input name="email" type="email">
	</label>
	<label>
		Password
		<input name="password" type="password">
	</label>
	<button>Log in</button>
	<button formaction="?/register">Register</button>
	<button formaction="?/logout">Log out</button>
</form>

<a href='/login/forgot'>Forgot password</a>
<style>
</style>
