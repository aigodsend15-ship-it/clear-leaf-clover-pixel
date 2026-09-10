const $ = (s) => document.querySelector(s);
const status = $('#status');
const profileEl = $('#profile');
const graphicsEl = $('#graphics');
const storageEl = $('#storage');
const checkFolder = $('#checkFolder');
const folderInput = $('#folderInput');

const deviceMemory = navigator.deviceMemory ?? 4;
const cores = navigator.hardwareConcurrency ?? 4;
const coarse = matchMedia('(pointer: coarse)').matches;
const mobileViewport = Math.min(innerWidth, innerHeight) <= 900;

function detectWebGL2() {
  const canvas = document.createElement('canvas');
  try {
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: true,
      stencil: false,
      desynchronized: true,
      powerPreference: 'high-performance',
    });
    if (!gl) return { ok: false };
    return {
      ok: true,
      renderer: gl.getParameter(gl.RENDERER),
      maxTexture: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    };
  } catch {
    return { ok: false };
  }
}

function chooseProfile() {
  const pixels = innerWidth * innerHeight * Math.min(devicePixelRatio || 1, 2) ** 2;
  let score = 0;
  if (deviceMemory >= 8) score += 2;
  else if (deviceMemory >= 6) score += 1;
  if (cores >= 8) score += 2;
  else if (cores >= 6) score += 1;
  if (pixels > 5_000_000) score -= 1;
  if (score <= 1) return { name: 'mobile-low', scale: 0.70, fps: 30 };
  if (score >= 4) return { name: 'mobile-high', scale: 1.0, fps: 60 };
  return { name: 'mobile-balanced', scale: 0.85, fps: 60 };
}

const graphics = detectWebGL2();
const perf = chooseProfile();

window.REVC_MOBILE_PROFILE = {
  ...perf,
  deviceMemory,
  cores,
  coarsePointer: coarse,
  mobileViewport,
  webgl2: graphics.ok,
};

profileEl.innerHTML = `<span class="${perf.name === 'mobile-low' ? 'warn' : 'ok'}">${perf.name}</span> · render scale ${perf.scale.toFixed(2)} · alvo ${perf.fps} FPS · ${cores} threads lógicas`;
graphicsEl.innerHTML = graphics.ok
  ? `<span class="ok">WebGL 2 disponível</span> · textura máx. ${graphics.maxTexture}px`
  : '<span class="warn">WebGL 2 indisponível</span> · o motor reVC Web não deve iniciar neste navegador.';

const opfs = !!navigator.storage?.getDirectory;
storageEl.innerHTML = opfs
  ? '<span class="ok">OPFS disponível</span> · adequado para cache persistente e saves.'
  : '<span class="warn">OPFS não detectado</span> · usar IndexedDB/fallback do navegador.';

function normalize(path) {
  return path.replaceAll('\\', '/').toLowerCase();
}

function validateFileList(files) {
  const paths = new Set([...files].map((file) => normalize(file.webkitRelativePath || file.name)));
  const hasSuffix = (suffix) => [...paths].some((p) => p.endsWith(suffix));
  const missing = [];
  if (!hasSuffix('/models/gta3.img') && !paths.has('models/gta3.img')) missing.push('models/gta3.img');
  if (!hasSuffix('/data/gta_vc.dat') && !paths.has('data/gta_vc.dat')) missing.push('data/gta_vc.dat');
  const hasAudio = [...paths].some((p) => p.includes('/audio/') || p.startsWith('audio/'));
  if (!hasAudio) missing.push('audio/');
  return missing;
}

checkFolder.addEventListener('click', async () => {
  if ('showDirectoryPicker' in window) {
    try {
      const root = await window.showDirectoryPicker({ mode: 'read' });
      const missing = [];
      try { await (await root.getDirectoryHandle('models')).getFileHandle('gta3.img'); } catch { missing.push('models/gta3.img'); }
      try { await (await root.getDirectoryHandle('data')).getFileHandle('gta_vc.dat'); } catch { missing.push('data/gta_vc.dat'); }
      try { await root.getDirectoryHandle('audio'); } catch { missing.push('audio/'); }
      status.textContent = missing.length
        ? `Pasta incompleta: faltando ${missing.join(', ')}.`
        : 'Instalação compatível detectada. Abra “Jogar agora” e selecione esta mesma instalação no reVC Web.';
      return;
    } catch (error) {
      if (error?.name === 'AbortError') return;
      status.textContent = `Falha ao verificar pasta: ${error?.message ?? error}`;
      return;
    }
  }
  folderInput.click();
});

folderInput.addEventListener('change', () => {
  const missing = validateFileList(folderInput.files || []);
  status.textContent = missing.length
    ? `Pasta incompleta: faltando ${missing.join(', ')}.`
    : 'Instalação compatível detectada. Abra “Jogar agora” e selecione esta mesma instalação no reVC Web.';
});

let wakeLock;
async function requestWakeLock() {
  try {
    if ('wakeLock' in navigator) wakeLock = await navigator.wakeLock.request('screen');
  } catch {}
}

document.addEventListener('visibilitychange', () => {
  if (!document.hidden && wakeLock?.released) requestWakeLock();
});

$('#play').addEventListener('pointerdown', requestWakeLock, { once: true });

if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

status.textContent = `Diagnóstico concluído: ${perf.name}; WebGL2=${graphics.ok ? 'sim' : 'não'}; OPFS=${opfs ? 'sim' : 'não'}; memória informada=${deviceMemory} GB.`;
