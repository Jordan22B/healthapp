const player = videojs('hls-video', {}, () => {
  player.src({ type: 'video/youtube', src: 'https://www.youtube.com/watch?v=Oqt9TgWcrxI' })
  // player.play()
})