const withPlugins = require("next-compose-plugins")
const optimizedImages = require("next-optimized-images")
const withImages = require("next-images")
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)$/,
})
const path = require("path")

const prod = process.env.NODE_ENV === "production"
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const webpack = require("webpack")
const critters = require("critters-webpack-plugin")
const nextConfig = {
  target: "serverless",
  env: {
    // env variables here
  },
  webpack: (config, { dev, isServer }) => {
    // if (isServer) {
    //   return config
    // }
    // var isProduction = config.mode === "production"
    // if (!isProduction) {
    //   return config
    // }

    config.module.rules.push({
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: "file-loader",
    })

    config.module.rules.push({
      test: /\.html?$/i,
      use: "html-loader",
    })

    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      })
    )

    config.resolve.alias["components"] = path.join(__dirname, "components")
    config.resolve.alias["static"] = path.join(__dirname, "static")
    config.resolve.alias["src"] = path.join(__dirname, "src")

    config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}))
    return config
  },
}

const optimizeImageConfig = {
  // these are the default values so you don't have to provide them if they are good enough for your use-case.
  // but you can overwrite them here with any valid value you want.
  inlineImageLimit: 8192,
  imagesFolder: "images",
  imagesName: "[name]-[hash].[ext]",
  handleImages: ["jpeg", "png", "svg", "webp", "gif"],
  optimizeImages: true,
  optimizeImagesInDev: true,
  mozjpeg: {
    quality: 80,
  },
  optipng: {
    optimizationLevel: 3,
  },
  pngquant: false,
  // gifsicle: {
  //   interlaced: true,
  //   optimizationLevel: 3
  // },
  svgo: {
    // enable/disable svgo plugins here
  },
  webp: {
    preset: "default",
    quality: 75,
  },
}
const crittersConfig = {
  // Outputs: <link rel="preload" onload="this.rel='stylesheet'">
  preload: "js-lazy",
  noscriptFallback: true,
  // Don't inline critical font-face rules, but preload the font URLs:
  fonts: true,
  keyframes: "all",
}
module.exports = withImages(
  withMDX(
    withPlugins(
      [
        [new critters(), crittersConfig],
        [optimizedImages, optimizeImageConfig],
      ],
      nextConfig
    )
  )
)
