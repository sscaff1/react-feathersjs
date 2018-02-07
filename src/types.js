import PropTypes from 'prop-types';

// from socket-io-client library
const socketioOptionsShape = {
  /**
   * Should we force a new Manager for this connection?
   * @default false
   */
  forceNew: PropTypes.bool,

  /**
   * Should we multiplex our connection (reuse existing Manager) ?
   * @default true
   */
  multiplex: PropTypes.bool,

  /**
   * The path to get our client file from, in the case of the server
   * serving it
   * @default '/socket.io'
   */
  path: PropTypes.string,

  /**
   * Should we allow reconnections?
   * @default true
   */
  reconnection: PropTypes.bool,

  /**
   * How many reconnection attempts should we try?
   * @default Infinity
   */
  reconnectionAttempts: PropTypes.number,

  /**
   * The time delay in milliseconds between reconnection attempts
   * @default 1000
   */
  reconnectionDelay: PropTypes.number,

  /**
   * The max time delay in milliseconds between reconnection attempts
   * @default 5000
   */
  reconnectionDelayMax: PropTypes.bool,

  /**
   * Used in the exponential backoff jitter when reconnecting
   * @default 0.5
   */
  randomizationFactor: PropTypes.number,

  /**
   * The timeout in milliseconds for our connection attempt
   * @default 20000
   */
  timeout: PropTypes.number,

  /**
   * Should we automically connect?
   * @default true
   */
  autoConnect: PropTypes.bool,

  /**
   * The host that we're connecting to. Set from the URI passed when connecting
   */
  host: PropTypes.string,

  /**
   * The hostname for our connection. Set from the URI passed when connecting
   */
  hostname: PropTypes.string,

  /**
   * If this is a secure connection. Set from the URI passed when connecting
   */
  secure: PropTypes.bool,

  /**
   * The port for our connection. Set from the URI passed when connecting
   */
  port: PropTypes.string,

  /**
   * Any query parameters in our uri. Set from the URI passed when connecting
   */
  query: PropTypes.object,

  /**
   * `http.Agent` to use, defaults to `false` (NodeJS only)
   */
  agent: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * Whether the client should try to upgrade the transport from
   * long-polling to something better.
   * @default true
   */
  upgrade: PropTypes.bool,

  /**
   * Forces JSONP for polling transport.
   */
  forceJSONP: PropTypes.bool,

  /**
   * Determines whether to use JSONP when necessary for polling. If
   * disabled (by settings to false) an error will be emitted (saying
   * "No transports available") if no other transports are available.
   * If another transport is available for opening a connection (e.g.
   * WebSocket) that transport will be used instead.
   * @default true
   */
  jsonp: PropTypes.bool,

  /**
   * Forces base 64 encoding for polling transport even when XHR2
   * responseType is available and WebSocket even if the used standard
   * supports binary.
   */
  forceBase64: PropTypes.bool,

  /**
   * Enables XDomainRequest for IE8 to avoid loading bar flashing with
   * click sound. default to `false` because XDomainRequest has a flaw
   * of not sending cookie.
   * @default false
   */
  enablesXDR: PropTypes.bool,

  /**
   * The param name to use as our timestamp key
   * @default 't'
   */
  timestampParam: PropTypes.string,

  /**
   * Whether to add the timestamp with each transport request. Note: this
   * is ignored if the browser is IE or Android, in which case requests
   * are always stamped
   * @default false
   */
  timestampRequests: PropTypes.bool,

  /**
   * A list of transports to try (in order). Engine.io always attempts to
   * connect directly with the first one, provided the feature detection test
   * for it passes.
   * @default ['polling','websocket']
   */
  transports: PropTypes.arrayOf(PropTypes.string),

  /**
   * The port the policy server listens on
   * @default 843
   */
  policyPost: PropTypes.number,

  /**
   * If true and if the previous websocket connection to the server succeeded,
   * the connection attempt will bypass the normal upgrade process and will
   * initially try websocket. A connection attempt following a transport error
   * will use the normal upgrade process. It is recommended you turn this on
   * only when using SSL/TLS connections, or if you know that your network does
   * not block websockets.
   * @default false
   */
  rememberUpgrade: PropTypes.bool,

  /**
   * Are we only interested in transports that support binary?
   */
  onlyBinaryUpgrades: PropTypes.bool,

  /**
   * Transport options for Node.js client (headers etc)
   */
  transportOptions: PropTypes.object,

  /**
   * (SSL) Certificate, Private key and CA certificates to use for SSL.
   * Can be used in Node.js client environment to manually specify
   * certificate information.
   */
  pfx: PropTypes.string,

  /**
   * (SSL) Private key to use for SSL. Can be used in Node.js client
   * environment to manually specify certificate information.
   */
  key: PropTypes.string,

  /**
   * (SSL) A string or passphrase for the private key or pfx. Can be
   * used in Node.js client environment to manually specify certificate
   * information.
   */
  passphrase: PropTypes.string,

  /**
   * (SSL) Public x509 certificate to use. Can be used in Node.js client
   * environment to manually specify certificate information.
   */
  cert: PropTypes.string,

  /**
   * (SSL) An authority certificate or array of authority certificates to
   * check the remote host against.. Can be used in Node.js client
   * environment to manually specify certificate information.
   */
  ca: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  /**
   * (SSL) A string describing the ciphers to use or exclude. Consult the
   * [cipher format list]
   * (http://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT) for
   * details on the format.. Can be used in Node.js client environment to
   * manually specify certificate information.
   */
  ciphers: PropTypes.string,

  /**
   * (SSL) If true, the server certificate is verified against the list of
   * supplied CAs. An 'error' event is emitted if verification fails.
   * Verification happens at the connection level, before the HTTP request
   * is sent. Can be used in Node.js client environment to manually specify
   * certificate information.
   */
  rejectUnauthorized: PropTypes.bool,
};

const connectionCallbacksShape = {
  connect: PropTypes.func,
  disconnect: PropTypes.func,
  reconnect: PropTypes.func,
  reconnecting: PropTypes.func,
  reconnect_error: PropTypes.func,
  reconnect_failed: PropTypes.func,
};

const feathersSocketioOptionsShape = {
  events: PropTypes.arrayOf(PropTypes.func),
  name: PropTypes.string,
  connection: PropTypes.object,
  method: PropTypes.string,
  timeout: PropTypes.number,
};

const feathersAuthOptionsShape = {
  header: PropTypes.string,
  cookie: PropTypes.string,
  storageKey: PropTypes.string,
  jwtStrategy: PropTypes.string,
  path: PropTypes.string,
  entity: PropTypes.string,
  service: PropTypes.string,
  timeout: PropTypes.number,
};

export const feathersWrapperPropTypes = {
  children: PropTypes.node.isRequired,
  wsEndpoint: PropTypes.string.isRequired,
  loader: PropTypes.node,
  socketioOptions: PropTypes.shape(socketioOptionsShape),
  connectionCallbacks: PropTypes.shape(connectionCallbacksShape),
  feathersSocketioOptions: PropTypes.shape(feathersSocketioOptionsShape),
  feathersAuthOptions: PropTypes.shape(feathersAuthOptionsShape),
  idField: PropTypes.string
};

export const feathersWrapperDefaultProps = {
  wsEndpoint: 'http://127.0.0.1:3030',
  loader: null,
  socketioOptions: {},
  feathersSocketioOptions: {
    timeout: 500,
  },
  connectionCallbacks: {},
  // default props found in the package
  authOptionsShape: {},
  idField: "id"
};
