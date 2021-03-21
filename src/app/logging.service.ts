import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class LoggingService {
  lastLog: string;

  constructor() {}

  printLog(message: string) {
    console.log('message: ', message);
    console.log('lastLog: ', this.lastLog);
    this.lastLog = message;
  }
}
