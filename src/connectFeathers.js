import { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';

export default function connectFeathers(WrappedComponent, options) {
  const defaultOptions = {
    withRef: false,
  };
  const componentOptions = { ...defaultOptions, ...options };
  class FeathersConnector extends PureComponent {
    static propTypes = {
      feathers: PropTypes.object,
    };

    static contextTypes = {
      feathers: PropTypes.object,
    };

    constructor(props, context) {
      super(props, context);
      this.feathers = props.feathers || context.feathers;
    }

    getWrappedInstance() {
      return this._ref;
    }

    render() {
      const props = {
        feathers: this.feathers,
        ...this.props,
      };
      if (componentOptions.withRef) {
        props.ref = ref => (this._ref = ref);
      }
      return createElement(WrappedComponent, props);
    }
  }

  return FeathersConnector;
}
