import { Children, PureComponent } from 'react';
import PropTypes from 'prop-types';

import feathers from '@feathersjs/client';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import io from 'socket.io-client';
import rx from 'feathers-reactive';
import { feathersWrapperPropTypes, feathersWrapperDefaultProps } from './types';

export default class FeathersProvider extends PureComponent {
  static propTypes = feathersWrapperPropTypes;

  static defaultProps = feathersWrapperDefaultProps;

  static childContextTypes = {
    feathers: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    const socket = io(props.wsEndpoint, {
      transports: ['websocket'],
      forceNew: true,
      ...props.socketioOptions,
    });
    this._initialized = false;
    this._timeoutMs = socket.timeout;
    this._timeout = null;
    this.app = feathers()
      .configure(socketio(socket, props.feathersSocketioOptions))
      .configure(rx({ idField: props.idField }))
      .configure(authentication(props.feathersAuthOptions));
  }

  getChildContext() {
    return { feathers: this.app };
  }

  componentDidMount() {
    const { feathersSocketioOptions, connectionCallbacks } = this.props;
    if (this._timeoutMs > 0) {
      this._addTimeout(this._timeoutMs);
    }
    // set up callbacks
    for (const key in connectionCallbacks) {
      if (connectionCallbacks.hasOwnProperty(key) && key !== 'connect') {
        this.app.io.on(key, () => {
          if (typeof connectionCallbacks[key] === 'function') {
            return connectionCallbacks[key]();
          }
          return null;
        });
      }
    }
    // must have a connected prop
    this.app.io.on('connect', () => {
      this._initialized = true;
      this._clearTimeout();
      this.forceUpdate();
      if (typeof connectionCallbacks.connect === 'function') {
        return connectionCallbacks.connect();
      }
    });
  }

  componentWillUnmount() {
    this._clearTimeout();
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
      this.connectionTimeout = null;
    }
    this.app.io.removeAllListeners();
  }

  _addTimeout = ms => {
    this._timeout = setTimeout(() => {
      this._initialized = true;
      this._clearTimeout();
      this.forceUpdate();
    }, ms);
  };

  _clearTimeout = () => {
    if (this._timeout) {
      clearTimeout(this._timeout);
      this._timeout = null;
    }
  };

  render() {
    const { children, loader } = this.props;

    if (!this._initialized) {
      return loader;
    }

    return Children.only(children);
  }
}
