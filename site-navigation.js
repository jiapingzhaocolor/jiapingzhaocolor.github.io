// The work menu supports direct taps, keyboard activation, and desktop hover.
const workItem = document.querySelector('.site-header .nav-item');
const workToggle = workItem?.querySelector('.nav-toggle');
const workCategories = workItem?.querySelector('.dropdown');
if (workToggle && workCategories) {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const setWorkMenu = open => {
    workToggle.setAttribute('aria-expanded', String(open));
    workToggle.setAttribute('aria-label', open ? 'Hide work categories' : 'Show work categories');
    workCategories.hidden = !open;
    workItem.classList.toggle('is-open', open);
  };
  workToggle.addEventListener('click', () => setWorkMenu(workToggle.getAttribute('aria-expanded') !== 'true'));
  workItem.addEventListener('pointerenter', event => {
    if (finePointer.matches && event.pointerType === 'mouse') setWorkMenu(true);
  });
  workItem.addEventListener('pointerleave', () => {
    if (finePointer.matches && !workItem.contains(document.activeElement)) setWorkMenu(false);
  });
  workItem.addEventListener('focusout', event => {
    if (!workItem.contains(event.relatedTarget)) setWorkMenu(false);
  });
  document.addEventListener('pointerdown', event => {
    if (!workItem.contains(event.target)) setWorkMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !workCategories.hidden) {
      setWorkMenu(false);
      workToggle.focus();
    }
  });
}
