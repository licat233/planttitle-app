"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // vue-ns:vue
  var require_vue = __commonJS({
    "vue-ns:vue"(exports, module) {
      module.exports = Vue;
    }
  });

  // ../../../../../../Users/licat/Desktop/project/planttitle-app/unpackage/dist/dev/.nvue/uni-app.es.js
  var import_vue = __toESM(require_vue());

  // ../../../../../../Users/licat/Desktop/project/planttitle-app/unpackage/dist/dev/.nvue/html-parser.js
  var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
  var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");
  var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");
  var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");
  var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");
  var special = makeMap("script,style");
  function makeMap(str) {
    var obj = {};
    var items = str.split(",");
    for (var i = 0; i < items.length; i++) {
      obj[items[i]] = true;
    }
    return obj;
  }

  // ../../../../../../Users/licat/Desktop/project/planttitle-app/unpackage/dist/dev/.nvue/pages/mall/detail.js
  var import_vue2 = __toESM(require_vue());

  // ../../../../../../Users/licat/Desktop/project/planttitle-app/unpackage/dist/dev/.nvue/_plugin-vue_export-helper.js
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };

  // ../../../../../../Users/licat/Desktop/project/planttitle-app/unpackage/dist/dev/.nvue/pages/mall/detail.js
  var _style_0 = { "content": { "": { "minHeight": 100, "height": 100 } }, "goods": { "": { "height": 180, "position": "relative", "backgroundColor": "#cccccc", "flexDirection": "row", "overflow": "hidden" } }, "goods-img": { "": { "flex": 1 } }, "title-area": { "": { "position": "absolute", "left": 15, "right": 15, "bottom": 15, "zIndex": 11 } }, "title-text": { "": { "fontSize": 16, "fontWeight": "400", "lineHeight": 20, "lines": 2, "color": "#ffffff", "overflow": "hidden" } }, "article-title": { "": { "paddingTop": 10, "paddingRight": 15, "paddingBottom": 0, "paddingLeft": 15 } }, "article-title-text": { "": { "fontSize": 26 } }, "article-meta": { "": { "paddingTop": 10, "paddingRight": 15, "paddingBottom": 10, "paddingLeft": 15, "flexDirection": "row", "alignItems": "center", "justifyContent": "flex-start" } }, "article-meta-text": { "": { "color": "#808080" } }, "article-text": { "": { "fontSize": 12, "lineHeight": 25, "marginTop": 0, "marginRight": 10, "marginBottom": 0, "marginLeft": 10 } }, "article-author": { "": { "fontSize": 15 } }, "article-time": { "": { "fontSize": 15 } }, "article-content": { "": { "fontSize": 15, "marginBottom": 15, "overflow": "hidden", "height": 100, "minHeight": 100, "content::after": '""', "width::after": 100, "backgroundColor::after": "rgba(0,0,0,0)" } } };
  var _sfc_main = {
    data() {
      return {
        goods: {},
        content: [],
        url: ""
      };
    },
    onShareAppMessage() {
      return {
        title: this.goods.title,
        path: "/pages/mall/detail?goods=" + JSON.stringify(this.goods)
      };
    },
    onLoad(event) {
      this.load(event.goods);
    },
    methods: {
      load(e) {
        if (typeof e === "undefined") {
          uni.switchTab({
            url: "/pages/mall/index"
          });
          return;
        }
        let p = decodeURIComponent(e);
        try {
          this.goods = JSON.parse(p);
        } catch (error) {
          uni.switchTab({
            url: "/pages/mall/index"
          });
          return;
        }
        uni.setNavigationBarTitle({
          title: this.goods.name
        });
        this.url = "https://www.planttitle.com/product/" + this.goods.id + ".html";
      }
      // getDetail() {
      // 	if (!this.goods.id) return __f__('error','at pages/mall/detail.nvue:82',"goods id undefined")
      // 	uni.request({
      // 		url: "https://www.planttitle.com/product/" + this.goods.id + ".html",
      // 		success: (result) => {
      // 			let content = FAIL_CONTENT
      // 			if (result.statusCode == 200) {
      // 				content = result.data
      // 			}
      // 			// const nodes = htmlParser(content);
      //
      // 			parseImgs(content)
      //
      // 			this.content = content
      // 		}
      // 	});
      // }
    },
    mounted() {
      uni.showTabBar();
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return (0, import_vue2.openBlock)(), (0, import_vue2.createElementBlock)("scroll-view", {
      scrollY: true,
      showScrollbar: true,
      enableBackToTop: true,
      bubble: "true",
      style: { flexDirection: "column" }
    }, [
      (0, import_vue2.createElementVNode)("view", { class: "content" }, [
        (0, import_vue2.createElementVNode)("view", { class: "article-content" }, [
          (0, import_vue2.createCommentVNode)(' <iframe width="100%" height="100%" src="{{url}}"></iframe> '),
          (0, import_vue2.createElementVNode)("u-web-view", {
            src: $data.url,
            class: "webpage"
          }, null, 8, ["src"])
        ]),
        (0, import_vue2.createElementVNode)("view", { class: "comment-wrap" })
      ])
    ]);
  }
  var detail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "/Users/licat/Desktop/project/planttitle-app/pages/mall/detail.nvue"]]);

  // <stdin>
  var webview = plus.webview.currentWebview();
  if (webview) {
    const __pageId = parseInt(webview.id);
    const __pagePath = "pages/mall/detail";
    let __pageQuery = {};
    try {
      __pageQuery = JSON.parse(webview.__query__);
    } catch (e) {
    }
    detail.mpType = "page";
    const app = Vue.createPageApp(detail, { $store: getApp({ allowDefault: true }).$store, __pageId, __pagePath, __pageQuery });
    app.provide("__globalStyles", Vue.useCssStyles([...__uniConfig.styles, ...detail.styles || []]));
    app.mount("#root");
  }
})();
