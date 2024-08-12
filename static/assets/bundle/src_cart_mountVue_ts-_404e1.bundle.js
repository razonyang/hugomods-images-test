"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["src_cart_mountVue_ts-_404e1","src_cart_mountVue_ts-_404e0"],{

/***/ "./src/cart/mountVue.ts":
/*!******************************!*\
  !*** ./src/cart/mountVue.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initializeVue: () => (/* binding */ initializeVue),\n/* harmony export */   mountComponent: () => (/* binding */ mountComponent)\n/* harmony export */ });\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"../node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n/* harmony import */ var pinia__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pinia */ \"../node_modules/pinia/dist/pinia.mjs\");\n\n\n// import CartPanelComponent from './cartPanel.vue';\n// import CartButtonComponent from './cartButton.vue';\nfunction mountComponent(elem, component, props) {\n  console.log(\"Mounting component\", component.name ?? 'unnamed component', \"to\", elem);\n  const app = window._vApp;\n  let vNode = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(component, props);\n  vNode.appContext = app._context;\n  elem.innerHTML = '';\n  (0,vue__WEBPACK_IMPORTED_MODULE_0__.render)(vNode, elem);\n  return vNode.component;\n}\nfunction initializeVue() {\n  console.log(\"Initializing Vue\");\n  if (window._vApp) {\n    console.log(\"Already initialized! as it should be\");\n    return;\n  } else {\n    // create fake mount point\n    const $app = document.createElement('div');\n    $app.id = 'app-23408512432';\n    $app.style.display = 'none';\n    document.body.appendChild($app);\n    const app = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)({\n      render() {}\n    });\n    window._vApp = app;\n    app.mount(`#${$app.id}`);\n    const pinia = (0,pinia__WEBPACK_IMPORTED_MODULE_1__.createPinia)();\n    app.use(pinia);\n    console.log(\"Pinia set up\");\n  }\n}\n\n//# sourceURL=webpack:///./src/cart/mountVue.ts?");

/***/ })

}]);