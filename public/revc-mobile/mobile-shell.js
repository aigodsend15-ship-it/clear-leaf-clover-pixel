const $ = (s) => document.querySelector(s);
const play = $('#play');
const fullscreen = $('#fullscreen');
const nodeState = $('#nodeState');
const modeLabel = $('#modeLabel');
const stream = $('#stream');

const params = new URLSearchParams(location.search);
const coarse = matchMedia('(pointer: coarse)').matches;
const ua = navigator.userAgent;
const isTV = /SmartTV|Tizen|Web0S|WebOS|NetCast|HbbTV|BRAVIA|AFTB|AFTT|AFTS/i.test(ua);
const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua) || coarse;
const deviceMode = isTV ? 'TV' : isMobile ? 'MOBILE' : 'PC';
modeLabel.textContent = deviceMode;
document.body.classList.toggle('coarse', coarse);

// Production can hard-code this file at deploy time. For testing, append
// ?stream=https://your-selkies-node.example to the launcher URL.
let streamUrl = params.get('stream') || '';

async function loadConfig() {
  try {
    const response = await fetch('./cloud-config.json', { cache: 'no-store' });
    if (!response.ok) return;
    const config = await response.json();
    if (!streamUrl && typeof config.streamUrl === 'string') streamUrl = config.streamUrl.trim();
  } catch {}
}

function normalizeEndpoint(value) {
  try {
    const url = new URL(value);
    if (!/^https?:$/.test(url.protocol)) return '';
    return url.href;
  } catch {
    return '';
  }
}

async function probeNode() {
  streamUrl = normalizeEndpoint(streamUrl);
  if (!streamUrl) {
    play.disabled = true;
    nodeState.innerHTML = '<span class="warn">cliente online · nó de jogo ainda não configurado</span>';
    return false;
  }

  nodeState.textContent = 'conectando ao nó…';
  // Cross-origin Selkies nodes do not need to expose CORS for the iframe itself.
  // A no-cors probe only tells us whether the browser could issue the request;
  // final connection state is owned by the Selkies client.
  try {
    await fetch(streamUrl, { mode: 'no-cors', cache: 'no-store' });
    nodeState.innerHTML = '<span class="ok">nó disponível</span>';
    play.disabled = false;
    return true;
  } catch {
    nodeState.innerHTML = '<span class="bad">nó indisponível</span>';
    play.disabled = false; // still allow opening: some hosts reject probes but accept navigation
    return false;
  }
}

async function enterFullscreen() {
  try {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
  } catch {}
}

play.addEventListener('click', async () => {
  if (!streamUrl) return;
  await enterFullscreen();
  stream.src = streamUrl;
  document.body.classList.add('streaming');
});

fullscreen.addEventListener('click', enterFullscreen);

window.addEventListener('message', (event) => {
  if (!streamUrl) return;
  try {
    if (new URL(streamUrl).origin !== event.origin) return;
  } catch { return; }
  if (event.data?.type === 'selkies-connected') nodeState.innerHTML = '<span class="ok">stream conectado</span>';
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('streaming') && !document.fullscreenElement) {
    document.body.classList.remove('streaming');
    stream.src = 'about:blank';
  }
});

if ('serviceWorker' in navigator) {
  addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

await loadConfig();
await probeNode();
