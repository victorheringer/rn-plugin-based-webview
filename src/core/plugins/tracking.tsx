import {BrowserPlugin} from '../plugin';

export class TrackingPlugin implements BrowserPlugin<any, any> {
  onMessage() {
    console.log('message');
  }
}
