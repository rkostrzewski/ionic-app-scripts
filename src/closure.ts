import { BuildContext, TaskInfo } from './util/interfaces';
import { generateContext, getUserConfigFile } from './util/config';
import { Logger } from './util/logger';
import { runWorker } from './worker-client';


export function closure(context?: BuildContext, configFile?: string) {
  context = generateContext(context);
  configFile = getUserConfigFile(context, taskInfo, configFile);

  const logger = new Logger('closure');

  return runWorker('closure', context, configFile)
    .then(() => {
      logger.finish();
    })
    .catch(err => {
      throw logger.fail(err);
    });
}


export function closureWorker(context: BuildContext, configFile: string): Promise<any> {
  return new Promise((resolve, reject) => {
    Logger.warn('Closer Compiler unsupported at this time.');
    resolve();
  });
}


export function isClosureSupported(context: BuildContext) {
  // TODO: check for Java and compiler.jar executable
  return false;
}


const taskInfo: TaskInfo = {
  fullArgConfig: '--closure',
  shortArgConfig: '-l',
  envConfig: 'ionic_closure',
  defaultConfigFile: 'closure.config'
};


export interface ClosureConfig {
  // https://developers.google.com/closure/compiler/docs/gettingstarted_app
  pathToJavaExecutable: string;
}
