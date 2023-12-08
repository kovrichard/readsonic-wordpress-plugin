let playButton = null;
let playIcon = null;
let audio = null;
let source = null;

function togglePlay() {
    if (source && !audio.paused) {
        audio.pause();
        return true;
    } else if (source && audio.paused) {
        audio.play();
        return true;
    }
    return false;
}

async function synthesizePost() {
    const payload = {
        "origin": window.location.origin,
        "slug": window.location.pathname,
    };
    const response = await fetch('https://api.readsonic.io/synthesize/wordpress', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(payload),
    });
    return response;
}

function addSource(domDocument, audioUrl) {
    source = domDocument.createElement('source');
    source.id = 'audio-source';
    source.type = 'audio/mpeg';
    source.src = audioUrl;
    audio.appendChild(source);
}


function addPlayButtonListener(domDocument) {
    domDocument.getElementById('play-button').addEventListener('click', async function() {
        if (togglePlay()) {
            return;
        }

        playIcon.src = '/wp-content/plugins/readsonic/assets/loader-2.svg';
        playIcon.className = 'rotate-360'
        const response = await synthesizePost();
        
        const body = await response.json();
        const audioUrl = body.content;
    
        addSource(domDocument, audioUrl);

        playButton.style.display = 'none';
        playIcon.src = '/wp-content/plugins/readsonic/assets/player-pause.svg';
        playIcon.className = '';
        audio.style.display = 'block';
        audio.play();
    });
}

function addAudioControlListeners(domDocument) {
    domDocument.getElementById('audio').addEventListener('pause', function() {
        playIcon.src = '/wp-content/plugins/readsonic/assets/player-play.svg';
    });

    domDocument.getElementById('audio').addEventListener('play', function() {
        playIcon.src = '/wp-content/plugins/readsonic/assets/player-pause.svg';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    audio = document.getElementById('audio');
    playIcon = document.getElementById('play-icon');
    addPlayButtonListener(document);
    addAudioControlListeners(document);
});
