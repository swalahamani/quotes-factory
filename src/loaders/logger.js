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

	static getFileFormat() {
		return winston.format.combine(
			winston.format.timestamp({
				format: "YYYY-MM-DD HH:mm:ss",
			}),
			winston.format.json(),
			winston.format.printf((info) => {
				return `{ts: ${info.timestamp}, level: ${info.level}, message: ${info.message}}`;
			})
		);
	}

	static getConsoleFormat() {
		return winston.format.combine(
			winston.format.timestamp({
				format: "YYYY-MM-DD HH:mm:ss",
			}),
			winston.format.printf((info) => {
				return `\n⏳ ${info.timestamp} ⚡️ ${info.level}  🗞  ${info.message}`;
			})
		);
	}

	static generateFileTransports() {
		return Object.keys(loggingLevels).map((loggingLevel) => {
			const fileName = `${loggingDirectory}/log-${loggingLevel}.log`;
			return new winston.transports.File({
				format: this.getFileFormat(),
				filename: fileName,
				level: loggingLevel,
			});
		});
	}

	static generateConsoleTransport() {
		return new winston.transports.Console({
			format: this.getConsoleFormat(),
		});
	}

	static getSingletonInstance() {
		try {
			if (!loggerInstance) {
				loggerInstance = winston.createLogger({
					levels: loggingLevels,
					transports: [
						...this.generateFileTransports(),
						this.generateConsoleTransport(),
					],
				});
			}
		} catch (error) {
			console.trace(error);
		}

		return loggerInstance;
	}
}

module.exports = Logger.getSingletonInstance();
