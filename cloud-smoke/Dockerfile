FROM ghcr.io/selkies-project/selkies/desktop:main-ubuntu26.04

USER 0
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update \
 && apt-get install -y --no-install-recommends chocolate-doom freedoom \
 && rm -rf /var/lib/apt/lists/*

# Render/other HTTPS reverse proxies terminate TLS in front of Selkies.
ENV SELKIES_ENABLE_HTTPS=false \
    SELKIES_ENABLE_BASIC_AUTH=false \
    SELKIES_USE_CPU=true \
    SELKIES_ENCODER=h264enc \
    SELKIES_FRAMERATE=30-30 \
    SELKIES_VIDEO_BITRATE=1800-1800 \
    SELKIES_MANUAL_WIDTH=960 \
    SELKIES_MANUAL_HEIGHT=540 \
    SELKIES_AUDIO_BITRATE=64000 \
    SELKIES_ENABLE_RESIZE=false \
    SELKIES_RUN_AFTER_CONNECT="sh -lc 'pkill -f chocolate-doom || true; DISPLAY=${DISPLAY:-:20} chocolate-doom -iwad freedoom1.wad -window >/tmp/freedoom.log 2>&1 &'"

# Most managed web hosts discover the exposed HTTP port automatically.
EXPOSE 8080
