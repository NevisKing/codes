import bcrypt from 'bcrypt';
import {redirect} from '@sveltejs/kit';
import {getDBclient} from "$lib/server/db";

export const actions = {
    default: async ({request, params}) => {
        const adminPb = await getDBclient();
        try {
            const verification = await adminPb.collection('Password_Resets').getFirstListItem('link="' + params.slug + '"');

            let cutoff = new Date(Date.now())
            cutoff.setDate(new Date(Date.now()).getMinutes() - 45);
            if (new Date(verification.created) < cutoff) {
                console.log("Expired reset");
                return {status: {success: false, reason: "Expired reset"}};
            }

            const data = await request.formData();
            const form_pass = data.get('password');
            if(form_pass){
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(form_pass.toString(), salt);
                const result = await adminPb.collection("MyUsers").getFirstListItem('email="' + verification.email + '"');
                await adminPb.collection('MyUsers').update(result.id, {
                    pass_hash: hash,
                });
                //await adminPb.collection('Password_Resets').delete(verification.id);
                //adminPb.collection('Verification').delete(params.slug);
                console.log("test");
                //return {status: {success: true}};
            }
        } catch (error) {
            console.log("verification err");
            return
        }
        redirect(303, '/login');
    }
}
