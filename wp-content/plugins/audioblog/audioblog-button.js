document.addEventListener('DOMContentLoaded', function() {
    // Create the button
    const button = document.createElement('button');
    button.textContent = 'Generate JWT';
    button.id = 'audioblog-jwt-button';

    // Append the button to the body (or wherever you want it)
    document.body.appendChild(button);

    // Add event listener for the button
    document.getElementById('audioblog-jwt-button').addEventListener('click', async function() {
        const response = await fetch('/wp-json/audioblog-jwt/v1/generate')
        const body = await response.json();

        const content = document.getElementsByTagName('body')[0].innerText;
        const payload = {
            "content": content,
            "voice": body.voice,
        };
        const awsResponse = await fetch('https://tz26q7b28i.execute-api.eu-central-1.amazonaws.com/stage/tts',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${body.token}`
                },
                body: JSON.stringify(payload)
            }
        )
        const awsBody = await awsResponse.json();

        const audioUrl = awsBody.content;
        const audioObject = new Audio(audioUrl);
        //setAudio(audioObject);
        audioObject.play();
        //setPaused(false);
    });
});
