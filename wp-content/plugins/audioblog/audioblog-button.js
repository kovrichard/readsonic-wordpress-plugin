document.addEventListener('DOMContentLoaded', function() {
    // Create the button
    const button = document.createElement('button');
    button.textContent = 'Generate JWT';
    button.id = 'audioblog-jwt-button';

    // Append the button to the body (or wherever you want it)
    document.body.appendChild(button);

    // Add event listener for the button
    document.getElementById('audioblog-jwt-button').addEventListener('click', function() {
        fetch('/wp-json/audioblog-jwt/v1/generate')
            .then(response => response.json())
            .catch(error => {
                console.error('Error fetching JWT:', error);
            });
        const content = document.getElementsByTagName('body')[0].innerText;
        const payload = {
            "content": content,
            "voice": "Matthew",
        };
        fetch('https://tz26q7b28i.execute-api.eu-central-1.amazonaws.com/stage/tts', {method: "POST", headers: { "Content-Type": "application/json", "Authorization": "Bearer test-token"}, body: JSON.stringify(payload)})
        .then(response => response.json())
        .then((data) => {
            const audioUrl = data.content;
            const audioObject = new Audio(audioUrl);
            //setAudio(audioObject);
            audioObject.play();
            //setPaused(false);
        });
    });
});
