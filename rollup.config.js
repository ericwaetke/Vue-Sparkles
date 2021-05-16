// @ts-nocheck
import vue from 'rollup-plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import pascalcase from 'pascalcase'
import path from 'path'
import del from 'rollup-plugin-delete'

const pkg = require('./package.json')

function getAuthors(pkg) {
  const { contributors, author } = pkg

  const authors = new Set()

  if (contributors && contributors)
    contributors.forEach((contributor) => {
      authors.add(contributor.name)
    })

  if (author) authors.add(author.name)

  return Array.from(authors).join(', ')
}

const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} ${getAuthors(pkg)}
  */`

const outputConfigs = {
  // each file name has the format: `dist/${name}.${format}.js`
  // format being a key of this object
  esm: {
    dir: 'dist/esm',
    format: `es`,
  },
  cjs: {
    dir: 'dist/cjs',
    format: 'cjs',
    exports: 'named',
  },
  global: {
    dir: 'dist/global',
    format: 'iife',
  },
}

const allFormats = Object.keys(outputConfigs)
const packageFormats = allFormats
const packageConfigs = packageFormats.map((format) =>
  format === 'global'
    ? createMinifiedConfig(format)
    : createConfig(format, outputConfigs[format]),
)

export default packageConfigs

function createConfig(format, output, plugins = []) {
  if (!output) {
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    process.exit(1)
  }

  output.sourcemap = !!process.env.SOURCE_MAP
  output.banner = banner
  output.externalLiveBindings = false
  output.globals = { vue: 'Vue' }

  const isProductionBuild = /\.prod\.js$/.test(output.file)
  const isGlobalBuild = format === 'global'
  const isRawESMBuild = format === 'esm'
  const isNodeBuild = format === 'cjs'
  const isBundlerESMBuild = /esm-bundler/.test(format)

  if (isGlobalBuild) output.name = pascalcase(pkg.name)

  const external = ['vue']

  if (!isGlobalBuild) {
    external.push('vue-demi')
  }

  const nodePlugins = [resolve(), commonjs(), vue({})]

  return {
    input: `src/entry.js`,
    // Global and Browser ESM builds inlines everything so that they can be
    // used alone.
    external,
    inlineDynamicImports: isGlobalBuild,
    plugins: [
      del({ targets: `dist/${format}` }),
      createReplacePlugin(
        isProductionBuild,
        isBundlerESMBuild,
        isGlobalBuild || isRawESMBuild || isBundlerESMBuild,
        isGlobalBuild,
        isNodeBuild,
      ),
      ...nodePlugins,
      ...plugins,
    ],
    output,
  }
}

function createReplacePlugin(
  isProduction,
  isBundlerESMBuild,
  isBrowserBuild,
  isGlobalBuild,
  isNodeBuild,
) {
  const replacements = {
    __COMMIT__: `"${process.env.COMMIT}"`,
    __VERSION__: `"${pkg.version}"`,
    __DEV__: isBundlerESMBuild
      ? // preserve to be handled by bundlers
        `(process.env.NODE_ENV !== 'production')`
      : // hard coded dev/prod builds
        !isProduction,
    // this is only used during tests
    __TEST__: isBundlerESMBuild ? `(process.env.NODE_ENV === 'test')` : false,
    // If the build is expected to run directly in the browser (global / esm builds)
    __BROWSER__: isBrowserBuild,
    // is targeting bundlers?
    __BUNDLER__: isBundlerESMBuild,
    __GLOBAL__: isGlobalBuild,
    // is targeting Node (SSR)?
    __NODE_JS__: isNodeBuild,
  }

  // allow inline overrides like
  //__RUNTIME_COMPILE__=true yarn build
  Object.keys(replacements).forEach((key) => {
    if (key in process.env) {
      replacements[key] = process.env[key]
    }
  })

  return replace(replacements)
}

function createMinifiedConfig(format) {
    const { terser } = require('rollup-plugin-terser')
  
    return createConfig(
      format,
      {
        dir: `dist/${format}/`,
        format: outputConfigs[format].format,
      },
      [
        terser({
          module: /^esm/.test(format),
          compress: {
            ecma: 2015,
            pure_getters: true,
          },
        }),
      ],
    )
  }