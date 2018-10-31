const output = document.querySelector('.modal__value');
const rangeSLider = document.querySelector('.adjust-bar.adjust-bar_theme_temp');
rangeSLider.oninput = function() {
  output.innerHTML = this.value > 0 ? '+' + this.value : this.value;
};
const arrowLeftDevs = document.querySelector('.devices__paginator .paginator__arrow_left');
const arrowRightDevs = document.querySelector('.devices__paginator .paginator__arrow_right');
const panelCountDevs = document.querySelectorAll('.devices__panel').length;
const devices = document.querySelector('.devices');
const pagiantorDevs = document.querySelector('.devices__paginator');
let currentPageDevs = 1;
pagiantorDevs.classList.toggle('paginator_hide', panelCountDevs < 7);
arrowRightDevs.addEventListener('click', () => {
  currentPageDevs += 1;
  arrowLeftDevs.classList.toggle('paginator__arrow_disabled', currentPageDevs === 1);
  devices.scroll({ top: 0, left: 1366, behavior: 'smooth' });
});
arrowLeftDevs.addEventListener('click', () => {
  if (currentPageDevs > 1) {
    currentPageDevs -= 1;
    arrowLeftDevs.classList.toggle('paginator__arrow_disabled', currentPageDevs === 1);
    devices.scroll({ top: 0, left: -1366, behavior: 'smooth' });
  }
});
let curValue,
  curRotate,
  maxRotate = 0.42,
  minRotate = -0.42;
const MIN_VALUE = 26,
  MAX_VALUE = 35,
  INDICATOR_OFFSET = 265;
function setRotate(rotate) {
  rotate > maxRotate ? (curRotate = maxRotate) : rotate < minRotate ? (curRotate = minRotate) : (curRotate = rotate);
  curValue = Math.floor(Math.abs(rotate * 360 * 1.73 + INDICATOR_OFFSET) / 53 + MIN_VALUE);
  document.querySelector('.modal_knob .modal__value').innerHTML = '+' + curValue;
  document.querySelector('.knob__value').innerHTML = '+' + curValue;
  document.querySelector('.knob__indicator').style.strokeDasharray = curRotate * 360 * 1.73 + INDICATOR_OFFSET + ' 629';
  document.querySelector('.knob__arrow').style.transform = 'rotate(' + curRotate * 360 + 'deg)';
}
function getPosition(elem) {
  const rect = elem.getBoundingClientRect();
  return [rect.left + (rect.right - rect.left) / 2, rect.top + (rect.bottom - rect.top) / 2];
}
function getMouseAngle(event, centerElem) {
  const pos = getPosition(centerElem);
  let cursor = [event.clientX, event.clientY];
  if (event.targetTouches && event.targetTouches[0])
    cursor = [event.targetTouches[0].clientX, event.targetTouches[0].clientY];
  return Math.atan2(cursor[1] - pos[1], cursor[0] - pos[0]) + Math.PI / 2;
}
let knobDragged,
  prevAngleRad = null,
  prevRotate = null;
