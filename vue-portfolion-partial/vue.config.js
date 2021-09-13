const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
    configureWebpack: {
      plugins: [
        /* new PrerenderSPAPlugin({
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/early-stage', '/growth-stage', '/buy-out', '/coworkers', '/articles', '/companies', '/jobs', '/disclosures' ],
        }) */
      ],
      optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/, // this is what you are looking for
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      }
    },
    chainWebpack: config => {
      config.plugins.delete('prefetch')

      config.plugin('preload').tap((options) => {
        options[0].include = 'allChunks'
        return options
      })

      config.module
        .rule('vue')
        .use('vue-loader')
          .loader('vue-loader')
          .tap(options => {
            options.prettify = false
            return options
          })
    },
    pluginOptions: {
      sitemap: {
          productionOnly: true,
          urls: [
              'https://www.portfolion.hu/',
              'https://www.portfolion.hu/early-stage',
              'https://www.portfolion.hu/growth-stage',
              'https://www.portfolion.hu/buy-out',
              'https://www.portfolion.hu/coworkers',
              'https://www.portfolion.hu/articles',
              'https://www.portfolion.hu/companies'
          ]
      }
  }
  }