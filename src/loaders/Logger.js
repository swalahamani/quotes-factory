/* *****************************************
 *  Author : Muhammad Swalah A A
 *  Created On : Sun Jul 26 2020
 *  File : logger.js
 ****************************************** */
import winston from "winston";
import config from "@config";

const loggingDirectory = config.get("logging").directory;

let loggerInstance = null;

const loggingLevels = winston.config.syslog.levels;

class Logger {
	constructor() {
		throw new Error("Invalid Usage: Use getSingletonInstance() instead");
	}

	static generateFileTransports() {
		return Object.keys(loggingLevels).map((loggingLevel) => {
			const fileName = `${loggingDirectory}/log-${loggingLevel}.log`;
			return new winston.transports.File({
				filename: fileName,
				level: loggingLevel,
			});
		});
	}

	static getSingletonInstance() {
		try {
			if (!loggerInstance) {
				loggerInstance = winston.createLogger({
					levels: loggingLevels,
					format: winston.format.combine(
						winston.format.timestamp({
							format: "YYYY-MM-DD HH:mm:ss",
						}),
						winston.format.json(),
						winston.format.printf((info) => {
							return `{ts: ${info.timestamp}, level: ${info.level}, message: ${info.message}}`;
						})
					),
					transports: [
						...this.generateFileTransports(),
						new winston.transports.Console(),
					],
				});
			}
		} catch (error) {
			console.trace(error);
		}

		return loggerInstance;
	}
}

module.exports = Logger;
