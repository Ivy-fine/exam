import path from "path";
module.exports = {
  alias: {
    "@": path.resolve(__dirname, "./", "src")
  },
  extraBabelPlugins: [
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }]
  ],
  theme: "./theme-config.js",
  proxy: {
    "/api": {
      target: "http://localhost:7001",
      changeOrigin: true,
      pathRewrite: { "^/api": "" }
    }
  },
  define: {
    "process.env": {},
    "process.env.NODE_ENV": process.env.NODE_ENV,
    "process.env.API_ENV": process.env.API_ENV
  },
  html: {
    template: "./src/index.ejs"
  },
  env: {
    production: {
      publicPath: "/public/dist/"
    },
    development: {
      publicPath: "/"
    }
  },
  hash: true
};
