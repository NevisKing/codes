<script>
    import FFA_board from "./FFA_board.svelte";
    import Duel_board from "./Duel_board.svelte";

    export let data;
</script>

<FFA_board users={data.users}></FFA_board>
<Duel_board users={data.users}></Duel_board>
