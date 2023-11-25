let playButton = null;
let playIcon = null;
let audio = null;
let source = null;

function addAudioMenu(domDocument) {
    const menuRow = domDocument.createElement('div');
    menuRow.id = 'menu-row'

    playButton = domDocument.createElement('button');
    playButton.id = 'play-button';
    playButton.className = 'menu-button';

    playIcon = domDocument.createElement('img');
    playIcon.className = 'menu-icon';
    playIcon.src = '/wp-content/plugins/readsonic/assets/player-play.svg';
    playIcon.width = 24;
    playIcon.height = 24;

    audio = domDocument.createElement('audio');
    audio.id = 'audio';
    audio.controls = true;
    audio.innerText = 'Your browser does not support the audio element.';

    domDocument.body.appendChild(menuRow);
    menuRow.appendChild(playButton);
    playButton.appendChild(playIcon);
    menuRow.appendChild(audio);
}

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
    const response = await fetch('http://localhost:8090/synthesize', {
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
    addAudioMenu(document);
    addPlayButtonListener(document);
    addAudioControlListeners(document);
});
