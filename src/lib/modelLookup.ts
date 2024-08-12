import $ from "jquery";
import modelData from '../data/model-map.json';

export function getBrandList() {
  const brands = Object.keys(modelData);
  return brands;
}
export function getModels(brand: string) {
  const models = modelData[brand as keyof typeof modelData];
  models?.sort((a, b) => a.model.localeCompare(b.model));
  return models || [];
}

export function getModelInfo(brand: string, model: string) {
  const models = getModels(brand as keyof typeof modelData);
  const modelInfo = models?.find((modelObject) => modelObject.model == model);
  return modelInfo;
}

export function populateModel(brandSelector: JQuery<HTMLElement>, modelSelector: JQuery<HTMLElement>) {
  const brandName = brandSelector.children(":selected").val();
  const models = getModels(brandName as string);
  if (models.length) {
    const modelNames = models.map((modelObject) => modelObject.model);
    modelSelector.empty();
    const newOptions: string[] = [];
    newOptions.push(
      '<option value="" selected>Select model</option>'
    );
    modelNames.forEach((modelName) => {
      newOptions.push(
        `<option value="${modelName}">${modelName}</option>`
      );
    });
    modelSelector.append(newOptions.join(''));
  } else {
    if (brandName) {
      modelSelector.html('<option value="" selected>(no models found)</option>');
    } else {
      modelSelector.html('<option value="" selected>(no brand selected)</option>');
    }
  }
}
export function populateBrands(brandSelector: JQuery<HTMLElement>) {
  const list = getBrandList();

  brandSelector.empty();
  const options = [
    `<option value="" selected>Select your radio brand</option>`
  ];
  for (const item of list) {
    options.push(`<option value="${item}">${item}</option>`);
  }
  brandSelector.append(options.join(''));
}

