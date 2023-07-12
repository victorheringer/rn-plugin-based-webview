import {BrowserPlugin} from './plugin';

const EMPTY_FUNCTION = () => null;

class EnginePlugin<S, A> {
  plugin: BrowserPlugin<S, A> | null = null;
  enabled: boolean = false;

  constructor(plugin: BrowserPlugin<S, A>, enabled: boolean) {
    this.plugin = plugin;
    this.enabled = enabled;
  }

  enablePlugin() {
    this.enabled = true;
  }

  disablePlugin() {
    this.enabled = false;
  }
}

export class Engine<S, A> {
  plugins: EnginePlugin<S, A>[] = [];

  enablePlugin(plugin: BrowserPlugin<S, A>) {
    this.plugins.push(new EnginePlugin(plugin, true));
  }

  disablePlugin(plugin: BrowserPlugin<S, A>) {
    this.plugins.push(new EnginePlugin(plugin, false));
  }

  createReducers(ePlugins: EnginePlugin<S, A>[]) {
    return function (state: any, action: any) {
      return ePlugins.reduce((acc: any, ePlugin: EnginePlugin<S, A>) => {
        return ePlugin?.plugin?.reducer
          ? ePlugin?.plugin?.reducer?.(acc, action)
          : acc;
      }, state);
    };
  }

  createMiddleware(ePlugins: EnginePlugin<S, A>[], name: string) {
    return (state: any, dispatch: any, browserRef: any) =>
      (...params: any) =>
        ePlugins.map((ePlugin: any) =>
          ePlugin?.plugin?.[name]?.({state, dispatch, browserRef, params}),
        );
  }

  createState(ePlugins: EnginePlugin<S, A>[]) {
    return ePlugins.reduce((acc: any, ePlugin: EnginePlugin<S, A>) => {
      return {...acc, ...ePlugin.plugin?.initialState};
    }, {});
  }

  createComponents(ePlugins: EnginePlugin<S, A>[], component: string) {
    return ePlugins.map(
      (ePlugin: any) => ePlugin?.plugin?.[component] || EMPTY_FUNCTION,
    );
  }

  build() {
    const plugins = this.plugins;

    return {
      reducer: this.createReducers(plugins),
      onMessage: this.createMiddleware(plugins, 'onMessage'),
      onLoadEnd: this.createMiddleware(plugins, 'onLoadEnd'),
      onLoadStart: this.createMiddleware(plugins, 'onLoadStart'),
      initialState: this.createState(plugins),
      genericComponent: this.createComponents(plugins, 'genericComponent'),
      headerComponent: this.createComponents(plugins, 'headerComponent'),
      footerComponent: this.createComponents(plugins, 'footerComponent'),
    };
  }
}
