import {getDBclient} from "$lib/server/db";
export async function load({cookies}) {
    const db = await getDBclient();
    const users = await db.collection("Smash_Players").getFullList();
    return {users: users}
}
