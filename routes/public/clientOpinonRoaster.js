

document.addEventListener('DOMContentLoaded', () => {
    // Disable the textarea
    document.getElementById("roaster-output").addEventListener("keydown", function (e) {
        e.preventDefault();
    });

    const userReasonsInputElement = document.getElementById('reasons-main-content');

    // Get references to the buttons by their IDs
    var lockInButton = document.getElementById("lock-in-button");

    //var lockInButtonForm = document.getElementById("search-form");

    var searchinputlockElement = document.getElementById("search-input");
    var submitRoastMeButton = document.getElementById("submit-roast-me-button");

    var roasterOutput = document.getElementById("roaster-output");

    // Disable the button
    submitRoastMeButton.disabled = true;

    // Event handler to prevent default keydown behavior
    function preventDefaultKeydown(e) {
        e.preventDefault();
    }

    if (localStorage.getItem('opinionInputTitle') != null){
        searchinputlockElement.value = localStorage.getItem('opinionInputTitle')
    }

    if (localStorage.getItem('opinionInput') != null){
        userReasonsInputElement.value = localStorage.getItem('opinionInput')
    }

    if (localStorage.getItem('opinionOutput') != null){
        roasterOutput.value = localStorage.getItem('opinionOutput')
    }

    lockInButton.addEventListener("click", function () {

        var searchinputlock = searchinputlockElement.value.trim();

        // Perform actions when "Refine Input" button is clicked
        //alert("Locked In!");
        if (searchinputlock == null || searchinputlock == "") {
            alert("Please enter an input")
            return
        }

        // Check if the button has the ID "locked-on-button"
        if (lockInButton.id === "lock-in-button") {

            // Perform actions for the "locked-on" state
            submitRoastMeButton.disabled = false;

            lockInButton.textContent = "Exit";
            lockInButton.classList.remove("btn-primary");
            lockInButton.classList.add("btn-secondary");
            lockInButton.id = "locked-on-button"; // Change the ID for the next click
   

            // Enable the keydown event listener
        searchinputlockElement.addEventListener("keydown", preventDefaultKeydown);

        } else if (lockInButton.id === "locked-on-button") {
            // This is the "locked-in" state
            // Perform actions for the "locked-in" state

            // Reset the button to its initial state
            lockInButton.textContent = "Lock In";
            lockInButton.classList.remove("btn-secondary");
            lockInButton.classList.add("btn-primary");
            lockInButton.id = "lock-in-button"; // Restore the original ID

            // Enable the keydown event listener
        searchinputlockElement.removeEventListener("keydown", preventDefaultKeydown);
        submitRoastMeButton.disabled = true;

        }

    });



    submitRoastMeButton.addEventListener('click', async (e) => {
        e.preventDefault();

        var searchinputlocks = searchinputlockElement.value.trim();
        var userReasonsInput = userReasonsInputElement.value.trim();

        if (searchinputlocks == null || searchinputlocks == "") {
            alert("Please enter an input")
            return
        }

        roasterOutput.value = "Loading..."

        submitRoastMeButton.disabled = true;
        userReasonsInputElement.addEventListener("keydown", preventDefaultKeydown);

        // Initialize chat history
        let chatHistoryDebateRoast = [];

        var promptInput = "You are a debateGPT. You are the master of debating and persuasion. I will take a stance on a topic, and you will firmly take the opposing stance. You will stay with this stance consistently at all time, you firmly believe in this stance, and will take it to your grave. You will use all the Logical Fallacies and Persuasion Techniques at your disposal to argue with me, countering my points. Use a mocking, roasting and sarcastic tone to break down my argument, forcing me to believe you are right, make it as entertaining as possible. End your response with 'So anything to add? You can always give up you know' Start by asking me for the topic and stance."

        var assistantInput = "Sure, I'm up for the challenge! Please go ahead and provide the topic and your stance, and I'll take the opposing stance and use all my persuasive skills to counter your points. So, what's the topic and your stance? Don't hold back, I'm ready to give you a run for your money."

        chatHistoryDebateRoast.push(['system', promptInput]);
        chatHistoryDebateRoast.push(['assistant', assistantInput]);

        // Send user input to the server
        try {
            /*console.log("passed to backend")
            const response = await fetch('/chatDebateRoast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchinputlocks, userReasonsInput, chatHistoryDebateRoast }),
            });

            if (!response.ok) {
                alert("An error occured")
                throw new Error('Request failed');
            }

            const data = await response.json();

            var outputStringDebateRoast = data.response;*/

            var outputStringDebateRoast = "Debate output"

            roasterOutput.value = outputStringDebateRoast;

            localStorage.setItem('opinionOutput', outputStringDebateRoast);
            localStorage.setItem('opinionInputTitle', searchinputlocks);
            localStorage.setItem('opinionInput', userReasonsInput);
            userReasonsInputElement.removeEventListener("keydown", preventDefaultKeydown);

            submitRoastMeButton.disabled = false;



        } catch (error) {
            console.error('Error:', error);
            // Handle errors here
        }


    });



});