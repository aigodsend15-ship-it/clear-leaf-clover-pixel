$ErrorActionPreference = 'Stop'

$Repo = 'https://github.com/origami-ltd/wasm-revc.git'
$Commit = 'acde392e0ba582156fcf516dbaeb73b73adebb3e'
$Root = Split-Path -Parent $PSScriptRoot
$Vendor = Join-Path $Root '.cache\wasm-revc'

function Require-Command([string]$Name) {
    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Comando obrigatorio nao encontrado: $Name"
    }
}

Require-Command git

if (-not (Test-Path $Vendor)) {
    New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Vendor) | Out-Null
    git clone --recursive $Repo $Vendor
}

Push-Location $Vendor
try {
    git fetch origin
    git checkout --detach $Commit
    git submodule update --init --recursive

    $Actual = (git rev-parse HEAD).Trim()
    if ($Actual -ne $Commit) {
        throw "Commit inesperado. Esperado=$Commit Atual=$Actual"
    }

    Write-Host "UPSTREAM_OK=$Actual"
    Write-Host "PATH=$Vendor"
    Write-Host 'Nenhum asset do GTA Vice City foi baixado por este script.'
    Write-Host 'Para compilar, configure Emscripten/CMake conforme o README do upstream e use sua propria instalacao legal do jogo em runtime.'
}
finally {
    Pop-Location
}
