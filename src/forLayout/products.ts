
import '../common/common';

import { shopSdk } from '../graphql/shopClient';


import Lightbox from '../lib/bs5-lightbox';

import $ from 'jquery';
import { getQueryParams } from '../lib/getQuery';

function setQueryParams(newParams: Record<string, string>) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(newParams)) {
    if (value) {
      url.searchParams.set(key, value);
    }
  }
  window.history.replaceState({}, '', url.toString());
}

$(function () {
  initializeGallery();
  
  const params = getQueryParams<{band: string, color: string}>();

  if (params.band) {
    $(`#option-band-${params.band}`).prop("checked", true);
    if (params.color) {
      $(`#option-color-${params.color}`).prop("checked", true);
    }
  }

  $("section.products").on("change", "select.product-options", function () {
    checkSelected();
  });
  $("section.products").on("click", "input[type=radio]", function () {
    const {selectedOptions, optionNames} = getSelectedOptions();
    const queryParmas = getQueryParams();
    setQueryParams({...queryParmas, ...selectedOptions});
    checkSelected();
  });

  checkSelected();
  refreshStock();
});

let lightbox: Lightbox;

function initializeGallery() {
  const galleryContainer = $("#galleryContainer");
  lightbox = new Lightbox(galleryContainer[0], {
    gallery: "product",
    size: "xl",
    constrain: true,
  });

  galleryContainer.on("click", "img", function (e) {
    const index = $(this).data("idx") || 0;
    lightbox.show();
    lightbox.carousel?.to(index);
  });
}

interface Product {
  id: string;
  slug: string;
  updatedAt: string;
  variants: {
    id: string;
    sku: string;
    price: number;
    discount_price: number;
    options: Record<string, string>;
    stockLevel: ProductVariant["stockLevel"];
  }[];
}

let currentProduct: Product | null = null;
function updateVariantsFromExternal() {
  if (!currentProduct) {
    return;
  }
  const variantMap = window.productVariants;
  for (const variant of currentProduct.variants) {
    if (!variantMap) { return; } // no product map, forget it
    const sku = variant.sku.toLowerCase();
    if (variantMap?.[sku]) {
      // only update if we already know it exists
      const variantInfo = variantMap[sku];
      variantInfo.price = (variant.price / 100).toFixed(2);
      variantInfo.discountPrice = variant.discount_price ? ((variant.discount_price) / 100).toFixed(2) : "";
      variantInfo.stockLevel = variant.stockLevel as typeof variantInfo.stockLevel;
    }
  }
}


export async function fetchProduct(slug: string) {
  const resp = await shopSdk.ProductSummary({slug: {eq: slug}});
  const product = await resp;

  if (!product?.products?.totalItems) {
    throw new Error(`Could not get stock and pricing information for ${slug}`);
  } else if (product.products.totalItems > 1) {
    throw new Error(`Found more than one product with slug ${slug}`);
  }
  const p = product.products.items[0];
  return {
    id: p.id,
    slug: p.slug,
    updatedAt: p.updatedAt,
    variants: p.variants.map((v) => {
      return {
        id: v.id,
        sku: v.sku,
        price: v.price,
        discount_price: v.customFields?.discount_price || 0,
        options: Object.fromEntries(
          v.options.map((o) => [o.group.code, o.code])
        ),
        stockLevel: v.stockLevel,
      };
    }),
  } as Product;
}

async function refreshStock() {
  if (!window.productSlug) { return; }
  
  currentProduct = await fetchProduct(window.productSlug);
  updateVariantsFromExternal();
  checkSelected();
}

function getStockClass(stockLevel: string) {
  if (stockLevel === "Backordered") {
    return "danger";
  } else if (stockLevel !== "In stock") {
    return "warning";
  }
  return "success";
}

function updateColorButtons(band: string) {
  for (const variant of Object.values(window.productVariants || {})) {
    if (variant.band.code !== band) {
      continue;
    }
    const price = getPrice(variant, false);
    const stockLevel = getStockLevel(variant);

    const labelEl = $(`#option-color-${variant.color.code}-lbl`);

    labelEl.html(`${variant.color.name} - ${price}<br /><span class="text-${getStockClass(stockLevel)}">${stockLevel}</span>`);
  }
}
function formatPriceRange(min: number, max: number) {
  if (min === max) {
    return `$${min.toFixed(2)}`;
  }
  return `$${min.toFixed(2)} - $${max.toFixed(2)}`;
}

function getPrice(variantToShow: AntennaProductVariant, showOriginal = true) {
  const price = parseFloat(variantToShow.price);
  const discountPrice = parseFloat(variantToShow.discountPrice || variantToShow.price);
  if (!showOriginal || price === discountPrice) {
    return `$${discountPrice.toFixed(2)}`;
  } else {
    return `$${discountPrice.toFixed(2)} <s class="price">$${price.toFixed(2)}</s>`;
  }
}
function getStockLevel(variantToShow: AntennaProductVariant) {
  const stockLevel = variantToShow.stockLevel;
  if (stockLevel === "Backordered") {
    return 'Backordered';
  } else {
    const stockNum = parseInt(stockLevel!, 10);
    if (stockNum > 5) {
      return `In stock`;
    } else {
      return `${stockNum} left`;
    }
  }
}

