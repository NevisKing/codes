/** @type {import('./$types').LayoutServerLoad} */
import {getDBclient} from "$lib/server/db";


export async function load({cookies}) {
    if (cookies.get("sessionid") === "0") {
        return {};
    }
    const adminPb = await getDBclient();
    const sessionid = cookies.get('sessionid');
    try {
        const result = await adminPb.collection("Sessions").getFirstListItem('SessionId="' + sessionid + '"');
        const user_result = await adminPb.collection("MyUsers").getOne(result.user);
        let cutoff = new Date(Date.now())
        cutoff.setDate(new Date(Date.now()).getDate() - 1);
        //cutoff.setMinutes(new Date(Date.now()).getMinutes() -1);
        let user = undefined;
        if (new Date(result.created) > cutoff) {
            user = user_result.id;
        }
        if (user == null) {
            cookies.set("sessionid", "0",{path:"/"});
        } else {
            console.log("Hello " + user_result.email);
            return {user: user, user_email: user_result.email}
        }
    } catch {
        return {}
    }
}
