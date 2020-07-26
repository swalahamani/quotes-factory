/* *****************************************
 *  Author : Muhammad Swalah A A
 *  Created On : Sun Jul 26 2020
 *  File : App.js
 ****************************************** */
// const config = require("./config");
import config from "@config";
import express from "express";
import loaders from "@loaders";
import Logger from "@loaders/logger";

async function startServer() {
	const app = express();

	await loaders({ expressApp: app });

	app.listen(config.get("port"), config.get("ip"), (error) => {
		if (error) {
			Logger.error(error);
			process.exit("1");
		}

		Logger.info(
			`Server listening at: http://${config.get("ip")}:${config.get("port")}`
		);
	});
}

startServer();
