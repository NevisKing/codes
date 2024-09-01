<script>
    import Svelecte from "svelecte";
    export let data;
    let myValue = null;
    let userName = null;
    export let sessionListOut;
    $: sessionList = sessionListOut;
    $: isSelected = myValue != null;

    function add() {
        if(!myValue){
            return;
        }
        const user = (data.find((user) => {return user.id == myValue}));
        let Tag = "";
        if(user){
            Tag = user.Tag;
        }
        else{
            Tag = myValue;
        }
        if(sessionList.find((player) => {return player == Tag})){
            return;
        }
        sessionList.push(Tag);
        sessionList = sessionList;
        sessionListOut = sessionList;
    }
</script>

<div class="container">
    <div class="rowcontainer">
        <div class="colcontainer">
            {#each sessionList as item}
                <div class="player-card">
                    {item}
                </div>
            {/each}
        </div>
        <div class="colcontainer">
            <div class="item">
                <Svelecte options={data} bind:value={myValue} labelField="Tag" creatable="true" on:enterKey={() =>add()}></Svelecte>
            </div>
            <button on:click={()=>add()}>Add</button>
        </div>
    </div>
</div>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        background-color: yellow;
        border: solid black;
        max-width: 70vw;
        justify-content: center;
    }
    .player-card {
        background-color: beige;
        border: solid red;
        justify-content: center;
        text-align: center;
        min-height: 50px;
        font-size: 50px;
        max-width: 20vw;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;

    }
   .rowcontainer {
       display: flex;
       background-color: #4075a6;
       justify-content: center;

   }
   .colcontainer {
       display: flex;
       background-color: aquamarine;
       flex-direction: column;
       justify-content: left;
       flex-grow: 1;
   }
   .item {
       background-color: #ff3e00;
       min-width: 100px;
       text-align: center;
       align-content: center;
       flex-grow: 1;
   }
</style>