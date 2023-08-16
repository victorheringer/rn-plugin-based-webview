import {BrowserPlugin} from './plugins/browser';
import {HeaderPlugin} from './plugins/header';
import {FooterPlugin} from './plugins/footer';
import {ModalManagerPlugin} from './plugins/modal';
import {LoadingPlugin} from './plugins/loading';

import {withPluginsProvider} from './lib/index';

function PluginsApp() {
  return (
    <>
      <LoadingPlugin.Component />
      <HeaderPlugin.Component />
      <BrowserPlugin.Component />
      <FooterPlugin.Component />
      <ModalManagerPlugin.Component />
    </>
  );
}

export const BrowserWithPlugins = withPluginsProvider(
  PluginsApp,
  [BrowserPlugin.reducers, ModalManagerPlugin.reducers, LoadingPlugin.reducers],
  [BrowserPlugin.state, ModalManagerPlugin.state, LoadingPlugin.state],
  [BrowserPlugin.effects],
  [BrowserPlugin.refs],
);
