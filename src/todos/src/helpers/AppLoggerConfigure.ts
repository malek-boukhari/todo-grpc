import { injectable } from 'inversify';
import { configure, getLogger, Logger } from 'log4js';

@injectable()
export class AppLoggerConfigure {
    public logger: Logger;
    public logLevel: string = process.env.NODE_ENV === 'dev' ? 'DEBUG' : 'INFO';

    public constructor() {
        configure({
            appenders: {
                console: { type: 'stdout', layout: { type: 'colored' } },
                dateFile: {
                    type: 'dateFile',
                    filename: process.env.LOG_FILE,
                    layout: { type: 'basic' },
                    compress: true,
                    numBackups: 14,
                    keepFileExt: true
                }
            },
            categories: {
                default: {
                    appenders: ['console', 'dateFile'],
                    level: this.logLevel
                }
            }
        });
        this.logger = getLogger();
    }
}
