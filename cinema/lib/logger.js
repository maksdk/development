export default class Logger {
	static log(vari, name) {
		console.log(`\n===== Start =====`);
		console.log(`Name: ${name ? name : ':)'}\n`);
		console.log(vari)
		console.log(`\n===== End =====\n\n`);
	}

	static table(vari, name) {
		console.log(`\n===== Start =====`);
		console.log(`Name: ${name ? name : ':)'}\n`);
		console.table(vari)
		console.log(`\n===== End =====\n\n`);
	}
}