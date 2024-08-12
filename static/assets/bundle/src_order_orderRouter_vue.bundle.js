"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["src_order_orderRouter_vue"],{

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/ts-loader/index.js??clonedRuleSet-2.use[1]!../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[13].use[0]!./src/order/orderRouter.vue?vue&type=script&lang=ts&setup=true":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/babel-loader/lib/index.js!../node_modules/ts-loader/index.js??clonedRuleSet-2.use[1]!../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[13].use[0]!./src/order/orderRouter.vue?vue&type=script&lang=ts&setup=true ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"../node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var _orderRouter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orderRouter */ \"./src/order/orderRouter.ts\");\n\n\nconst __default__ = {\n  name: 'OrderRouter',\n  inheritAttrs: false,\n  customOptions: {}\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.defineComponent)({\n  ...__default__,\n  setup(__props, {\n    expose: __expose\n  }) {\n    __expose();\n    const $router = (0,_orderRouter__WEBPACK_IMPORTED_MODULE_1__.useRouter)();\n    const __returned__ = {\n      $router\n    };\n    Object.defineProperty(__returned__, '__isScriptSetup', {\n      enumerable: false,\n      value: true\n    });\n    return __returned__;\n  }\n}));\n\n//# sourceURL=webpack:///./src/order/orderRouter.vue?../node_modules/babel-loader/lib/index.js!../node_modules/ts-loader/index.js??clonedRuleSet-2.use%5B1%5D!../node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B13%5D.use%5B0%5D");

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js!../node_modules/ts-loader/index.js??clonedRuleSet-2.use[1]!../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[13].use[0]!./src/order/orderRouter.vue?vue&type=template&id=3d721d26&ts=true":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/babel-loader/lib/index.js!../node_modules/ts-loader/index.js??clonedRuleSet-2.use[1]!../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[13].use[0]!./src/order/orderRouter.vue?vue&type=template&id=3d721d26&ts=true ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"../node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\nconst _hoisted_1 = {\n  class: \"row\"\n};\nfunction render(_ctx, _cache, $props, $setup, $data, $options) {\n  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(\"div\", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(\" Loads the component returned by the router \"), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)((0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent)($setup.$router.curPage), {\n    routeContext: $setup.$router.curCtx\n  }, null, 8 /* PROPS */, [\"routeContext\"]))]);\n}\n\n//# sourceURL=webpack:///./src/order/orderRouter.vue?../node_modules/babel-loader/lib/index.js!../node_modules/ts-loader/index.js??clonedRuleSet-2.use%5B1%5D!../node_modules/vue-loader/dist/templateLoader.js??ruleSet%5B1%5D.rules%5B3%5D!../node_modules/vue-loader/dist/index.js??ruleSet%5B1%5D.rules%5B13%5D.use%5B0%5D");

/***/ }),

/***/ "./src/order/orderRouter.ts":
/*!**********************************!*\
  !*** ./src/order/orderRouter.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useRouter: () => (/* binding */ useRouter)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"../node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! pinia */ \"../node_modules/pinia/dist/pinia.mjs\");\n/* harmony import */ var page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! page */ \"../node_modules/page/page.js\");\n/* harmony import */ var page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(page__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\npage__WEBPACK_IMPORTED_MODULE_1___default().base(`/order`);\nconst routes = {\n  'tracking': ['/', Promise.all(/*! import() */[__webpack_require__.e(\"vendors-node_modules_graphql-tag_lib_index_js-node_modules_graphql_index_js\"), __webpack_require__.e(\"src_graphql_shopClient_ts\"), __webpack_require__.e(\"src_order_orderTracking_vue\")]).then(__webpack_require__.bind(__webpack_require__, /*! ./orderTracking.vue */ \"./src/order/orderTracking.vue\"))]\n};\nfunction isPromise(obj) {\n  return obj && typeof obj.then === 'function';\n}\n/**\n * Vue-router is a bit overkill for this, so we're just using page.js;\n * this store is just to keep track of the current page and provide\n * a navTo function to navigate to a page.\n */\nconst useRouter = (0,pinia__WEBPACK_IMPORTED_MODULE_2__.defineStore)('router', () => {\n  const curPage = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)('div');\n  const curCtx = (0,vue__WEBPACK_IMPORTED_MODULE_0__.ref)(null);\n  function navTo(path) {\n    console.log(\"Navigating to\", path, routes[path]);\n    page__WEBPACK_IMPORTED_MODULE_1___default()(routes[path][0]);\n  }\n  const routeTo = (route, path, component) => async ctx => {\n    console.warn(\"Navigating to\", route, path, component);\n    curPage.value = isPromise(component) ? (await component).default : component;\n    curCtx.value = ctx;\n  };\n  for (const [route, [path, component]] of Object.entries(routes)) {\n    page__WEBPACK_IMPORTED_MODULE_1___default()(path, routeTo(route, path, component));\n  }\n  page__WEBPACK_IMPORTED_MODULE_1___default()('*', routeTo('*', '*', routes.tracking[1]));\n  // Set up the page router options\n  page__WEBPACK_IMPORTED_MODULE_1___default().start({\n    dispatch: true\n    // hashbang: true,\n  });\n  return {\n    curPage,\n    curCtx,\n    navTo\n  };\n});\n\n\n//# sourceURL=webpack:///./src/order/orderRouter.ts?");