function showVariant(sku: string) {
  const variantMap = window.productVariants;
  const variantToShow = variantMap?.[sku];
  if (!variantToShow) {
    // Iterate over variants, find the highest and lowest prices
    let maxPrice = 0;
    let maxDiscountPrice = 0;
    let minPrice = Infinity;
    let minDiscountPrice = Infinity;
    for (const variant of Object.values(variantMap || {})) {
      const price = parseFloat(variant.price);
      const discountPrice = parseFloat(variant.discountPrice || variant.price);
      if (price > maxPrice) {
        maxPrice = price;
      }
      if (discountPrice > maxDiscountPrice) {
        maxDiscountPrice = discountPrice;
      }
      if (price < minPrice) {
        minPrice = price;
      }
      if (discountPrice < minDiscountPrice) {
        minDiscountPrice = discountPrice;
      }
    }
    // format the price range. If the discount price is different than the regular price then
    // show both formatted like "minDiscountPrice - maxDiscountPrice <s class="price">minPrice - maxPrice</s>"
    let priceRange = formatPriceRange(minPrice, maxPrice);
    if (minDiscountPrice !== minPrice || maxDiscountPrice !== maxPrice) {
      priceRange = `${formatPriceRange(minDiscountPrice, maxDiscountPrice)} <s class="price">${ formatPriceRange(minPrice, maxPrice) }</s>`;
    }
    $("#display-price").html(priceRange);
  } else {
    const stockLevel = getStockLevel(variantToShow);
    $("#stocklevel-display")
      .removeClass("bg-success bg-warning bg-danger")
      .addClass(`bg-${getStockClass(stockLevel)}`)
      .text(stockLevel);

    $("#display-price").html(getPrice(variantToShow));
    if (stockLevel !== 'In stock') {
      $("#backorderNotice").removeClass('d-none');
      $("#shippingNotice").addClass('d-none');
    } else {
      $("#backorderNotice").addClass('d-none');
      $("#shippingNotice").removeClass('d-none');
    }
  }
}


function isSelect(element: HTMLElement): element is HTMLSelectElement {
  return element.tagName === "SELECT";
}

const displayMap = {
  'st-sma-f': "SMA Female",
  'st-sma-m': "SMA Male",
  'st-bnc': "BNC (Male)",
};
function formatColor(color: string) {
  if (color === "Glow") {
    return "Glow In The Dark";
  } else {
    return color;
  }
}

function getSelectedOptions() {
  const productOptions: JQuery<HTMLSelectElement | HTMLDivElement> = $(".product-options");
  const selectedOptions: Record<string, string> = {};
  const optionNames: Record<string, string> = {};
  if (productOptions.length) {
    for (const optionSelect of productOptions) {
      if (isSelect(optionSelect)) {
        const optionCode = optionSelect.getAttribute("data-option-code");
        const optionValue = optionSelect.value;
        selectedOptions[optionCode!] = optionValue;
      } else {
        // This is a radio button group
        const optionCode = optionSelect.getAttribute("data-option-code");
        const optionValue = $(optionSelect).find("input:checked").val();
        const optionName = $(optionSelect).find("input:checked").attr("data-option-name");
        optionNames[optionCode!] = optionName || '';
        selectedOptions[optionCode!] = optionValue as string;
      }
    }
  }

  return {selectedOptions, optionNames};
}

function checkSelected() {

  const {selectedOptions, optionNames} = getSelectedOptions();

  $("#subtitle").html(optionNames['band'] || "&nbsp;");
  const titleEl = $("#title");
  const pageSlug = titleEl.data("slug");
  const pageDisplay = displayMap[pageSlug as keyof typeof displayMap];

  const variantButtons = $(".variant-buttons");
  if ('band' in selectedOptions && 'color' in selectedOptions) {
    // Special handling for the Super-Elastic Signal Stick product; hide the color options until a band is selected,
    // and then only show the colors that are available for that band
    const band = selectedOptions['band'];
    if (!band) {
      // No band selected; hide all the color options
      $("div.option-color").slideUp();
    } else {
      // Update the button labels
      updateColorButtons(band);

      const colorOptions = $("div.option-color");
      colorOptions.slideDown();

      const foundColors: string[] = [];
      const variantButtons = $(".variant-buttons");
      for (const variantBtn of variantButtons) {
        const curBand = variantBtn.getAttribute("data-item-band");
        if (curBand === band) {
          foundColors.push(variantBtn.getAttribute("data-item-color")!);
        }
      }

      const colorRadios = colorOptions.find("input[type=radio]") as JQuery<HTMLInputElement>;
      for (const radioBtn of colorRadios) {
        const color = radioBtn.getAttribute("value")!;
        if (foundColors.includes(color)) {
          $(radioBtn).show();
          colorOptions.find(`#${radioBtn.id}-lbl`).show();
        } else {
          $(radioBtn).hide();
          colorOptions.find(`#${radioBtn.id}-lbl`).hide();
        }
      }
    }
  }

  const colorValid = $(`#option-color-${selectedOptions['color']}-lbl`).is(":visible");
  titleEl.text(`${pageDisplay} ${colorValid ? `- ${formatColor(optionNames['color'])}` : ''}`);

  let foundSKU = "";
  // Find the variant that matches the selected options; do that by looking at the add to cart buttons
  for (const variantBtn of variantButtons) {
    let matches = true;
    const sku = variantBtn.getAttribute("data-item-sku");
    for (const [code, value] of Object.entries(selectedOptions)) {
      const optionValue = variantBtn.getAttribute(`data-item-${code}`);
      if (optionValue !== value) {
        matches = false;
        break;
      }
    }
    const relevantElements = $(`.${sku!.toLowerCase()}`);
    if (!matches) {
      // Hide everything associated with this sku
      relevantElements.hide();
    } else {
      foundSKU = sku!;
      relevantElements.show();
    }
  }
  showVariant(foundSKU.toLowerCase()); // Update price and stock levels
  if (foundSKU) {
    $(".main-toggled").hide();
  } else {
    $(".main-toggled").show();
  }
}
