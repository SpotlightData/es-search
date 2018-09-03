module.exports = {
  use: [
    [
      "@neutrinojs/react-components",
      {
        env: ["TOKEN", "URL"],
        devServer: {
          // Disabling options.hot will also disable devServer.hot
          hot: true,
          // Proxy requests that don't match a known file to the specified backend.
          proxy: "https://127.0.0.1:9000/v1"
        }
      }
    ]
  ]
};
