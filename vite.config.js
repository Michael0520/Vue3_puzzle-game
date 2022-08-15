import vue from "@vitejs/plugin-vue";
import path from "path";
import {
  defineConfig,
  loadEnv
} from "vite";

export default ({
  mode
}) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd())
  };
  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME

  return defineConfig({
    plugins: [vue()],
    base: '/Vue3_puzzle-game/', // 对应GitHub项目名称

    // rollupOptions: {
    //   input: {
    //     example: path.resolve(process.cwd(), "index.html"), // 把页面放在外面，路径简短 防止src/packages/web/index.html ，建议vite把key(web、lib)可也阔以映射成页面路径，就避免这个问题
    //     lib: path.resolve(process.cwd(), "lib.html"),
    //   },
    // },
    resolve: {
      extensions: [
        ".ts",
        ".tsx",
        ".vue",
        ".js",
        ".jsx",
        ".json",
        ".css",
        ".scss",
        ".pug",
      ],

      alias: {
        "@": path.resolve(__dirname, "src"),
        components: path.resolve(__dirname, "src/components"),
        styles: path.resolve(__dirname, "src/styles"),
        views: path.resolve(__dirname, "src/views"),
        layouts: path.resolve(__dirname, "src/layouts"),
        utils: path.resolve(__dirname, "src/utils"),
        animation: path.resolve(__dirname, "src/animation"),
      },
    },
    server: {
      port: 8080,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: "http://192.168.1.4:8181/",
          changeOrigin: true, //是否跨域
          secure: false,
        },
        "/storages": {
          target: "http://192.168.1.4:81/",
          changeOrigin: true, //是否跨域
          secure: false,
        },
      },
    },
    build: {
      // 容量大小警告
      chunkSizeWarningLimit: 600,
      // 關閉 CSS 程式碼拆分
      cssCodeSplit: false,
      //構建後生成的 source map 檔案，會等於生產環境的命名
      sourcemap: process.env.NODE === "production",
    },
  });
};