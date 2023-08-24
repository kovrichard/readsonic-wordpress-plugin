let playIcon = null;
let audio = null;
let source = null;

function addAudioMenu(domDocument) {
    const menuRow = domDocument.createElement('div');
    menuRow.id = 'menu-row'

    const playButton = document.createElement('button');
    playButton.id = 'play-button';
    playButton.className = 'menu-button';

    playIcon = domDocument.createElement('img');
    playIcon.className = 'menu-icon';
    playIcon.src = '/wp-content/plugins/audioblog/player-play.svg';
    playIcon.width = 24;
    playIcon.height = 24;

    audio = domDocument.createElement('audio');
    audio.id = 'audio';
    audio.controls = true;
    audio.innerText = 'Your browser does not support the audio element.';

    document.body.appendChild(menuRow);
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

document.addEventListener('DOMContentLoaded', function() {
    addAudioMenu(document);

    // Add event listener for the button
    document.getElementById('play-button').addEventListener('click', async function() {
        if (togglePlay()) {
            return;
        }

        const content = document.getElementsByTagName('main')[0].innerText;

        const response = await fetch('/wp-json/audioblog-jwt/v1/generate', {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': window.csrfToken,
            },
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify({"content": content}),
        })
        const body = await response.json();
        const audioUrl = body.content;
    
        source = document.createElement('source');
        source.id = 'audio-source';
        source.type = 'audio/mpeg';
        source.src = audioUrl;

        audio.style.display = 'block';
        audio.appendChild(source);
        audio.play();

    });

    document.getElementById('audio').addEventListener('pause', function() {
        playIcon.src = '/wp-content/plugins/audioblog/player-play.svg';
    });

    document.getElementById('audio').addEventListener('play', function() {
        playIcon.src = '/wp-content/plugins/audioblog/player-pause.svg';
    });
});
