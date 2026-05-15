const stylesheet = `
.react-jinke-music-player-main svg:active,
.react-jinke-music-player-main svg:hover {
  color: #6366f1;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle,
.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-track {
  background-color: #6366f1;
}

.react-jinke-music-player-main ::-webkit-scrollbar-thumb {
  background-color: #6366f1;
  border-radius: 9999px;
}

.react-jinke-music-player-main .music-player-panel .panel-content .rc-slider-handle:active {
  box-shadow: 0 0 6px #6366f1;
}

.react-jinke-music-player-main .audio-item.playing svg {
  color: #6366f1;
}

.react-jinke-music-player-main .audio-item.playing .player-singer {
  color: #6366f1 !important;
}

.audio-lists-panel-content .audio-item.playing,
.audio-lists-panel-content .audio-item.playing svg {
  color: #6366f1;
}

.audio-lists-panel-content .audio-item:active .group:not([class=".player-delete"]) svg,
.audio-lists-panel-content .audio-item:hover .group:not([class=".player-delete"]) svg {
  color: #6366f1;
}

.react-jinke-music-player-main .music-player-panel {
  border-radius: 16px 16px 0 0;
}

.react-jinke-music-player-main .audio-lists-panel {
  border-radius: 16px 16px 0 0;
}
`

export default stylesheet
