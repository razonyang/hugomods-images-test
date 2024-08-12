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

/***/ "./src/common/common.ts":
/*!******************************!*\
  !*** ./src/common/common.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/js/dist/alert */ \"../node_modules/bootstrap/js/dist/alert.js\");\n/* harmony import */ var bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_alert__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_js_dist_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/dist/button */ \"../node_modules/bootstrap/js/dist/button.js\");\n/* harmony import */ var bootstrap_js_dist_button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_button__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap/js/dist/carousel */ \"../node_modules/bootstrap/js/dist/carousel.js\");\n/* harmony import */ var bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var bootstrap_js_dist_collapse__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bootstrap/js/dist/collapse */ \"../node_modules/bootstrap/js/dist/collapse.js\");\n/* harmony import */ var bootstrap_js_dist_collapse__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_collapse__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bootstrap/js/dist/dropdown */ \"../node_modules/bootstrap/js/dist/dropdown.js\");\n/* harmony import */ var bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_dropdown__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/js/dist/modal */ \"../node_modules/bootstrap/js/dist/modal.js\");\n/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var bootstrap_js_dist_offcanvas__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! bootstrap/js/dist/offcanvas */ \"../node_modules/bootstrap/js/dist/offcanvas.js\");\n/* harmony import */ var bootstrap_js_dist_offcanvas__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_offcanvas__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ \"../node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! aos */ \"../node_modules/aos/dist/aos.js\");\n/* harmony import */ var aos__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(aos__WEBPACK_IMPORTED_MODULE_8__);\n\n\n\n\n\n\n\n\n// import Popover from 'bootstrap/js/dist/popover';\n// import ScrollSpy from 'bootstrap/js/dist/scrollspy';\n// import Tab from 'bootstrap/js/dist/tab';\n// import Toast from 'bootstrap/js/dist/toast';\n// import Tooltip from 'bootstrap/js/dist/tooltip';\n\nwindow.$ = window.jquery = (jquery__WEBPACK_IMPORTED_MODULE_7___default());\n\n\nfunction aos_init() {\n  aos__WEBPACK_IMPORTED_MODULE_8___default().init({\n    duration: 500,\n    easing: \"ease-in-out\",\n    once: true,\n    mirror: false\n  });\n}\nwindow.addEventListener('load', () => {\n  aos_init();\n});\njquery__WEBPACK_IMPORTED_MODULE_7___default()(() => {\n  /**\n   * Back to top button\n   */\n  let backtotop = jquery__WEBPACK_IMPORTED_MODULE_7___default()('#back-to-top');\n  if (backtotop) {\n    const toggleBacktotop = () => {\n      if (window.scrollY > 100) {\n        backtotop.addClass('active');\n      } else {\n        backtotop.removeClass('active');\n      }\n    };\n    jquery__WEBPACK_IMPORTED_MODULE_7___default()(window).on('load', toggleBacktotop);\n    jquery__WEBPACK_IMPORTED_MODULE_7___default()(document).on('scroll', toggleBacktotop);\n  }\n});\n\n//# sourceURL=webpack:///./src/common/common.ts?");

/***/ }),

/***/ "./src/forLayout/verify.ts":
/*!*********************************!*\
  !*** ./src/forLayout/verify.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common */ \"./src/common/common.ts\");\n/* harmony import */ var _lib_getQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/getQuery */ \"./src/lib/getQuery.ts\");\n/* harmony import */ var _graphql_shopClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphql/shopClient */ \"./src/graphql/shopClient.ts\");\n\n\n\nasync function checkQueryParams() {\n  const params = (0,_lib_getQuery__WEBPACK_IMPORTED_MODULE_2__.getQueryParams)();\n  const contentEl = document.getElementById('pageContent');\n  if (!contentEl) {\n    console.warn(\"No page content element found, waiting and trying again\");\n    setTimeout(checkQueryParams, 250);\n    return;\n  }\n  if (!params.token) {\n    // No token, redirect to registration page\n    window.location.href = '/account/register';\n  } else {\n    // Try to verify the token\n    try {\n      const result = await _graphql_shopClient__WEBPACK_IMPORTED_MODULE_1__.shopSdk.verifyCustomerAccount({\n        token: params.token.trim()\n      });\n      const data = result.verifyCustomerAccount;\n      if (data.__typename === 'CurrentUser') {\n        // It worked, so we are good!\n        const nextUrl = sessionStorage.getItem('nextUrl') || '/shop';\n        sessionStorage.removeItem('nextUrl');\n        contentEl.innerText = \"Success! Redirecting now...\";\n        setTimeout(function () {\n          // navigate to nextUrl\n          window.location.href = nextUrl;\n          //your code to be executed after 1 second\n        }, 2000);\n        return;\n      }\n      let msgHtml = `\n        <div class=\"alert alert-success w-100 w-md-50 text-center\" role=\"alert\">\n          <h4 class=\"alert-heading\">Already logged in</h4>\n          <p>This token is invalid, has been used, or has expired -- but you are already logged in.</p>\n\n          <a href=\"/shop\" class=\"btn btn-ss-iris\">Keep Shopping</a>\n        </div>\n      `;\n      window._userMessage = {\n        element: contentEl,\n        html: msgHtml\n      };\n      if (window.current_user) {\n        // We're already logged in\n        contentEl.innerHTML = msgHtml;\n        return;\n      }\n      let message = '';\n      switch (data.__typename) {\n        case 'VerificationTokenExpiredError':\n          message = \"This verification token has expired.\";\n          break;\n        case 'VerificationTokenInvalidError':\n          message = \"This verification token has expired or is invalid.\";\n          break;\n        default:\n          message = \"Could not verify token: \" + data.__typename + \" - \" + data.message;\n          break;\n      }\n      msgHtml = `\n        <div class=\"alert alert-warning w-100 w-md-50 text-center\" role=\"alert\">\n          <h4 class=\"alert-heading\">Verification failed</h4>\n          <p>${message}</p>\n\n          <a href=\"/account/register\" class=\"btn btn-ss-iris\">Register</a>\n        </div>\n      `;\n    } catch (err) {\n      console.error(\"Error verifying token:\", err);\n      contentEl.innerText = \"Error verifying token: \" + err.message;\n    }\n  }\n}\ncheckQueryParams().catch(err => console.error(\"Error checking query params:\", err));\ndocument.getElementById('pageContent')?.classList.add('justify-content-center');\n\n//# sourceURL=webpack:///./src/forLayout/verify.ts?");

/***/ }),

/***/ "./src/lib/getQuery.ts":
/*!*****************************!*\
  !*** ./src/lib/getQuery.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getQueryParams: () => (/* binding */ getQueryParams)\n/* harmony export */ });\nfunction getQueryParams() {\n  const params = new URLSearchParams(window.location.search);\n  const parameters = Object.fromEntries(params);\n  return parameters;\n}\n\n//# sourceURL=webpack:///./src/lib/getQuery.ts?");

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
/******/ 			"forLayout/verify": 0,
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_graphql-tag_lib_index_js-node_modules_graphql_index_js","vendors-node_modules_bootstrap_js_dist_modal_js","vendors-node_modules_aos_dist_aos_js-node_modules_bootstrap_js_dist_alert_js-node_modules_boo-6d8737","src_graphql_shopClient_ts","src_common_main_scss"], () => (__webpack_require__("./src/forLayout/verify.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;