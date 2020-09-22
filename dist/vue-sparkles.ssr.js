'use strict';Object.defineProperty(exports,'__esModule',{value:true});var Vue=require('vue');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vue__default=/*#__PURE__*/_interopDefaultLegacy(Vue);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: "SparkleInstance",
  props: {
    size: Number,
    appliedStyle: Object,
    color: String,
    createdAt: Number,
    appliedKey: String,
    path: String
  },
  mounted: function mounted() {
    var _this = this;

    window.setTimeout(function () {
      _this.$destroy();

      _this.$el.parentNode.removeChild(_this.$el);
    }, 600);
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group =  css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    key: _vm.appliedKey,
    staticClass: "sparkleWrapper",
    style: _vm.appliedStyle,
    attrs: {
      "createdAt": _vm.createdAt
    }
  }, [_vm._ssrNode("<svg" + _vm._ssrAttr("width", _vm.size) + _vm._ssrAttr("height", _vm.size) + " viewBox=\"0 0 160 160\" fill=\"none\"><path" + _vm._ssrAttr("d", _vm.path) + _vm._ssrAttr("fill", _vm.color) + "></path></svg>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-ee1a390c_0", {
    source: ".sparkleWrapper{position:absolute;pointer-events:none;z-index:2;animation:growAndShrink .6s ease-in-out forwards}svg{animation:spin .6s linear forwards}@keyframes growAndShrink{0%{transform:scale(0)}50%{transform:scale(1)}100%{transform:scale(0)}}@keyframes spin{from{transform:rotate(0)}to{transform:rotate(180deg)}}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-ee1a390c";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);//
var script$1 = {
  name: "VueSparkles",
  data: function data() {
    return {
      instances: []
    };
  },
  props: {
    path: [String, Array],
    color: [String, Array]
  },
  methods: {
    generateSparkle: function generateSparkle() {
      return {
        id: String(this.random(10000, 99999)),
        createdAt: Date.now(),
        color: this.color,
        size: this.random(10, 20),
        style: {
          // Pick a random spot in the available space
          top: this.random(0, 100) + "%",
          left: this.random(0, 100) + "%",
          // Float sparkles above sibling content
          zIndex: this.random(1, 3)
        }
      };
    },
    random: function random(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    addSparkle: function addSparkle() {
      // Setting Path Values
      var sparklePath = "M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z";

      if (this.customPath && this.multiplePaths) {
        sparklePath = this.path[this.random(0, this.path.length - 1)];
      } else if (this.customPath) {
        sparklePath = this.path;
      } // Setting Color Values


      var sparkleColor = "hsl(50deg, 100%, 50%)";

      if (this.customColor && this.multipleColors) {
        sparkleColor = "hsl(" + this.random(parseInt(this.color[0].h), parseInt(this.color[1].h)) + "deg, " + this.random(parseInt(this.color[0].s), parseInt(this.color[1].s)) + "%, " + this.random(parseInt(this.color[0].l), parseInt(this.color[1].l)) + "%)";
      } else if (this.customColor) {
        sparkleColor = this.color;
      }

      var parent = this.$refs.wrapper;
      var sparkle = this.generateSparkle();
      var SparkleClass = Vue__default['default'].extend(__vue_component__);
      var instance = new SparkleClass({
        propsData: {
          color: sparkleColor,
          size: sparkle.size,
          appliedStyle: sparkle.style,
          key: sparkle.appliedKey,
          createdAt: sparkle.createdAt,
          path: sparklePath
        }
      });
      instance.$mount();
      parent.appendChild(instance.$el);
      this.instances.push(instance);
    },
    tick: function tick() {
      this.addSparkle();
      window.setTimeout(this.tick, this.random(50, 500));
    }
  },
  mounted: function mounted() {
    this.tick();
  },
  computed: {
    customPath: function customPath() {
      return this.path != null;
    },
    multiplePaths: function multiplePaths() {
      return Array.isArray(this.path);
    },
    customColor: function customColor() {
      return this.color != null;
    },
    multipleColors: function multipleColors() {
      return Array.isArray(this.color);
    }
  }
};/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    ref: "wrapper",
    staticClass: "vue-sparkles",
    attrs: {
      "id": "sparkleWrapper"
    }
  }, [_vm._ssrNode("<div class=\"sparkleChildWrapper\">", "</div>", [_vm._t("default")], 2)]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-f6c49704_0", {
    source: "#sparkleWrapper{position:relative;display:inline-block}.sparkleChildWrapper{position:relative;z-index:2;font-weight:700}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = "data-v-f6c49704";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);// Import vue component

var install = function installVueSparkles(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('VueSparkles', __vue_component__$1);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__$1.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__$1;