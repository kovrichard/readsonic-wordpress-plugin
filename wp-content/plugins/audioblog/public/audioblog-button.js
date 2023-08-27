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
    playIcon.src = '/wp-content/plugins/audioblog/assets/player-play.svg';
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

async function fetchAudioUrl(content) {
    const response = await fetch('/wp-json/audioblog/v1/generate-audio', {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': window.csrfToken,
        },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({"content": content}),
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

        playIcon.src = '/wp-content/plugins/audioblog/assets/loader-2.svg';
        playIcon.className = 'rotate-360'
        const content = domDocument.getElementsByTagName('main')[0].innerText;
        const response = await fetchAudioUrl(content);
        
        const body = await response.json();
        const audioUrl = body.content;
    
        addSource(domDocument, audioUrl);

        playButton.style.display = 'none';
        playIcon.src = '/wp-content/plugins/audioblog/assets/player-pause.svg';
        playIcon.className = '';
        audio.style.display = 'block';
        audio.play();
    });
}

function addAudioControlListeners(domDocument) {
    domDocument.getElementById('audio').addEventListener('pause', function() {
        playIcon.src = '/wp-content/plugins/audioblog/assets/player-play.svg';
    });

    domDocument.getElementById('audio').addEventListener('play', function() {
        playIcon.src = '/wp-content/plugins/audioblog/assets/player-pause.svg';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    addAudioMenu(document);
    addPlayButtonListener(document);
    addAudioControlListeners(document);
});
