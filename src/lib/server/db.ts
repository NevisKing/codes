import {DB, pw, adminEmail} from "$env/static/private";
import Pocketbase from "pocketbase";

let client: Pocketbase;
export async function getDBclient()
{
    if(client){
        return client;
    }
    const adminPass = pw;
    const adminPb = new Pocketbase(DB);
    await adminPb.admins.authWithPassword(adminEmail, adminPass);
    client = adminPb;
    return client;
}
