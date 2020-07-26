/* *****************************************
 *  Author : Muhammad Swalah A A
 *  Created On : Sun Jul 26 2020
 *  File : index.js
 ****************************************** */
import Logger from "./logger";
import expressLoader from "./express";

export default async ({ expressApp }) => {
	await expressLoader({ app: expressApp });
	Logger.info("✌️ Express loaded");
};
