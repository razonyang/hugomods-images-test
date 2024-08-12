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

/***/ "./src/forLayout/products.ts":
/*!***********************************!*\
  !*** ./src/forLayout/products.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchProduct: () => (/* binding */ fetchProduct)\n/* harmony export */ });\n/* harmony import */ var _common_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common */ \"./src/common/common.ts\");\n/* harmony import */ var _graphql_shopClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphql/shopClient */ \"./src/graphql/shopClient.ts\");\n/* harmony import */ var _lib_bs5_lightbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/bs5-lightbox */ \"./src/lib/bs5-lightbox.ts\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ \"../node_modules/jquery/dist/jquery.js\");\n/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_getQuery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/getQuery */ \"./src/lib/getQuery.ts\");\n\n\n\n\n\nfunction setQueryParams(newParams) {\n  const url = new URL(window.location.href);\n  for (const [key, value] of Object.entries(newParams)) {\n    if (value) {\n      url.searchParams.set(key, value);\n    }\n  }\n  window.history.replaceState({}, '', url.toString());\n}\njquery__WEBPACK_IMPORTED_MODULE_3___default()(function () {\n  initializeGallery();\n  const params = (0,_lib_getQuery__WEBPACK_IMPORTED_MODULE_4__.getQueryParams)();\n  if (params.band) {\n    jquery__WEBPACK_IMPORTED_MODULE_3___default()(`#option-band-${params.band}`).prop(\"checked\", true);\n    if (params.color) {\n      jquery__WEBPACK_IMPORTED_MODULE_3___default()(`#option-color-${params.color}`).prop(\"checked\", true);\n    }\n  }\n  jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"section.products\").on(\"change\", \"select.product-options\", function () {\n    checkSelected();\n  });\n  jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"section.products\").on(\"click\", \"input[type=radio]\", function () {\n    const {\n      selectedOptions,\n      optionNames\n    } = getSelectedOptions();\n    const queryParmas = (0,_lib_getQuery__WEBPACK_IMPORTED_MODULE_4__.getQueryParams)();\n    setQueryParams({\n      ...queryParmas,\n      ...selectedOptions\n    });\n    checkSelected();\n  });\n  checkSelected();\n  refreshStock();\n});\nlet lightbox;\nfunction initializeGallery() {\n  const galleryContainer = jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#galleryContainer\");\n  lightbox = new _lib_bs5_lightbox__WEBPACK_IMPORTED_MODULE_2__[\"default\"](galleryContainer[0], {\n    gallery: \"product\",\n    size: \"xl\",\n    constrain: true\n  });\n  galleryContainer.on(\"click\", \"img\", function (e) {\n    const index = jquery__WEBPACK_IMPORTED_MODULE_3___default()(this).data(\"idx\") || 0;\n    lightbox.show();\n    lightbox.carousel?.to(index);\n  });\n}\nlet currentProduct = null;\nfunction updateVariantsFromExternal() {\n  if (!currentProduct) {\n    return;\n  }\n  const variantMap = window.productVariants;\n  for (const variant of currentProduct.variants) {\n    if (!variantMap) {\n      return;\n    } // no product map, forget it\n    const sku = variant.sku.toLowerCase();\n    if (variantMap?.[sku]) {\n      // only update if we already know it exists\n      const variantInfo = variantMap[sku];\n      variantInfo.price = (variant.price / 100).toFixed(2);\n      variantInfo.discountPrice = variant.discount_price ? (variant.discount_price / 100).toFixed(2) : \"\";\n      variantInfo.stockLevel = variant.stockLevel;\n    }\n  }\n}\nasync function fetchProduct(slug) {\n  const resp = await _graphql_shopClient__WEBPACK_IMPORTED_MODULE_1__.shopSdk.ProductSummary({\n    slug: {\n      eq: slug\n    }\n  });\n  const product = await resp;\n  if (!product?.products?.totalItems) {\n    throw new Error(`Could not get stock and pricing information for ${slug}`);\n  } else if (product.products.totalItems > 1) {\n    throw new Error(`Found more than one product with slug ${slug}`);\n  }\n  const p = product.products.items[0];\n  return {\n    id: p.id,\n    slug: p.slug,\n    updatedAt: p.updatedAt,\n    variants: p.variants.map(v => {\n      return {\n        id: v.id,\n        sku: v.sku,\n        price: v.price,\n        discount_price: v.customFields?.discount_price || 0,\n        options: Object.fromEntries(v.options.map(o => [o.group.code, o.code])),\n        stockLevel: v.stockLevel\n      };\n    })\n  };\n}\nasync function refreshStock() {\n  if (!window.productSlug) {\n    return;\n  }\n  currentProduct = await fetchProduct(window.productSlug);\n  updateVariantsFromExternal();\n  checkSelected();\n}\nfunction getStockClass(stockLevel) {\n  if (stockLevel === \"Backordered\") {\n    return \"danger\";\n  } else if (stockLevel !== \"In stock\") {\n    return \"warning\";\n  }\n  return \"success\";\n}\nfunction updateColorButtons(band) {\n  for (const variant of Object.values(window.productVariants || {})) {\n    if (variant.band.code !== band) {\n      continue;\n    }\n    const price = getPrice(variant, false);\n    const stockLevel = getStockLevel(variant);\n    const labelEl = jquery__WEBPACK_IMPORTED_MODULE_3___default()(`#option-color-${variant.color.code}-lbl`);\n    labelEl.html(`${variant.color.name} - ${price}<br /><span class=\"text-${getStockClass(stockLevel)}\">${stockLevel}</span>`);\n  }\n}\nfunction formatPriceRange(min, max) {\n  if (min === max) {\n    return `$${min.toFixed(2)}`;\n  }\n  return `$${min.toFixed(2)} - $${max.toFixed(2)}`;\n}\nfunction getPrice(variantToShow, showOriginal = true) {\n  const price = parseFloat(variantToShow.price);\n  const discountPrice = parseFloat(variantToShow.discountPrice || variantToShow.price);\n  if (!showOriginal || price === discountPrice) {\n    return `$${discountPrice.toFixed(2)}`;\n  } else {\n    return `$${discountPrice.toFixed(2)} <s class=\"price\">$${price.toFixed(2)}</s>`;\n  }\n}\nfunction getStockLevel(variantToShow) {\n  const stockLevel = variantToShow.stockLevel;\n  if (stockLevel === \"Backordered\") {\n    return 'Backordered';\n  } else {\n    const stockNum = parseInt(stockLevel, 10);\n    if (stockNum > 5) {\n      return `In stock`;\n    } else {\n      return `${stockNum} left`;\n    }\n  }\n}\nfunction showVariant(sku) {\n  const variantMap = window.productVariants;\n  const variantToShow = variantMap?.[sku];\n  if (!variantToShow) {\n    // Iterate over variants, find the highest and lowest prices\n    let maxPrice = 0;\n    let maxDiscountPrice = 0;\n    let minPrice = Infinity;\n    let minDiscountPrice = Infinity;\n    for (const variant of Object.values(variantMap || {})) {\n      const price = parseFloat(variant.price);\n      const discountPrice = parseFloat(variant.discountPrice || variant.price);\n      if (price > maxPrice) {\n        maxPrice = price;\n      }\n      if (discountPrice > maxDiscountPrice) {\n        maxDiscountPrice = discountPrice;\n      }\n      if (price < minPrice) {\n        minPrice = price;\n      }\n      if (discountPrice < minDiscountPrice) {\n        minDiscountPrice = discountPrice;\n      }\n    }\n    // format the price range. If the discount price is different than the regular price then\n    // show both formatted like \"minDiscountPrice - maxDiscountPrice <s class=\"price\">minPrice - maxPrice</s>\"\n    let priceRange = formatPriceRange(minPrice, maxPrice);\n    if (minDiscountPrice !== minPrice || maxDiscountPrice !== maxPrice) {\n      priceRange = `${formatPriceRange(minDiscountPrice, maxDiscountPrice)} <s class=\"price\">${formatPriceRange(minPrice, maxPrice)}</s>`;\n    }\n    jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#display-price\").html(priceRange);\n  } else {\n    const stockLevel = getStockLevel(variantToShow);\n    jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#stocklevel-display\").removeClass(\"bg-success bg-warning bg-danger\").addClass(`bg-${getStockClass(stockLevel)}`).text(stockLevel);\n    jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#display-price\").html(getPrice(variantToShow));\n    if (stockLevel !== 'In stock') {\n      jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#backorderNotice\").removeClass('d-none');\n      jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#shippingNotice\").addClass('d-none');\n    } else {\n      jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#backorderNotice\").addClass('d-none');\n      jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#shippingNotice\").removeClass('d-none');\n    }\n  }\n}\nfunction isSelect(element) {\n  return element.tagName === \"SELECT\";\n}\nconst displayMap = {\n  'st-sma-f': \"SMA Female\",\n  'st-sma-m': \"SMA Male\",\n  'st-bnc': \"BNC (Male)\"\n};\nfunction formatColor(color) {\n  if (color === \"Glow\") {\n    return \"Glow In The Dark\";\n  } else {\n    return color;\n  }\n}\nfunction getSelectedOptions() {\n  const productOptions = jquery__WEBPACK_IMPORTED_MODULE_3___default()(\".product-options\");\n  const selectedOptions = {};\n  const optionNames = {};\n  if (productOptions.length) {\n    for (const optionSelect of productOptions) {\n      if (isSelect(optionSelect)) {\n        const optionCode = optionSelect.getAttribute(\"data-option-code\");\n        const optionValue = optionSelect.value;\n        selectedOptions[optionCode] = optionValue;\n      } else {\n        // This is a radio button group\n        const optionCode = optionSelect.getAttribute(\"data-option-code\");\n        const optionValue = jquery__WEBPACK_IMPORTED_MODULE_3___default()(optionSelect).find(\"input:checked\").val();\n        const optionName = jquery__WEBPACK_IMPORTED_MODULE_3___default()(optionSelect).find(\"input:checked\").attr(\"data-option-name\");\n        optionNames[optionCode] = optionName || '';\n        selectedOptions[optionCode] = optionValue;\n      }\n    }\n  }\n  return {\n    selectedOptions,\n    optionNames\n  };\n}\nfunction checkSelected() {\n  const {\n    selectedOptions,\n    optionNames\n  } = getSelectedOptions();\n  jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#subtitle\").html(optionNames['band'] || \"&nbsp;\");\n  const titleEl = jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"#title\");\n  const pageSlug = titleEl.data(\"slug\");\n  const pageDisplay = displayMap[pageSlug];\n  const variantButtons = jquery__WEBPACK_IMPORTED_MODULE_3___default()(\".variant-buttons\");\n  if ('band' in selectedOptions && 'color' in selectedOptions) {\n    // Special handling for the Super-Elastic Signal Stick product; hide the color options until a band is selected,\n    // and then only show the colors that are available for that band\n    const band = selectedOptions['band'];\n    if (!band) {\n      // No band selected; hide all the color options\n      jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"div.option-color\").slideUp();\n    } else {\n      // Update the button labels\n      updateColorButtons(band);\n      const colorOptions = jquery__WEBPACK_IMPORTED_MODULE_3___default()(\"div.option-color\");\n      colorOptions.slideDown();\n      const foundColors = [];\n      const variantButtons = jquery__WEBPACK_IMPORTED_MODULE_3___default()(\".variant-buttons\");\n      for (const variantBtn of variantButtons) {\n        const curBand = variantBtn.getAttribute(\"data-item-band\");\n        if (curBand === band) {\n          foundColors.push(variantBtn.getAttribute(\"data-item-color\"));\n        }\n      }\n      const colorRadios = colorOptions.find(\"input[type=radio]\");\n      for (const radioBtn of colorRadios) {\n        const color = radioBtn.getAttribute(\"value\");\n        if (foundColors.includes(color)) {\n          jquery__WEBPACK_IMPORTED_MODULE_3___default()(radioBtn).show();\n          colorOptions.find(`#${radioBtn.id}-lbl`).show();\n        } else {\n          jquery__WEBPACK_IMPORTED_MODULE_3___default()(radioBtn).hide();\n          colorOptions.find(`#${radioBtn.id}-lbl`).hide();\n        }\n      }\n    }\n  }\n  const colorValid = jquery__WEBPACK_IMPORTED_MODULE_3___default()(`#option-color-${selectedOptions['color']}-lbl`).is(\":visible\");\n  titleEl.text(`${pageDisplay} ${colorValid ? `- ${formatColor(optionNames['color'])}` : ''}`);\n  let foundSKU = \"\";\n  // Find the variant that matches the selected options; do that by looking at the add to cart buttons\n  for (const variantBtn of variantButtons) {\n    let matches = true;\n    const sku = variantBtn.getAttribute(\"data-item-sku\");\n    for (const [code, value] of Object.entries(selectedOptions)) {\n      const optionValue = variantBtn.getAttribute(`data-item-${code}`);\n      if (optionValue !== value) {\n        matches = false;\n        break;\n      }\n    }\n    const relevantElements = jquery__WEBPACK_IMPORTED_MODULE_3___default()(`.${sku.toLowerCase()}`);\n    if (!matches) {\n      // Hide everything associated with this sku\n      relevantElements.hide();\n    } else {\n      foundSKU = sku;\n      relevantElements.show();\n    }\n  }\n  showVariant(foundSKU.toLowerCase()); // Update price and stock levels\n  if (foundSKU) {\n    jquery__WEBPACK_IMPORTED_MODULE_3___default()(\".main-toggled\").hide();\n  } else {\n    jquery__WEBPACK_IMPORTED_MODULE_3___default()(\".main-toggled\").show();\n  }\n}\n\n//# sourceURL=webpack:///./src/forLayout/products.ts?");

