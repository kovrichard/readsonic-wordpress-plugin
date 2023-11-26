/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from create-block-readsonic block)' );
/* eslint-enable no-console */

import Loader from '../../assets/loader-2.svg';
import Play from '../../assets/player-play.svg';
import Pause from '../../assets/player-pause.svg';

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
    const response = await fetch('http://localhost:8080/synthesize', {
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
    audio.src = audioUrl;
}

function addPlayButtonListener(domDocument) {
    domDocument.getElementById('menu-button').addEventListener('click', async function() {
        if (togglePlay()) {
            return;
        }

        playIcon.src = Loader;
        playIcon.className = 'rotate-360'
        const response = await synthesizePost();
        
        const body = await response.json();
        const audioUrl = body.content;
    
        addSource(domDocument, audioUrl);

        playIcon.src = Pause;
        playIcon.className = '';
        audio.style.display = 'block';
    });
}

function addAudioControlListeners(domDocument) {
    domDocument.getElementById('audio-player').addEventListener('pause', function() {
        playIcon.src = Play;
    });

    domDocument.getElementById('audio-player').addEventListener('play', function() {
        playIcon.src = Pause;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    audio = document.getElementById('audio-player');
    playIcon = document.getElementById('menu-icon');
    addPlayButtonListener(document);
    addAudioControlListeners(document);
});
