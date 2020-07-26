/* *****************************************
 *  Author : Muhammad Swalah A A
 *  Created On : Sun Jul 26 2020
 *  File : index.js
 ****************************************** */
const convict = require("convict");
const convictFormatWithValidator = require("convict-format-with-validator");
const path = require("path");

convict.addFormats(convictFormatWithValidator);

const config = convict({
	env: {
		doc: "The application environment.",
		format: ["production", "development", "test"],
		default: "development",
		env: "NODE_ENV",
	},

	ip: {
		doc: "The IP address on which the server will run on.",
		format: "ipaddress",
		default: "127.0.0.1",
		env: "IP_ADDRESS",
	},

	port: {
		doc: "The port on which the server has to be run on.",
		format: "port",
		default: "3000",
		env: "PORT",
	},

	logging: {
		directory: {
			doc: "The directory where all the logging files will be saved on.",
			format: String,
			default: "./logs/",
		},
	},
});

config.validate({ allowed: "strict" });

const ENVIRONMENT = config.get("env");

const envFilePath = path.resolve(__dirname, `./${ENVIRONMENT}.json`);
config.loadFile(envFilePath);

module.exports = config;
