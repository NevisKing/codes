import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import {getDBclient} from "$lib/server/db";
import {serverEmail} from '$env/static/private';
import {serverEmailPass} from '$env/static/private'

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
    login: async ({request, cookies}) => {
        const adminPb = await getDBclient();
        const users = await adminPb.collection('MyUsers').getFullList();

        const data = await request.formData();
        const form_email = data.get('email');
        const form_pass = data.get('password');

        const form_email_exists = form_email != null;
        const form_pass_exists = form_pass != null;
        if (form_email_exists && form_pass_exists) {
            const email = form_email.toString();
            const pass = form_pass.toString();

            let account = null;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === form_email) {
                    account = users[i];
                    break;
                }
            }
            if (account) {
                const salt = bcrypt.genSaltSync(10);
                const validated = bcrypt.compareSync(pass, account.pass_hash);
                if (validated) {
                    console.log("Logging in");
                    const session_token = token();
                    cookies.set('sessionid', session_token, {path: '/'});
                    adminPb.collection('Sessions').create({
                        SessionId: session_token,
                        user: account.id
                    });
                    return {success: true, login: true};
                }
            }
            return {success: false, reason: "Invalid credentials"};
        }
    },
    register: async ({request}) => {
        console.log("Submitted");

        const adminPb = await getDBclient();
        const users = await adminPb.collection('MyUsers').getFullList();

        const data = await request.formData();
        const form_email = data.get('email');
        const form_pass = data.get('password');

        const form_email_exists = form_email != null;
        const form_pass_exists = form_pass != null;
        if (form_email_exists && form_pass_exists) {
            const email = form_email.toString();
            const pass = form_pass.toString();

            let unused = true;
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === form_email) {
                    unused = false;
                    break;
                }
            }
            if (unused) {
                const registerToken = token();
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(pass, salt);
                console.log(hash);
                console.log(bcrypt.compareSync(pass, hash));
                const old_links = await adminPb.collection('Verification').getFullList({filter: 'email="' + form_email + '"'});
                for (let i = 0; i < old_links.length; i++) {
                    await adminPb.collection('Verification').delete(old_links[i].id);
                }
                const link = token();
                await adminPb.collection('Verification').create({
                    email: form_email,
                    pass_hash: hash,
                    link: link,
                });
                await transporter.sendMail({
                    from: '"nevis.codes" <'+serverEmail+'>',
                    to: email,
                    subject: "Account verification",
                    text: "Please click this link to verify your account.\n" + "https://nevis.codes/login/" + link + "\n" + "If you didn't register an account you can safely ignore this message"
                });
                console.log("email sent");

                return {success: true};
            } else {
                console.log("Email in use");
                return {success: false, reason: "Email already in use"};
            }
        }
    },
    logout: async ({request, cookies}) => {
        cookies.set('sessionid', '0', {path: '/'});
    }
};
