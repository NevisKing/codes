<script>
    import User_search_bar from "./Session_edit.svelte";
    import Session_edit from "./Session_edit.svelte";

    export let data;
    let sessionList;
    let edit = true;

    function toggleEdit(){
        edit = !edit;
    }
</script>

Hi {sessionList}

<button on:click={() => toggleEdit()}>Toggle edit</button>
{#if edit}
    <Session_edit data={data.users} bind:sessionListOut={sessionList}></Session_edit>
{/if}

