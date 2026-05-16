const stylesheet = `
.react-jinke-music-player-main svg:active,
.react-jinke-music-player-main svg:hover {
  color: #fc3c44;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle,
.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-track {
  background-color: #fc3c44;
}

.react-jinke-music-player-main ::-webkit-scrollbar {
  width: 4px;
}

.react-jinke-music-player-main ::-webkit-scrollbar-thumb {
  background-color: rgba(252, 60, 68, 0.2);
  border-radius: 9999px;
}

.react-jinke-music-player-main ::-webkit-scrollbar-track {
  background: transparent;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle:active {
  box-shadow: 0 0 0 5px rgba(252, 60, 68, 0.15);
}

.react-jinke-music-player-main .audio-item.playing svg {
  color: #fc3c44;
}

.react-jinke-music-player-main .audio-item.playing .player-singer {
  color: #fc3c44 !important;
}

.audio-lists-panel-content .audio-item.playing,
.audio-lists-panel-content .audio-item.playing svg {
  color: #fc3c44;
}

.audio-lists-panel-content .audio-item:active .group:not([class=".player-delete"]) svg,
.audio-lists-panel-content .audio-item:hover .group:not([class=".player-delete"]) svg {
  color: #fc3c44;
}

.react-jinke-music-player-main .music-player-panel {
  border-radius: 20px 20px 0 0;
  background-color: rgba(10, 10, 10, 0.88);
  backdrop-filter: saturate(180%) blur(40px);
  -webkit-backdrop-filter: saturate(180%) blur(40px);
}

.react-jinke-music-player-main .audio-lists-panel {
  border-radius: 20px 20px 0 0;
  background-color: rgba(10, 10, 10, 0.92);
  backdrop-filter: saturate(180%) blur(40px);
  -webkit-backdrop-filter: saturate(180%) blur(40px);
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
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.react-jinke-music-player-main .audio-lists-panel .audio-item:hover {
  background-color: rgba(255, 255, 255, 0.04);
  border-left-color: #fc3c44;
}

.react-jinke-music-player-main .audio-lists-panel .audio-item.playing {
  border-left-color: #fc3c44;
  background-color: rgba(252, 60, 68, 0.06);
}

.react-jinke-music-player-main .music-player-controller {
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.react-jinke-music-player-main .rc-slider-rail {
  height: 4px;
  background-color: rgba(255, 255, 255, 0.08);
}

.react-jinke-music-player-main .rc-slider-track {
  height: 4px;
}

.react-jinke-music-player-main .rc-slider-handle {
  border: none;
  width: 14px;
  height: 14px;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle {
  border: none;
  box-shadow: 0 0 0 3px rgba(252, 60, 68, 0.12);
  transition: box-shadow 0.15s ease;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle:hover {
  box-shadow: 0 0 0 5px rgba(252, 60, 68, 0.2);
}

.react-jinke-music-player-main .audio-lists-panel {
  display: none !important;
}
`

export default stylesheet
