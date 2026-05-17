const stylesheet = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

/* ===== Music Player Panel ===== */
.react-jinke-music-player-main svg:active,
.react-jinke-music-player-main svg:hover {
  color: #0ea5e9;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle,
.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-track {
  background-color: #0ea5e9;
}

.react-jinke-music-player-main ::-webkit-scrollbar {
  width: 4px;
}

.react-jinke-music-player-main ::-webkit-scrollbar-thumb {
  background-color: rgba(14, 165, 233, 0.25);
  border-radius: 9999px;
}

.react-jinke-music-player-main ::-webkit-scrollbar-track {
  background: transparent;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle:active {
  box-shadow: 0 0 0 5px rgba(14, 165, 233, 0.2);
}

.react-jinke-music-player-main .audio-item.playing svg {
  color: #0ea5e9;
}

.react-jinke-music-player-main .audio-item.playing .player-singer {
  color: #0ea5e9 !important;
}

.audio-lists-panel-content .audio-item.playing,
.audio-lists-panel-content .audio-item.playing svg {
  color: #0ea5e9;
}

.audio-lists-panel-content .audio-item:active .group:not([class=".player-delete"]) svg,
.audio-lists-panel-content .audio-item:hover .group:not([class=".player-delete"]) svg {
  color: #0ea5e9;
}

.react-jinke-music-player-main .music-player-panel {
  border-radius: 16px 16px 0 0;
  background-color: rgba(9, 9, 11, 0.92);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-family: 'Inter', sans-serif;
}

.react-jinke-music-player-main .audio-lists-panel {
  border-radius: 16px 16px 0 0;
  background-color: rgba(9, 9, 11, 0.95);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
}

.react-jinke-music-player-main .audio-lists-panel .audio-lists-panel-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 16px 20px;
}

.react-jinke-music-player-main .audio-lists-panel .audio-lists-panel-header .header-title {
  font-weight: 700;
  font-size: 1.125rem;
  letter-spacing: -0.02em;
}

.react-jinke-music-player-main .audio-lists-panel .audio-item {
  padding: 10px 16px;
  border-left: 2px solid transparent;
  transition: all 0.15s ease;
}

.react-jinke-music-player-main .audio-lists-panel .audio-item:hover {
  background-color: rgba(255, 255, 255, 0.04);
  border-left-color: #0ea5e9;
}

.react-jinke-music-player-main .audio-lists-panel .audio-item.playing {
  border-left-color: #0ea5e9;
  background-color: rgba(14, 165, 233, 0.06);
}

.react-jinke-music-player-main .music-player-controller {
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.react-jinke-music-player-main .rc-slider-rail {
  height: 3px;
  background-color: rgba(255, 255, 255, 0.08);
}

.react-jinke-music-player-main .rc-slider-track {
  height: 3px;
}

.react-jinke-music-player-main .rc-slider-handle {
  border: none;
  width: 12px;
  height: 12px;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle {
  border: none;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
  transition: box-shadow 0.15s ease;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle:hover {
  box-shadow: 0 0 0 5px rgba(14, 165, 233, 0.25);
}

.react-jinke-music-player-main .audio-lists-panel {
  display: none !important;
}

/* ===== Mobile player overrides ===== */
.react-jinke-music-player-mobile {
  background: rgba(9, 9, 11, 0.96) !important;
  backdrop-filter: blur(40px) saturate(200%) !important;
}

.react-jinke-music-player-mobile .react-jinke-music-player-mobile-header .item svg {
  color: rgba(255, 255, 255, 0.7);
}

.react-jinke-music-player-mobile .react-jinke-music-player-mobile-operation .items svg {
  color: rgba(255, 255, 255, 0.7);
}
`

export default stylesheet
