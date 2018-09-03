const { EnvironmentPlugin, DefinePlugin } = require("webpack");

const env = ["URL", "TOKEN", "PROJECT"].reduce(
  (dict, key) => ({ ...dict, [key]: JSON.stringify(process.env[key]) }),
  {}
);

module.exports = {
  use: [
    [
      "@neutrinojs/react-components",
      {
        devServer: {
          // Disabling options.hot will also disable devServer.hot
          hot: true,
          // Proxy requests that don't match a known file to the specified backend.
          proxy: "https://127.0.0.1:9000/v1"
        }
      }
    ],
    neutrino => {
      neutrino.config.plugin("env").use(DefinePlugin, [{ "process.env": env }]);
    }
  ]
};
