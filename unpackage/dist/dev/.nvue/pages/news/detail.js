import { p as parseHtml } from "../../html-parser.js";
import { resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, createVNode } from "vue";
import { _ as _export_sfc } from "../../_plugin-vue_export-helper.js";
const _style_0 = { "content": { "": { "minHeight": 100, "height": 100 } }, "banner": { "": { "height": 180, "position": "relative", "backgroundColor": "#cccccc", "flexDirection": "row", "overflow": "hidden" } }, "banner-img": { "": { "flex": 1 } }, "title-area": { "": { "position": "absolute", "left": 15, "right": 15, "bottom": 15, "zIndex": 11 } }, "title-text": { "": { "fontSize": 16, "fontWeight": "400", "lineHeight": 20, "lines": 2, "color": "#ffffff", "overflow": "hidden" } }, "article-title": { "": { "paddingTop": 10, "paddingRight": 15, "paddingBottom": 0, "paddingLeft": 15 } }, "article-title-text": { "": { "fontSize": 26 } }, "article-meta": { "": { "paddingTop": 10, "paddingRight": 15, "paddingBottom": 10, "paddingLeft": 15, "flexDirection": "row", "alignItems": "center", "justifyContent": "flex-start" } }, "article-meta-text": { "": { "color": "#808080" } }, "article-text": { "": { "fontSize": 12, "lineHeight": 25, "marginTop": 0, "marginRight": 10, "marginBottom": 0, "marginLeft": 10 } }, "article-author": { "": { "fontSize": 15 } }, "article-time": { "": { "fontSize": 15 } }, "article-content": { "": { "fontSize": 15, "paddingTop": 0, "paddingRight": 15, "paddingBottom": 0, "paddingLeft": 15, "marginBottom": 15, "overflow": "hidden", "content::after": '""', "width::after": 100, "backgroundColor::after": "rgba(0,0,0,0)" } } };
const FAIL_CONTENT = "<p>獲取信息失敗</p>";
function parseImgs(nodes) {
  nodes.forEach((node) => {
    if (node.name === "img" && node.attrs && node.attrs["data-img-size-val"]) {
      const sizes = node.attrs["data-img-size-val"].split(",");
      const width = uni.upx2px(720 * 0.9);
      const height = parseInt(width * (sizes[1] / sizes[0]));
      node.attrs.style = `width:${width};height:${height};`;
    }
    if (Array.isArray(node.children)) {
      parseImgs(node.children);
    }
  });
  return nodes;
}
const _sfc_main = {
  data() {
    return {
      banner: {},
      content: []
    };
  },
  onShareAppMessage() {
    return {
      title: this.banner.title,
      path: "/pages/news/detail?query=" + JSON.stringify(this.banner)
    };
  },
  onLoad(event) {
    this.load(event.query);
  },
  methods: {
    load(e) {
      if (typeof e === "undefined") {
        uni.switchTab({
          url: "/pages/news/index"
        });
        return;
      }
      let p = decodeURIComponent(e);
      try {
        this.banner = JSON.parse(p);
      } catch (error) {
        uni.switchTab({
          url: "/pages/news/index"
        });
        return;
      }
      uni.setNavigationBarTitle({
        title: this.banner.title
      });
      this.getDetail();
    },
    getDetail() {
      uni.request({
        url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + this.banner.post_id,
        success: (result) => {
          let content = FAIL_CONTENT;
          if (result.statusCode == 200) {
            content = result.data.content;
          }
          const nodes = parseHtml(content);
          parseImgs(nodes);
          this.content = nodes;
        }
      });
    }
  },
  mounted() {
    uni.showTabBar();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_rich_text = resolveComponent("rich-text");
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "content" }, [
      createElementVNode("view", {
        class: "banner",
        autoFocus: ""
      }, [
        createElementVNode("u-image", {
          class: "banner-img",
          src: $data.banner.image_url
        }, null, 8, ["src"]),
        createElementVNode("view", { class: "title-area" }, [
          createElementVNode(
            "u-text",
            { class: "title-text" },
            toDisplayString($data.banner.title),
            1
            /* TEXT */
          )
        ])
      ]),
      createElementVNode("view", { class: "article-title" }, [
        createElementVNode(
          "u-text",
          { class: "article-title-text" },
          toDisplayString($data.banner.title),
          1
          /* TEXT */
        )
      ]),
      createElementVNode("view", { class: "article-meta" }, [
        createElementVNode(
          "u-text",
          { class: "article-meta-text article-author" },
          toDisplayString($data.banner.source),
          1
          /* TEXT */
        ),
        createElementVNode("u-text", { class: "article-meta-text article-text" }, "發表於"),
        createElementVNode(
          "u-text",
          { class: "article-meta-text article-time" },
          toDisplayString($data.banner.datetime),
          1
          /* TEXT */
        )
      ]),
      createElementVNode("view", { class: "article-content" }, [
        createVNode(_component_rich_text, {
          nodes: $data.content,
          style: { "font-size": "14px" }
        }, null, 8, ["nodes"])
      ]),
      createElementVNode("view", { class: "comment-wrap" })
    ])
  ]);
}
const detail = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]], ["__file", "/Users/licat/Desktop/project/planttitle-app/pages/news/detail.nvue"]]);
export {
  detail as default
};
