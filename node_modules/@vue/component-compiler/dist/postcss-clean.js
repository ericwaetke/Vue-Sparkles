"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postcss = require("postcss");
// ESM import of clean-css breaks test/runtime check this fix for reference:
// https://github.com/vuejs/vue-component-compiler/pull/103#issuecomment-632676899
const CleanCSS = require('clean-css');
exports.default = postcss.plugin('clean', (options) => {
    const clean = new CleanCSS(Object.assign({ compatibility: 'ie9' }, options));
    return (css, res) => {
        const output = clean.minify(css.toString());
        res.root = postcss.parse(output.styles);
    };
});
