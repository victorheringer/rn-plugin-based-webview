import {BrowserPlugin} from './plugins/browser';
import {HeaderPlugin} from './plugins/header';

import {withPluginsProvider} from './lib/index';

function PluginsApp() {
  return (
    <>
      <HeaderPlugin.Component />
      <BrowserPlugin.Component />
    </>
  );
}

export const BrowserWithPlugins = withPluginsProvider(
  PluginsApp,
  [BrowserPlugin.reducers],
  [BrowserPlugin.state],
  [BrowserPlugin.effects],
);
