import "../../html-parser.js";
import { openBlock, createElementBlock, createElementVNode, createCommentVNode } from "vue";
import { _ as _export_sfc } from "../../_plugin-vue_export-helper.js";
const _style_0 = { "content": { "": { "minHeight": 100, "height": 100 } }, "goods": { "": { "height": 180, "position": "relative", "backgroundColor": "#cccccc", "flexDirection": "row", "overflow": "hidden" } }, "goods-img": { "": { "flex": 1 } }, "title-area": { "": { "position": "absolute", "left": 15, "right": 15, "bottom": 15, "zIndex": 11 } }, "title-text": { "": { "fontSize": 16, "fontWeight": "400", "lineHeight": 20, "lines": 2, "color": "#ffffff", "overflow": "hidden" } }, "article-title": { "": { "paddingTop": 10, "paddingRight": 15, "paddingBottom": 0, "paddingLeft": 15 } }, "article-title-text": { "": { "fontSize": 26 } }, "article-meta": { "": { "paddingTop": 10, "paddingRight": 15, "paddingBottom": 10, "paddingLeft": 15, "flexDirection": "row", "alignItems": "center", "justifyContent": "flex-start" } }, "article-meta-text": { "": { "color": "#808080" } }, "article-text": { "": { "fontSize": 12, "lineHeight": 25, "marginTop": 0, "marginRight": 10, "marginBottom": 0, "marginLeft": 10 } }, "article-author": { "": { "fontSize": 15 } }, "article-time": { "": { "fontSize": 15 } }, "article-content": { "": { "fontSize": 15, "marginBottom": 15, "overflow": "hidden", "height": 100, "minHeight": 100, "content::after": '""', "width::after": 100, "backgroundColor::after": "rgba(0,0,0,0)" } } };
const _sfc_main = {
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
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "content" }, [
      createElementVNode("view", { class: "article-content" }, [
        createCommentVNode(' <iframe width="100%" height="100%" src="{{url}}"></iframe> '),
        createElementVNode("u-web-view", {
          src: $data.url,
          class: "webpage"
        }, null, 8, ["src"])
      ]),
      createElementVNode("view", { class: "comment-wrap" })
    ])
  ]);
}
const detail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "/Users/licat/Desktop/project/planttitle-app/pages/mall/detail.nvue"]]);
export {
  detail as default
};
