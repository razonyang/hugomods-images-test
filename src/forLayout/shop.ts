import '../common/common';

import $ from 'jquery';
import { populateBrands, populateModel } from '../lib/modelLookup';

$(() => {
  const brandSelector = $("#radioBrandSelector");
  const modelSelector = $("#radioModelSelector");

  modelSelector.trigger("reset");

  brandSelector.on("change", function () {
    if (brandSelector.children(":selected").val()) {
      brandSelector.removeClass("text-ss-grey");
    } else {
      brandSelector.addClass("text-ss-grey");
    }
    populateModel(brandSelector, modelSelector);
  });
  modelSelector.on("change", function () {
    if (modelSelector.children(":selected").val()) {
      modelSelector.removeClass("text-ss-grey");
    } else {
      modelSelector.addClass("text-ss-grey");
    }
  });


  $("#modelSelectorForm").on("submit", function (e) {
    e.preventDefault();
    const brand = brandSelector.val();
    const model = modelSelector.val();
    if (brand && model) {
      window.location.href = `/customized-shop?brand=${brand}&model=${model}`;
    } else {
      $("#selectBoth").css("display", "block");
    }
  });

  populateBrands(brandSelector);
  if (brandSelector.children(":selected")?.val()) {
    populateModel(brandSelector, modelSelector);
  }
});
