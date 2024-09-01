import Pocketbase from 'pocketbase';
import * as bcrypt from 'bcrypt';
import {fail} from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import {serverEmail} from '$env/static/private'
import {serverEmailPass} from '$env/static/private'
import {getDBclient} from "$lib/server/db";


const transporter = nodemailer.createTransport({
    host: "smtp.ziggo.nl",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: serverEmail,
        pass: serverEmailPass,
    },
});

var rand = function () {
    return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function () {
    return rand() + rand(); // to make it longer
};


export const actions = {
    default: async ({request, cookies}) => {
        const adminPb = await getDBclient();
        const users = await adminPb.collection('MyUsers').getFullList();

        const data = await request.formData();
        const form_email = data.get('email');
        const email_not_null = form_email != null;
        let account = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === form_email) {
                account = users[i];
                break;
            }
        }
        if (account && form_email) {

            const link = token();
            adminPb.collection('Password_Resets').create({
                email: form_email,
                link: link,
            });
            await transporter.sendMail({
                from: '"nevis.codes" <' + serverEmail +'>',
                to: form_email.toString(),
                subject: "Password reset",
                text: "Please click this link to reset your password.\n" + "https://nevis.codes/login/forgot/" + link + "\n" + "If you didn't request this you can safely ignore this message"
            });
            return {success: true};
        }
        return {success: false, reason: "Invalid credentials"};

    }
}
