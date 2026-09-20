// Shared fullscreen still gallery. Links retain a high-resolution fallback without JS.
const dialog = document.querySelector('.lightbox');
const image = dialog.querySelector('img');
const counter = dialog.querySelector('.counter');
const stills = [...document.querySelectorAll('.still')];
let current = 0;
let opener;
let previousOverflow;
function show(index) {
  current = (index + stills.length) % stills.length;
  image.src = stills[current].href;
  image.alt = stills[current].querySelector('img').alt;
  counter.textContent = (current + 1) + ' / ' + stills.length;
}
function close() {
  if (document.fullscreenElement === dialog) document.exitFullscreen().catch(() => {});
  if (dialog.open) dialog.close();
}
stills.forEach((link, index) => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  opener = link;
  previousOverflow = document.body.style.overflow;
  show(index);
  dialog.showModal();
  document.body.style.overflow = 'hidden';
  dialog.querySelector('.close').focus();
  // Use native fullscreen when available; the modal fills the viewport otherwise.
  if (dialog.requestFullscreen) dialog.requestFullscreen().catch(() => {});
}));
dialog.querySelector('.previous').addEventListener('click', () => show(current - 1));
dialog.querySelector('.next').addEventListener('click', () => show(current + 1));
dialog.querySelector('.close').addEventListener('click', close);
dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
dialog.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  opener?.focus();
});
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); show(current - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); show(current + 1); }
  if (event.key === 'Escape') { event.preventDefault(); close(); }
});
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && dialog.open) close();
});
