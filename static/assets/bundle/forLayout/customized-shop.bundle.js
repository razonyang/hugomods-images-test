/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/forLayout/customized-shop.ts":
/*!******************************************!*\
  !*** ./src/forLayout/customized-shop.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common */ \"./src/common/common.ts\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ \"../node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_modelLookup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/modelLookup */ \"./src/lib/modelLookup.ts\");\n\n\n\nfunction getQueryParams(url) {\n  const paramArr = url.slice(url.indexOf(\"?\") + 1).split(\"&\");\n  const params = {};\n  paramArr.map(param => {\n    const [key, val] = param.split(\"=\");\n    params[key] = decodeURIComponent(val);\n  });\n  return params;\n}\njquery__WEBPACK_IMPORTED_MODULE_1___default()(() => {\n  jquery__WEBPACK_IMPORTED_MODULE_1___default()(\".modelSelectorForm\").trigger(\"reset\");\n  jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#radioBrandSelector\").on(\"change\", function () {\n    (0,_lib_modelLookup__WEBPACK_IMPORTED_MODULE_2__.populateModel)(jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#radioBrandSelector\"), jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#radioModelSelector\"));\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#radioModelSelector\").on(\"change\", function () {\n    const brand = jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#radioBrandSelector\").val();\n    const model = jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#radioModelSelector\").val();\n    filterByModel(brand, model);\n  });\n  const brandSelector = jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#radioBrandSelector\");\n  const modelSelector = jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#radioModelSelector\");\n  jquery__WEBPACK_IMPORTED_MODULE_1___default()(\".modelSelectorForm\").on(\"submit\", function (e) {\n    e.preventDefault();\n    const brand = brandSelector.val();\n    const model = modelSelector.val();\n    if (brand && model) {\n      window.location.href = `/customized-shop?brand=${brand}&model=${model}`;\n    } else {\n      jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#selectBoth\").css(\"display\", \"block\");\n    }\n  });\n  const {\n    brand,\n    model\n  } = getQueryParams(window.location.href);\n  (0,_lib_modelLookup__WEBPACK_IMPORTED_MODULE_2__.populateBrands)(brandSelector);\n  if (brand) {\n    brandSelector.val(brand);\n  }\n  (0,_lib_modelLookup__WEBPACK_IMPORTED_MODULE_2__.populateModel)(brandSelector, modelSelector);\n  if (model) {\n    modelSelector.val(model);\n  }\n  filterByModel(brand, model);\n  function filterByModel(brand, model) {\n    const modelInfo = (0,_lib_modelLookup__WEBPACK_IMPORTED_MODULE_2__.getModelInfo)(brand, model);\n    if (!modelInfo) {\n      window.location.href = \"/shop\";\n      return;\n    }\n    let text = `${modelInfo.connector} connector fits your model`;\n    const spacerNumber = isNaN(Number(modelInfo.spacer)) ? 0 : Number(modelInfo.spacer);\n    let show3d = false;\n    let showSpacer = false;\n    if (modelInfo.spacer == \"3d\") {\n      text += `, 3D-printed spacer recommended`;\n      show3d = true;\n    } else if (modelInfo.spacer == \"?\") {\n      text += `, we don't know if you need a spacer or not`;\n      showSpacer = true;\n    } else if (spacerNumber == 0) {\n      text += ` with no spacer needed`;\n    } else if (spacerNumber == 1) {\n      text += ` with a spacer recommended`;\n      showSpacer = true;\n    } else {\n      text += `with ${spacerNumber} spacers needed`;\n      showSpacer = true;\n    }\n    const textEl = jquery__WEBPACK_IMPORTED_MODULE_1___default()(\"#customized-shop-text\");\n    textEl.empty();\n    textEl.append(text);\n    textEl.show();\n    const prodCards = jquery__WEBPACK_IMPORTED_MODULE_1___default()(\".prod-card\");\n    if (prodCards.length > 0) {\n      prodCards.each((index, product) => {\n        const connector = jquery__WEBPACK_IMPORTED_MODULE_1___default()(product).data(\"connector\").toLowerCase().replace(/[\\[\\]]/g, \"\").split(\" \");\n        if (connector.includes(modelInfo.connector.toLowerCase())) {\n          jquery__WEBPACK_IMPORTED_MODULE_1___default()(product).parent().show();\n        } else {\n          const slug = jquery__WEBPACK_IMPORTED_MODULE_1___default()(product).data(\"slug\");\n          if (slug == \"spacer-3dprinted\") {\n            if (show3d) {\n              jquery__WEBPACK_IMPORTED_MODULE_1___default()(product).parent().show();\n            } else {\n              jquery__WEBPACK_IMPORTED_MODULE_1___default()(product).parent().hide();\n            }\n          } else if (slug == \"spacer-rubber\") {\n            if (showSpacer) {\n              jquery__WEBPACK_IMPORTED_MODULE_1___default()(product).parent().show();\n            } else {\n              jquery__WEBPACK_IMPORTED_MODULE_1___default()(product).parent().hide();\n            }\n          } else {\n            jquery__WEBPACK_IMPORTED_MODULE_1___default()(product).parent().hide();\n          }\n        }\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/forLayout/customized-shop.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"forLayout/customized-shop": 0,
/******/ 			"src_common_main_scss": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunk"] = globalThis["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_bootstrap_js_dist_modal_js","vendors-node_modules_aos_dist_aos_js-node_modules_bootstrap_js_dist_alert_js-node_modules_boo-6d8737","src_common_main_scss","src_common_common_ts-src_lib_modelLookup_ts"], () => (__webpack_require__("./src/forLayout/customized-shop.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;