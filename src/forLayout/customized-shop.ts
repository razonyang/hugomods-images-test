
import '../common/common';

import $ from "jquery";
import { populateModel, populateBrands, getModelInfo } from "../lib/modelLookup";

function getQueryParams(url: string) {
  const paramArr = url.slice(url.indexOf("?") + 1).split("&");
  const params: Record<string, string> = {};
  paramArr.map((param) => {
    const [key, val] = param.split("=");
    params[key] = decodeURIComponent(val);
  });
  return params;
}

$(() => {
  $(".modelSelectorForm").trigger("reset");

  $("#radioBrandSelector").on("change", function () {
    populateModel($("#radioBrandSelector"), $("#radioModelSelector"));
  });
  $("#radioModelSelector").on("change", function () {
    const brand = $("#radioBrandSelector").val();
    const model = $("#radioModelSelector").val();
    filterByModel(brand as string, model as string);
  });

  const brandSelector = $("#radioBrandSelector");
  const modelSelector = $("#radioModelSelector");

  $(".modelSelectorForm").on("submit", function (e) {
    e.preventDefault();
    const brand = brandSelector.val();
    const model = modelSelector.val();
    if (brand && model) {
      window.location.href = `/customized-shop?brand=${brand}&model=${model}`;
    } else {
      $("#selectBoth").css("display", "block");
    }
  });

  const {brand, model} = getQueryParams(window.location.href);

  populateBrands(brandSelector);
  if (brand) {
    brandSelector.val(brand);
  }
  populateModel(brandSelector, modelSelector);
  if (model) {
    modelSelector.val(model);
  }
  filterByModel(brand, model);

  function filterByModel(brand: string, model: string) {
    const modelInfo = getModelInfo(brand, model);
    if (!modelInfo) {
      window.location.href = "/shop";
      return;
    }
  
    let text = `${modelInfo.connector} connector fits your model`;
    const spacerNumber = isNaN(Number(modelInfo.spacer))
      ? 0
      : Number(modelInfo.spacer);
    let show3d = false;
    let showSpacer = false;
    if (modelInfo.spacer == "3d") {
      text += `, 3D-printed spacer recommended`;
      show3d = true;
    } else if (modelInfo.spacer == "?") {
      text += `, we don't know if you need a spacer or not`;
      showSpacer = true;
    } else if (spacerNumber == 0) {
      text += ` with no spacer needed`;
    } else if (spacerNumber == 1) {
      text += ` with a spacer recommended`;
      showSpacer = true;
    } else {
      text += `with ${spacerNumber} spacers needed`;
      showSpacer = true;
    }
    const textEl = $("#customized-shop-text");
    textEl.empty();
    textEl.append(text);
    textEl.show();
  
    const prodCards = $(".prod-card");
    if (prodCards.length > 0) {
      prodCards.each((index, product) => {
        const connector = $(product).data("connector").toLowerCase().replace(/[\[\]]/g, "").split(" ");
        if (connector.includes(modelInfo.connector.toLowerCase())) {
          $(product).parent().show();
        } else {
          const slug = $(product).data("slug");
          if (slug == "spacer-3dprinted") {
            if (show3d) {
              $(product).parent().show();
            } else {
              $(product).parent().hide();
            }
          } else if (slug == "spacer-rubber") {
            if (showSpacer) {
              $(product).parent().show();
            } else {
              $(product).parent().hide();
            }
          } else {
            $(product).parent().hide();
          }
        }
      });
    }
  }
});
