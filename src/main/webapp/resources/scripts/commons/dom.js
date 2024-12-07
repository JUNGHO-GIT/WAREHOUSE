/** ------------------------------------------------------------------------------------------------
* @param {string} el
* @return {Element | null}
* @desc 쿼리 셀렉터
**/
function getElem(el) {
  const element = document.querySelector(el);
  if (element) {
    return element;
  }
  else {
    console.warn(`getElem: '${el}' not found`);
    return null;
  }
}

/** ------------------------------------------------------------------------------------------------
* @param {string} el
* @return {NodeListOf<Element>}
* @desc 쿼리 셀렉터 올
**/
function getElemAll(el) {
  const elements = document.querySelectorAll(el);
  if (elements.length > 0) {
    return elements;
  }
  else {
    console.warn(`getElemAll: '${el}' not found`);
    return elements;
  }
}

/** ------------------------------------------------------------------------------------------------
* @param {string} el
* @return {HTMLElement | null}
* @desc 아이디로 찾기
**/
function getById(el) {
  const element = document.getElementById(el);
  if (element) {
    return element;
  }
  else {
    console.warn(`getById: '${el}' not found`);
    return null;
  }
}

/** ------------------------------------------------------------------------------------------------
* @param {string} el
* @return {HTMLCollectionOf<Element> | null}
* @desc 클래스로 찾기
**/
function getByClass(el) {
  const element = document.getElementsByClassName(el);
  if (element) {
    return element;
  }
  else {
    console.warn(`getByClass: '${el}' not found`);
    return null;
  }
}

/** ------------------------------------------------------------------------------------------------
* @param {string} el
* @return {NodeListOf<HTMLElement> | null}
* @desc name값으로 찾기
**/
function getByName(el) {
  const element = document.getElementsByName(el);
  if (element) {
    return element;
  }
  else {
    console.warn(`getByName: '${el}' not found`);
    return null;
  }
}

/** ------------------------------------------------------------------------------------------------
* @param {string} el
* @return {HTMLFormElement | null}
* @desc form 찾기
**/
function getFormByName(el) {
  const element = document.forms[el];
  if (element) {
    return element;
  }
  else {
    console.warn(`getFormByName: '${el}' not found`);
    return null;
  }
}

/** ------------------------------------------------------------------------------------------------
* @param {HTMLElement} el
* @return {string}
* @desc innerHTML 값 얻기
**/
function getInnerHTML(el) {
  if (el && el instanceof HTMLElement) {
    return el.innerHTML ? String(el.innerHTML).trim() : "";
  }
  else {
    console.warn(`getInnerHTML: '${el}' not found`);
    return "";
  }
}

/** ------------------------------------------------------------------------------------------------
* @param {HTMLElement | null} el
* @return {string}
* @desc value 값 얻기
**/
function getValue(el) {
  if (el && el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement || el instanceof HTMLButtonElement || el instanceof HTMLOptionElement) {
    return el.value ? String(el.value).trim() : "";
  }
  else {
    console.warn(`getValue: '${el}' not found`);
    return "";
  }
}

/** ------------------------------------------------------------------------------------------------
* @param {HTMLElement} el
* @param {string} text
* @return {void}
* @desc value 값 설정
**/
function setValue(el, text) {
  if (el && el instanceof HTMLInputElement) {
    el.value = text ? String(text).trim() : "";
  }
  else {
    console.warn(`setValue: '${el}' not found`);
  }
};

/** ------------------------------------------------------------------------------------------------
* @param {HTMLElement} el
* @param {string} text
* @return {void}
* @desc innerHTML 값 설정
**/
function setInnerHTML(el, text) {
  if (el && el instanceof HTMLElement) {
    el.innerHTML = text ? String(text).trim() : "";
  }
  else {
    console.warn(`setInnerHTML: '${el}' not found`);
  }
};