/***/ }),

/***/ "./src/order/orderRouter.vue":
/*!***********************************!*\
  !*** ./src/order/orderRouter.vue ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _orderRouter_vue_vue_type_template_id_3d721d26_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orderRouter.vue?vue&type=template&id=3d721d26&ts=true */ \"./src/order/orderRouter.vue?vue&type=template&id=3d721d26&ts=true\");\n/* harmony import */ var _orderRouter_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./orderRouter.vue?vue&type=script&lang=ts&setup=true */ \"./src/order/orderRouter.vue?vue&type=script&lang=ts&setup=true\");\n/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ \"../node_modules/vue-loader/dist/exportHelper.js\");\n\n\n\n\n;\nconst __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_orderRouter_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_1__[\"default\"], [['render',_orderRouter_vue_vue_type_template_id_3d721d26_ts_true__WEBPACK_IMPORTED_MODULE_0__.render],['__file',\"src/order/orderRouter.vue\"]])\n/* hot reload */\nif (false) {}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);\n\n//# sourceURL=webpack:///./src/order/orderRouter.vue?");

/***/ }),

/***/ "./src/order/orderRouter.vue?vue&type=script&lang=ts&setup=true":
/*!**********************************************************************!*\
  !*** ./src/order/orderRouter.vue?vue&type=script&lang=ts&setup=true ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_2_use_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_13_use_0_orderRouter_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_2_use_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_13_use_0_orderRouter_vue_vue_type_script_lang_ts_setup_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/ts-loader/index.js??clonedRuleSet-2.use[1]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[13].use[0]!./orderRouter.vue?vue&type=script&lang=ts&setup=true */ \"../node_modules/babel-loader/lib/index.js!../node_modules/ts-loader/index.js??clonedRuleSet-2.use[1]!../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[13].use[0]!./src/order/orderRouter.vue?vue&type=script&lang=ts&setup=true\");\n \n\n//# sourceURL=webpack:///./src/order/orderRouter.vue?");

/***/ }),

/***/ "./src/order/orderRouter.vue?vue&type=template&id=3d721d26&ts=true":
/*!*************************************************************************!*\
  !*** ./src/order/orderRouter.vue?vue&type=template&id=3d721d26&ts=true ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_2_use_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_13_use_0_orderRouter_vue_vue_type_template_id_3d721d26_ts_true__WEBPACK_IMPORTED_MODULE_0__.render)\n/* harmony export */ });\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_clonedRuleSet_2_use_1_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_3_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_13_use_0_orderRouter_vue_vue_type_template_id_3d721d26_ts_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js!../../../node_modules/ts-loader/index.js??clonedRuleSet-2.use[1]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[13].use[0]!./orderRouter.vue?vue&type=template&id=3d721d26&ts=true */ \"../node_modules/babel-loader/lib/index.js!../node_modules/ts-loader/index.js??clonedRuleSet-2.use[1]!../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[13].use[0]!./src/order/orderRouter.vue?vue&type=template&id=3d721d26&ts=true\");\n\n\n//# sourceURL=webpack:///./src/order/orderRouter.vue?");

/***/ })

}]);