"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(globalThis["webpackChunk"] = globalThis["webpackChunk"] || []).push([["src_lib_useLazyAsyncState_ts"],{

/***/ "./src/lib/useLazyAsyncState.ts":
/*!**************************************!*\
  !*** ./src/lib/useLazyAsyncState.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useLazyAsyncState: () => (/* binding */ useLazyAsyncState)\n/* harmony export */ });\n/* harmony import */ var _vueuse_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vueuse/core */ \"../node_modules/@vueuse/core/index.mjs\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"../node_modules/vue/dist/vue.runtime.esm-bundler.js\");\n\n\nconst uninitialized = Symbol('uninitialized');\nfunction useLazyAsyncState(promise, initialState, options, name) {\n  const opts = {\n    immediate: false,\n    // The whole thing is a waste of time if we do it immediately =]\n    ...options\n  };\n  const ret = (0,_vueuse_core__WEBPACK_IMPORTED_MODULE_1__.useAsyncState)(promise, uninitialized, opts);\n  return {\n    ...ret,\n    state: (0,vue__WEBPACK_IMPORTED_MODULE_0__.computed)(() => {\n      if (ret.state.value === uninitialized) {\n        if (!ret.isLoading.value) {\n          // if (name) {\n          //   console.warn(`Lazy state ${name} is uninitialized, executing refresh`);\n          // }\n          ret.execute();\n          // ret.execute().then(() => {\n          //   if (name) {\n          //     console.warn(`Lazy state ${name} should be initialized, refresh complete`);\n          //   }\n          // });\n        }\n        //  else {\n        //   if (name) {\n        //     console.warn(`Lazy state ${name} is uninitialized but loading`);\n        //   }\n        // }\n        return initialState;\n      }\n      // if (name) {\n      //   console.warn(`Lazy state ${name} is initialized`);\n      // }\n      return ret.state.value;\n    })\n  };\n}\n\n//# sourceURL=webpack:///./src/lib/useLazyAsyncState.ts?");

/***/ })

}]);