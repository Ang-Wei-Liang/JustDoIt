

document.addEventListener('DOMContentLoaded', () => {

    const button = document.getElementById('closeButton');
    const countdownElement = document.getElementById('countdown');
    const textBoxElement = document.getElementById('myTextbox');
    const taskTextTranfser = document.getElementById('taskTextTranfser');
    const imageContainer = document.getElementById('image-container');
    const backButton = document.getElementById('backButton');

    backButton.style.display = 'none';

    placeHolderTaskArr = ['e.g. put on jogging shoes', 'e.g. open laptop', 'e.g. open textbook', 'e.g. ask my crush out', 'e.g. do 10 push ups']

    // Function to shuffle the array randomly
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Call the function to shuffle the array
    shuffleArray(placeHolderTaskArr);
    
    /*myTextbox.placeholder = 'Enter your task...';
    const randomtaskNumber = Math.floor(Math.random() * placeHolderTaskArr.length); // Generates random numbers 0, 1, or 2


    myTextbox.placeholder = placeHolderTaskArr[randomtaskNumber];*/

    let currentIndex = 0;

    // Function to update the placeholder text
    function updatePlaceholder() {
        myTextbox.placeholder = placeHolderTaskArr[currentIndex];
        currentIndex = (currentIndex + 1) % placeHolderTaskArr.length; // Loop through the array
    }

    //These two I choose not to add in, as the placeholders can be kinda confusing and unappealing no offense
    // Call the function to set the initial placeholder
    //updatePlaceholder();

    // Set an interval to change the placeholder every 3 seconds
    //const intervalId = setInterval(updatePlaceholder, 15000);


    // Function to hide elements
    function hideElements() {
        const elementsToHide = [
            document.getElementById('topLeftButton'),
            document.getElementById('audio'),
            document.getElementById('myTextbox'),
            document.getElementById('closeButton'),
            document.getElementById('image-container'),
            document.getElementById('myTextbox2'),
            document.getElementById('inlabel'),
            document.getElementById('secondslabel')

        ];

        elementsToHide.forEach(element => {
            if (element) {
                element.style.display = 'none';
            }
        });
    }

    // Function to show (unhide) elements
    function showElements() {
        const elementsToShow = [
            document.getElementById('topLeftButton'),
            document.getElementById('audio'),
            document.getElementById('myTextbox'),
            //document.getElementById('closeButton'),
            document.getElementById('countdown'),
            document.getElementById('myTextbox2'),
            document.getElementById('inlabel'),
            document.getElementById('secondslabel')
        ];

        elementsToShow.forEach(element => {
            if (element) {
                element.style.display = ''; // Set to an empty string to revert to the default display value
            }
        });
    }

    const mainBody = document.getElementById('main-container-color');


    button.addEventListener('click', function () {
        const myTextbox = document.getElementById("myTextbox2");
        var countdown = 11
        const value = myTextbox.value;

        const intValue = parseInt(value, 10);

        if (!isNaN(intValue) && intValue > 0) {
            // The input is a valid positive integer
            countdown = intValue
        } else {
            // The input is not a valid positive integer
            countdown = 11
        }

        button.disabled = true; // Disable the button
        var actionText = textBoxElement.value;

        hideElements();

        console.log(actionText)

        taskTextTranfser.textContent = actionText;

        function changeButtonColor() {
            /*const closeButton = document.getElementById('closeButton');
            closeButton.style.backgroundColor = 'red';
            closeButton.style.color = 'white';*/

            //document.body.style.backgroundColor = 'red';

            
            mainBody.style.backgroundColor = 'red'
        }

        function updateCountdown() {

            var afterText = " seconds to leave this tab and "

            countdownElement.textContent = "⚠️ " + countdown + afterText;
            countdown--;

            if (countdown >= 0) {
                setTimeout(updateCountdown, 1000); // Update countdown every second
            } else {
                button.disabled = false; // Disable the button



                // Close the window or tab when the countdown reaches 0

                //Lets SAVE to DATABASE

                var responseArray = ["Waiting until the last minute? Time flies, but you're the pilot.","Future you is going to hate past you for procrastinating. Thanks a lot, past self!","Not today? Good luck starting 'tomorrow' then"]

                //var responseArray = ['💩', '🤬', '💀']

                const randomNumber = Math.floor(Math.random() * responseArray.length); // Generates random numbers 0, 1, or 2


                mainBody.style.backgroundColor = 'white'
                countdownElement.style.color = 'black'
                countdownElement.textContent = responseArray[randomNumber];
                backButton.style.display = "";

            }
        }

        changeButtonColor()
        updateCountdown(); // Start the countdown
    });

    topLeftButton.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            topLeftButton.innerHTML = '<strong>Pause</strong>';
        } else {
            audio.pause();
            audio.currentTime = 0; // Reset the audio to the beginning
            topLeftButton.innerHTML = '<strong>Play</strong>';
        }
    });

    backButton.addEventListener('click', function () {

        location.reload();

    });

});