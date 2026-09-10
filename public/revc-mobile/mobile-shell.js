const $ = (s) => document.querySelector(s);
const status = $('#status');
const statusText = $('#statusText');
const choose = $('#choose');
const controls = $('#controls');
const perf = $('#perf');
const canvas = $('#game');

const deviceMemory = navigator.deviceMemory ?? 4;
const cores = navigator.hardwareConcurrency ?? 4;
const lowEnd = deviceMemory <= 4 || cores <= 4;
const profile = lowEnd ? 'mobile-low' : (deviceMemory >= 8 && cores >= 8 ? 'mobile-high' : 'mobile-balanced');
const renderScale = profile === 'mobile-low' ? 0.70 : profile === 'mobile-high' ? 1 : 0.85;

window.REVC_WEB_MOBILE = {
  profile,
  renderScale,
  gameDirectoryHandle: null,
  emit(type, detail) {
    window.dispatchEvent(new CustomEvent(`revc:${type}`, { detail }));
  },
};

perf.textContent = `${profile} · scale ${renderScale.toFixed(2)} · ${cores} threads`;

function resizeCanvas() {
  const dpr = Math.min(devicePixelRatio || 1, profile === 'mobile-low' ? 1.25 : 2);
  canvas.width = Math.max(1, Math.round(innerWidth * dpr * renderScale));
  canvas.height = Math.max(1, Math.round(innerHeight * dpr * renderScale));
  window.REVC_WEB_MOBILE.emit('resize', { width: canvas.width, height: canvas.height, dpr, renderScale });
}
addEventListener('resize', resizeCanvas, { passive: true });
resizeCanvas();

async function validateViceCityFolder(root) {
  const missing = [];
  const tests = [
    ['models/gta3.img', async () => (await root.getDirectoryHandle('models')).getFileHandle('gta3.img')],
    ['data/gta_vc.dat', async () => (await root.getDirectoryHandle('data')).getFileHandle('gta_vc.dat')],
    ['audio/', async () => root.getDirectoryHandle('audio')],
  ];
  for (const [label, test] of tests) {
    try { await test(); } catch { missing.push(label); }
  }
  return missing;
}

choose.addEventListener('click', async () => {
  if (!('showDirectoryPicker' in window)) {
    statusText.textContent = 'Este navegador não oferece File System Access API. Use uma versão recente do Chrome/Edge no Android ou implemente o fallback OPFS/import.';
    return;
  }
  try {
    const handle = await window.showDirectoryPicker({ mode: 'read' });
    const missing = await validateViceCityFolder(handle);
    if (missing.length) {
      statusText.textContent = `A pasta selecionada não parece ser uma instalação completa do Vice City. Ausente: ${missing.join(', ')}.`;
      return;
    }
    window.REVC_WEB_MOBILE.gameDirectoryHandle = handle;
    statusText.textContent = 'Arquivos originais detectados. A camada WASM pode agora montar/streamar essa instalação sem redistribuir os assets.';
    controls.classList.add('ready');
    window.REVC_WEB_MOBILE.emit('game-folder-ready', { handle, profile, renderScale });
  } catch (error) {
    if (error?.name !== 'AbortError') statusText.textContent = `Falha ao abrir a pasta: ${error?.message ?? error}`;
  }
});

function bindPad(el, name) {
  const stick = el.querySelector('.stick');
  let active = null;
  const radius = el.clientWidth / 2;
  const update = (e) => {
    const r = el.getBoundingClientRect();
    let x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    let y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    const mag = Math.hypot(x, y);
    if (mag > 1) { x /= mag; y /= mag; }
    stick.style.transform = `translate(calc(-50% + ${x * radius * .55}px),calc(-50% + ${y * radius * .55}px))`;
    window.REVC_WEB_MOBILE.emit('axis', { name, x, y });
  };
  const reset = () => {
    active = null;
    stick.style.transform = 'translate(-50%,-50%)';
    window.REVC_WEB_MOBILE.emit('axis', { name, x: 0, y: 0 });
  };
  el.addEventListener('pointerdown', (e) => { active = e.pointerId; el.setPointerCapture(active); update(e); });
  el.addEventListener('pointermove', (e) => { if (e.pointerId === active) update(e); });
  el.addEventListener('pointerup', reset);
  el.addEventListener('pointercancel', reset);
}

bindPad($('#move'), 'move');
bindPad($('#look'), 'look');

for (const id of ['a', 'b', 'menu']) {
  const el = $(`#${id}`);
  const send = (pressed) => window.REVC_WEB_MOBILE.emit('button', { name: id, pressed });
  el.addEventListener('pointerdown', () => send(true));
  el.addEventListener('pointerup', () => send(false));
  el.addEventListener('pointercancel', () => send(false));
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) window.REVC_WEB_MOBILE.emit('suspend', {});
  else window.REVC_WEB_MOBILE.emit('resume', {});
});

window.REVC_WEB_MOBILE.emit('shell-ready', { profile, renderScale, canvas });
