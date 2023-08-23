document.addEventListener('DOMContentLoaded', function() {
    // Create the button
    const button = document.createElement('button');
    button.textContent = 'Generate JWT';
    button.id = 'audioblog-jwt-button';

    // Append the button to the body (or wherever you want it)
    document.body.appendChild(button);

    // Add event listener for the button
    document.getElementById('audioblog-jwt-button').addEventListener('click', async function() {
        const content = document.getElementsByTagName('body')[0].innerText;

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
        const audioObject = new Audio(audioUrl);
        //setAudio(audioObject);
        audioObject.play();
        //setPaused(false);
    });
});
