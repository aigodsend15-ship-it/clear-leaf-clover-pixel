# reVC Web Mobile bootstrap

Branch: `revc-web-mobile-bootstrap`

## Objetivo

Preparar a camada web/mobile para executar um build WebAssembly do reVC sem redistribuir arquivos proprietários do GTA Vice City. O usuário seleciona a própria instalação legal e o runtime consome esses arquivos localmente.

## Upstream recomendado

Principal referência técnica:

- `origami-ltd/wasm-revc`
- commit verificado em 2026-09-10: `acde392e0ba582156fcf516dbaeb73b73adebb3e`
- recursos já demonstrados pelo upstream: build Emscripten, WebGL 2, streaming de assets originais, IndexedDB e gamepad.

Importante: o código do reVC não possui uma licença open-source padrão/OSI. O próprio projeto declara uso para educação, documentação e modding, desencoraja pirataria e uso comercial e pede que derivados permaneçam abertos com crédito. Portanto, trate o engine como **source-available com termos próprios**, não como MIT/Apache/BSD.

Referência adicional para UX mobile:

- `Lolendor/reVCDOS` — possui controles touch e uma shell de navegador. O repositório declara MIT para sua camada, porém este bootstrap NÃO copia bundles de jogo, arquivos `dist`, CDN de assets ou dados de Vice City. Ideias de UX podem ser reimplementadas localmente.

## O que já existe nesta branch

`public/revc-mobile/index.html`

- canvas fullscreen;
- safe areas de iOS/Android;
- joystick virtual de movimento;
- joystick virtual de câmera;
- botões A/B/Menu;
- layout portrait/landscape;
- HUD mínimo;
- sem assets do jogo.

`public/revc-mobile/mobile-shell.js`

- detecção simples de capacidade do aparelho;
- perfis `mobile-low`, `mobile-balanced` e `mobile-high`;
- resolução dinâmica inicial;
- File System Access API;
- validação de `models/gta3.img`, `data/gta_vc.dat` e `audio/`;
- eventos `revc:*` para ligar a UI ao runtime WASM;
- suspend/resume ao trocar de app/aba;
- nenhum arquivo do GTA é enviado ao servidor por esta camada.

## Contrato de integração com o WASM

A shell emite:

- `revc:shell-ready`
- `revc:game-folder-ready`
- `revc:resize`
- `revc:axis`
- `revc:button`
- `revc:suspend`
- `revc:resume`

O próximo passo técnico é criar um adapter Emscripten que:

1. receba o `FileSystemDirectoryHandle` selecionado;
2. monte ou espelhe os arquivos necessários em OPFS/MEMFS;
3. faça streaming sob demanda para os caminhos esperados pelo reVC;
4. converta os eventos touch para os inputs do engine;
5. conecte o canvas ao módulo `reVC.js/.wasm`;
6. persista saves em IndexedDB/OPFS;
7. aplique frame pacing e quality scaling no mobile.

## Meta de desempenho inicial

- aparelhos modestos: 30 FPS, escala interna ~0.70;
- aparelhos médios: 30–60 FPS, escala ~0.85;
- aparelhos fortes: até 60 FPS, escala 1.0;
- DPR limitado para evitar desperdício de fill-rate;
- reduzir sombras/distância/efeitos primeiro, antes de degradar input ou física.

## Assets e publicação

Não versionar, subir ou publicar:

- `models/gta3.img`;
- áudio original;
- texturas/modelos do jogo;
- executáveis/binários da Rockstar;
- pacotes de assets obtidos de CDNs de terceiros.

O site deve fornecer apenas engine/camada compatível e pedir que o usuário forneça sua própria cópia legal.