function startDragging(e) {
  e.preventDefault();
  e.stopPropagation();
  const rad = getMouseAngle(e, document.querySelector('.knob_center'));
  knobDragged = true;
  prevAngleRad = rad;
  prevRotate = curRotate;
}
function stopDragging(e) {
  knobDragged = false;
}
function dragRotate(e) {
  if (!knobDragged) return;
  const old = prevAngleRad;
  let rad = getMouseAngle(e, document.querySelector('.knob_center'));
  let delta = rad - old;
  prevAngleRad = rad;
  if (delta < 0) delta += Math.PI * 2;
  if (delta > Math.PI) delta -= Math.PI * 2;
  const deltaRotate = delta / Math.PI / 2;
  const rotate = prevRotate + deltaRotate;
  prevRotate = rotate;
  setRotate(rotate);
}
function setEvtListeners() {
  const elem = document.querySelector('.knob-container');
  elem.addEventListener('mousedown', startDragging);
  document.addEventListener('mouseup', stopDragging);
  document.addEventListener('mousemove', dragRotate);
  elem.addEventListener('touchstart', startDragging);
  document.addEventListener('touchend', stopDragging);
  document.addEventListener('touchmove', dragRotate);
}
setEvtListeners();
setRotate(0);
document.querySelectorAll('.modal_close').forEach(b => {
  b.onclick = () => {
    document.querySelectorAll('.modal').forEach(m => {
      m.classList.toggle('modal_open', false);
      document.querySelector('body').style.overflow = 'auto';
    });
  };
});
const TEMPS = { manual: -10, cold: 0, warm: 23, hot: 30 };
document.querySelectorAll('.modal__filter-item_temp').forEach(l => {
  l.onclick = function() {
    document.querySelector('.adjust-bar_theme_temp').value = TEMPS[this.id];
    document.querySelector('.modal_temp .modal__value').innerHTML =
      TEMPS[this.id] > 0 ? '+' + TEMPS[this.id] : TEMPS[this.id];
  };
});
const showModal = selector => {
  document.querySelector(selector).classList.toggle('modal_open', true);
  document.querySelector('body').style.overflow = 'hidden';
};
function onClickModal(selector, modal_template) {
  document.querySelectorAll(selector).forEach(p => {
    p.onclick = () => {
      showModal(modal_template);
    };
  });
}
onClickModal('.panel_temp', '.modal_temp');
onClickModal('.panel_lamp', '.modal_light');
onClickModal('.panel_floor', '.modal_knob');
/*document.querySelectorAll('.panel_temp').forEach(p => {p.onclick = () => {showModal('.modal_temp');};});document.querySelectorAll('.panel_lamp').forEach(p => {p.onclick = () => {showModal('.modal_light');};});document.querySelectorAll('.panel_floor').forEach(p => {p.onclick = () => {showModal('.modal_knob');};});*/
const arrowLeftScens = document.querySelector('.scenarios__paginator .paginator__arrow_left');
const arrowRightScens = document.querySelector('.scenarios__paginator .paginator__arrow_right');
const panelCountScens = document.querySelectorAll('.scenarios__panel').length;
const pageCountScens = document.querySelectorAll('.scenarios__page').length;
const scenarios = document.querySelector('.scenarios');
const pagiantorScens = document.querySelector('.scenarios__paginator');
let currentPage = 1;
pagiantorScens.classList.toggle('paginator_hide', panelCountScens <= 9);
arrowRightScens.addEventListener('click', () => {
  if (currentPage < pageCountScens) {
    currentPage += 1;
    arrowRightScens.classList.toggle('paginator__arrow_disabled', currentPage === pageCountScens);
    arrowLeftScens.classList.toggle('paginator__arrow_disabled', currentPage === 1);
    scenarios.scroll({ top: 0, left: 645, behavior: 'smooth' });
  }
});
arrowLeftScens.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage -= 1;
    arrowRightScens.classList.toggle('paginator__arrow_disabled', currentPage === pageCountScens);
    arrowLeftScens.classList.toggle('paginator__arrow_disabled', currentPage === 1);
    scenarios.scroll({ top: 0, left: -645, behavior: 'smooth' });
  }
}); //const selectButton = document.querySelector('.filter__select-button');//const selectButtonText = document.querySelector('.filter__select-button .button__text');//const selectOptions = document.querySelectorAll('.filter__select-item');//const popup = document.querySelector('.filter__select-popup');/*selectButton.addEventListener('click', function() {popup.classList.toggle('filter__select-popup_open');});/*let widths = '';window.addEventListener('scroll', function() {widths += document.querySelectorAll('body')[0].offsetWidth;document.querySelector('.stats').innerHTML = widths;});*//*selectOptions.forEach(o => {o.addEventListener('click', e => {document.querySelector('#' + e.target.dataset.group).checked = true;selectOptions.forEach(opt => opt.classList.toggle('filter__select-item_checked', false));e.target.classList.toggle('filter__select-item_checked', true);popup.classList.toggle('filter__select-popup_open', false);selectButtonText.innerText = e.target.innerText;});});*/
document.querySelector('.menu__icon').addEventListener('click', () => {
  document.querySelector('.menu').classList.toggle('menu_open');
});
