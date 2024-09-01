import {getDBclient} from "$lib/server/db";
export async function load({params}) {
	const adminPb = await getDBclient();
	console.log(params.slug);
	try {
		const verification = await adminPb.collection('Verification').getFirstListItem('link="'+params.slug+'"');

		let cutoff = new Date(Date.now())
		cutoff.setDate(new Date(Date.now()).getDate() -1);
		if(new Date(verification.created) < cutoff){
			console.log("Expired registration");
			return {status: {success: false, reason: "Expired registration"}};
		}
		const users = await adminPb.collection('MyUsers').getFullList();
		let unused = true;
		for (let i = 0; i < users.length; i++){
			if (users[i].email === verification.email){
				unused = false;
				break;
			}
		}
		if(!unused){
			console.log("Email already in use");
			return {status: {success: false, reason: "Email already in use"}};
		}
		console.log(verification);
		adminPb.collection('MyUsers').create({
			email: verification.email,
			pass_hash: verification.pass_hash,
			username: "unnamed",
		});
		//adminPb.collection('Verification').delete(params.slug);
		return {status: {success: true}};
	}
	catch(error){
		console.log("verification err");
	}
}