/***/ }),

/***/ "./src/lib/bs5-lightbox.ts":
/*!*********************************!*\
  !*** ./src/lib/bs5-lightbox.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bootstrap/js/dist/modal */ \"../node_modules/bootstrap/js/dist/modal.js\");\n/* harmony import */ var bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/js/dist/carousel */ \"../node_modules/bootstrap/js/dist/carousel.js\");\n/* harmony import */ var bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_1__);\n/**\n * Lightbox for Bootstrap 5\n *\n * Taken from https://github.com/trvswgnr/bs5-lightbox\n *\n * Adapted by Richard Bateman to typescript and various tweaks\n *\n * @file Creates a modal with a lightbox carousel.\n * @module bs5-lightbox\n */\n\n\nclass Lightbox {\n  static allowedEmbedTypes = ['embed', 'youtube', 'vimeo', 'instagram', 'url'];\n  static allowedMediaTypes = [...Lightbox.allowedEmbedTypes, 'image', 'html'];\n  static defaultSelector = '[data-toggle=\"lightbox\"]';\n  static initialize = function (e) {\n    e.preventDefault();\n    const lightbox = new Lightbox(this);\n    lightbox.show();\n  };\n  constructor(el, options = {}) {\n    this.hash = this.randomHash();\n    const target = typeof el === 'string' ? document.querySelector(el) : el;\n    if (!target) {\n      throw new Error(\"Invalid target\");\n    }\n    this.settings = {\n      ...(bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_0___default().Default),\n      ...(bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_1___default().Default),\n      interval: false,\n      gallery: '',\n      size: 'xl',\n      constrain: true,\n      target,\n      // Apply new options\n      ...options\n    };\n    this.modalOptions = (() => this.setOptionsFromSettings((bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_0___default().Default)))();\n    this.carouselOptions = (() => this.setOptionsFromSettings((bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_1___default().Default)))();\n    this.el = target;\n    this.type = target.dataset.type || '';\n    this.src = this.getSrc(target);\n    this.sources = this.getGalleryItems();\n    this.createCarousel();\n    this.createModal();\n  }\n  show() {\n    document.body.appendChild(this.modalElement);\n    this.modal?.show();\n  }\n  hide() {\n    this.modal?.hide();\n  }\n  setOptionsFromSettings(obj) {\n    return Object.keys(obj).reduce((p, c) => Object.assign(p, {\n      [c]: this.settings[c]\n    }), {});\n  }\n  getSrc(el) {\n    let src = el.dataset.src || el.dataset.remote || el.href || 'http://via.placeholder.com/1600x900';\n    if (el.dataset.type === 'html') {\n      return src;\n    }\n    if (!/\\:\\/\\//.test(src)) {\n      src = window.location.origin + src;\n    }\n    const url = new URL(src);\n    if (el.dataset.footer || el.dataset.caption) {\n      const caption = el.dataset?.footer || el.dataset?.caption;\n      url.searchParams.set('caption', caption || '');\n    }\n    return url.toString();\n  }\n  getGalleryItems() {\n    let galleryTarget;\n    if (this.settings.gallery) {\n      if (Array.isArray(this.settings.gallery)) {\n        return this.settings.gallery;\n      }\n      galleryTarget = this.settings.gallery;\n    } else if (this.el.dataset.gallery) {\n      galleryTarget = this.el.dataset.gallery;\n    }\n    const galleryTargets = Array.from(document.querySelectorAll(`[data-gallery=\"${galleryTarget}\"]`));\n    const gallery = galleryTarget ? [...new Set(Array.from(galleryTargets, v => `${v.dataset.type ? v.dataset.type : ''}${this.getSrc(v)}`))] : [`${this.type ? this.type : ''}${this.src}`];\n    return gallery;\n  }\n  getYoutubeId(src) {\n    if (!src) return false;\n    const matches = src.match(/^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|watch\\?v=|&v=)([^#&?]*).*/);\n    return matches && matches[2].length === 11 ? matches[2] : false;\n  }\n  getYoutubeLink(src) {\n    const youtubeId = this.getYoutubeId(src);\n    if (!youtubeId) {\n      return false;\n    }\n    const arr = src.split('?');\n    let params = arr.length > 1 ? '?' + arr[1] : '';\n    return `https://www.youtube.com/embed/${youtubeId}${params}`;\n  }\n  isEmbed(src) {\n    const regex = new RegExp('(' + Lightbox.allowedEmbedTypes.join('|') + ')');\n    const isEmbed = regex.test(src);\n    const isImg = /\\.(png|jpe?g|gif|svg|webp)/i.test(src) || this.el.dataset.type === 'image';\n    return isEmbed || !isImg;\n  }\n  createCarousel() {\n    const template = document.createElement('template');\n    const types = Lightbox.allowedMediaTypes.join('|');\n    const slidesHtml = this.sources.map((src, i) => {\n      src = src.replace(/\\/$/, '');\n      const regex = new RegExp(`^(${types})`, 'i');\n      const isHtml = /^html/.test(src);\n      const isForcedImage = /^image/.test(src);\n      if (regex.test(src)) {\n        src = src.replace(regex, '');\n      }\n      const imgClasses = 'h-100 w-100';\n      const params = new URLSearchParams(src.split('?')[1]);\n      let caption = '';\n      let url = src;\n      if (params.get('caption')) {\n        try {\n          const urlObj = new URL(src);\n          urlObj.searchParams.delete('caption');\n          url = urlObj.toString();\n        } catch (e) {\n          url = src;\n        }\n        caption = `<p class=\"lightbox-caption m-0 p-2 text-center text-white small\"><em>${params.get('caption')}</em></p>`;\n      }\n      let inner = `<img src=\"${url}\" class=\"d-block ${imgClasses} img-fluid\" style=\"z-index: 1; object-fit: contain; max-height: calc(100vh - 60px)\" />`;\n      let attributes = '';\n      if (isHtml) {\n        inner = src;\n      }\n      const spinner = `<div class=\"position-absolute top-50 start-50 translate-middle text-white\"><div class=\"spinner-border\" style=\"width: 3rem height: 3rem\" role=\"status\"></div></div>`;\n      return `\n\t\t\t\t<div class=\"carousel-item ${!i ? 'active' : ''}\"\">\n\t\t\t\t\t${spinner}\n\t\t\t\t\t<div class=\"imgcontainer\" style=\"background-color: #000;\">${inner}</div>\n\t\t\t\t\t${caption}\n\t\t\t\t</div>`;\n    }).join('');\n    const controlsHtml = this.sources.length < 2 ? '' : `\n\t\t\t<button id=\"#lightboxCarousel-${this.hash}-prev\" class=\"carousel-control carousel-control-prev h-75 m-auto\" type=\"button\" data-bs-target=\"#lightboxCarousel-${this.hash}\" data-bs-slide=\"prev\">\n\t\t\t\t<span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"visually-hidden\">Previous</span>\n\t\t\t</button>\n\t\t\t<button id=\"#lightboxCarousel-${this.hash}-next\" class=\"carousel-control carousel-control-next h-75 m-auto\" type=\"button\" data-bs-target=\"#lightboxCarousel-${this.hash}\" data-bs-slide=\"next\">\n\t\t\t\t<span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n\t\t\t\t<span class=\"visually-hidden\">Next</span>\n\t\t\t</button>`;\n    let classes = 'lightbox-carousel carousel slide carousel-fade';\n    if (this.settings.size === 'fullscreen') {\n      classes += ' position-absolute w-100 translate-middle top-50 start-50';\n    }\n    const html = `\n\t\t\t<div id=\"lightboxCarousel-${this.hash}\" class=\"${classes}\" data-bs-ride=\"carousel\" data-bs-interval=\"${this.carouselOptions.interval}\">\n\t\t\t\t<div class=\"carousel-inner\">\n\t\t\t\t\t${slidesHtml}\n\t\t\t\t</div>\n\t\t\t\t${controlsHtml}\n\t\t\t</div>`;\n    template.innerHTML = html.trim();\n    this.carouselElement = template.content.firstChild;\n    const carouselOptions = {\n      ...this.carouselOptions,\n      keyboard: false\n    };\n    this.carousel = new (bootstrap_js_dist_carousel__WEBPACK_IMPORTED_MODULE_1___default())(this.carouselElement, carouselOptions);\n    const elSrc = this.type && this.type !== 'image' ? this.type + this.src : this.src;\n    this.carousel.to(this.findGalleryItemIndex(this.sources, elSrc));\n    if (this.carouselOptions.keyboard === true) {\n      document.addEventListener('keydown', e => {\n        if (e.code === 'ArrowLeft') {\n          const prev = document.getElementById(`#lightboxCarousel-${this.hash}-prev`);\n          if (prev) {\n            prev.click();\n          }\n          return false;\n        }\n        if (e.code === 'ArrowRight') {\n          const next = document.getElementById(`#lightboxCarousel-${this.hash}-next`);\n          if (next) {\n            next.click();\n          }\n          return false;\n        }\n      });\n    }\n    return this.carousel;\n  }\n  findGalleryItemIndex(haystack, needle) {\n    let index = 0;\n    for (const item of haystack) {\n      if (item.includes(needle)) {\n        return index;\n      }\n      index++;\n    }\n    return 0;\n  }\n  createModal() {\n    const template = document.createElement('template');\n    const btnInner = '<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"position: relative; top: -5px;\" viewBox=\"0 0 16 16\" fill=\"#fff\"><path d=\"M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z\"/></svg>';\n    const html = `\n\t\t\t<div class=\"modal lightbox fade\" id=\"lightboxModal-${this.hash}\" tabindex=\"-1\" aria-hidden=\"true\">\n\t\t\t\t<div class=\"modal-dialog modal-dialog-centered modal-${this.settings.size}\">\n\t\t\t\t\t<div class=\"modal-content border-0 bg-transparent\">\n\t\t\t\t\t\t<div class=\"modal-body p-0\">\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn-close position-absolute top-0 end-0 p-3\" data-bs-dismiss=\"modal\" aria-label=\"Close\" style=\"z-index: 2; background: none;\">${btnInner}</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>`;\n    template.innerHTML = html.trim();\n    this.modalElement = template.content.firstChild;\n    if (this.carouselElement) {\n      this.modalElement.querySelector('.modal-body')?.appendChild(this.carouselElement);\n    }\n    this.modalElement.addEventListener('hidden.bs.modal', () => this.modalElement?.remove());\n    this.modalElement.querySelector('[data-bs-dismiss]')?.addEventListener('click', () => this.modal?.hide());\n    this.modal = new (bootstrap_js_dist_modal__WEBPACK_IMPORTED_MODULE_0___default())(this.modalElement, this.modalOptions);\n    return this.modal;\n  }\n  randomHash(length = 8) {\n    return Array.from({\n      length\n    }, () => Math.floor(Math.random() * 36).toString(36)).join('');\n  }\n}\n// $(() => {\n//   document.querySelectorAll(Lightbox.defaultSelector).forEach((el) => el.addEventListener('click', Lightbox.initialize));\n// });\nif (typeof window !== 'undefined' && window.bootstrap) {\n  window.bootstrap.Lightbox = Lightbox;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Lightbox);\n\n//# sourceURL=webpack:///./src/lib/bs5-lightbox.ts?");

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
/******/ 			"forLayout/products": 0,
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_graphql-tag_lib_index_js-node_modules_graphql_index_js","vendors-node_modules_bootstrap_js_dist_modal_js","vendors-node_modules_aos_dist_aos_js-node_modules_bootstrap_js_dist_alert_js-node_modules_boo-6d8737","src_graphql_shopClient_ts","src_common_main_scss"], () => (__webpack_require__("./src/forLayout/products.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;