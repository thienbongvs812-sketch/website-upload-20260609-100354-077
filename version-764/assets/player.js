(function () {
  window.initPlayer = function (videoId, layerId, url) {
    var video = document.getElementById(videoId);
    var layer = document.getElementById(layerId);
    var loaded = false;
    var hls = null;

    if (!video) {
      return;
    }

    function attach() {
      if (loaded) {
        return;
      }

      loaded = true;

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
      } else if (window.Hls && window.Hls.isSupported()) {
        hls = new window.Hls({
          maxBufferLength: 28,
          backBufferLength: 12
        });
        hls.loadSource(url);
        hls.attachMedia(video);
      } else {
        video.src = url;
      }
    }

    function play() {
      attach();
      video.setAttribute('controls', 'controls');

      var started = video.play();
      if (started && typeof started.catch === 'function') {
        started.catch(function () {});
      }

      if (layer) {
        layer.classList.add('is-hidden');
      }
    }

    if (layer) {
      layer.addEventListener('click', play);
    }

    video.addEventListener('click', function () {
      if (video.paused) {
        play();
      }
    });

    video.addEventListener('play', function () {
      if (layer) {
        layer.classList.add('is-hidden');
      }
    });

    window.addEventListener('pagehide', function () {
      if (hls) {
        hls.destroy();
        hls = null;
      }
    });
  };
})();
