

document.addEventListener('DOMContentLoaded', () => {
    // Disable the textarea
    document.getElementById("writing-output").addEventListener("keydown", function (e) {
        e.preventDefault();
    });

    //console.log("writing inputX is " + localStorage.getItem('writingInput'))

    const getTitle = document.getElementById('RoastTitle');


    const userWritingInputElement = document.getElementById('writing-main-content');

    var submitWriterMeButton = document.getElementById("submit-writing-me-button");

    var roasterOutput = document.getElementById("writing-output");

    // Disable the button
    //submitWriterMeButton.disabled = true;

    // Event handler to prevent default keydown behavior
    function preventDefaultKeydown(e) {
        e.preventDefault();
    }

    if (getTitle.textContent == 'Writing Critique') {

        if (localStorage.getItem('writingInput') != null) {
            userWritingInputElement.value = localStorage.getItem('writingInput')
        }

        if (localStorage.getItem('writingOutput') != null) {
            roasterOutput.value = localStorage.getItem('writingOutput')
            //roasterOutput.value = "Loading... This is a test text 123, I repeat this is a test."
        }

    } else {

        if (localStorage.getItem('codeInput') != null) {
            userWritingInputElement.value = localStorage.getItem('codeInput')
        }

        if (localStorage.getItem('codeOutput') != null) {
            roasterOutput.value = localStorage.getItem('codeOutput')
        }

    }

    //roasterOutput.value = "Loading... This is a test text 123, I repeat this is a test."

    


    submitWriterMeButton.addEventListener('click', async (e) => {
        e.preventDefault();

        var userWritingInput = userWritingInputElement.value.trim();

        if (userWritingInput == null || userWritingInput == "") {
            alert("Please enter an input")
            return
        }

        roasterOutput.value = "Loading..."

        submitWriterMeButton.disabled = true;
        userWritingInputElement.addEventListener("keydown", preventDefaultKeydown);

        // Initialize chat history
        let chatHistoryWritingRoast = [];

        var promptInput
        var assistantInput
        var codeOrwrite

        const getTitle = document.getElementById('RoastTitle');

        console.log("Title value is" + getTitle.textContent)

        if (getTitle.textContent == 'Writing Critique') {

            //if ()
            codeOrwrite = 'write'
            promptInput = "You are a writerGPT. You know what it means to have a great piece of writing. Plot, character, grammar, vocabulary, sentence structure, you are an expert at everything. I will give you a piece of writing. You will pick out its flaws and critizise it. Use a mocking, roasting and sarcastic tone to break down my writing, forcing me to believe you are right. End your response with 3 concise crucial questions that will improve the writing. Start by asking me for the writing."
            assistantInput = "Of course, I'd be happy to help you identify flaws in your writing and offer constructive criticism. Please share the part of your writing you'd like me to critique, and I'll do my best to provide feedback in a humorous and sarcastic manner. Now, don't hold back! Lay that literary disaster on me, and let's get to work on roasting it like a marshmallow over a campfire of bad metaphors!"

        } else {

            codeOrwrite = 'code'
            promptInput = "You are a codeGPT. You know what it means to have a great piece of code. Documentation, error handling, logic, programme efficiency, time complexity, you are an expert at everything. I will give you part of a piece of code. You will pick out its flaws and critizise it. Use a mocking, roasting and sarcastic tone to break down my code, forcing me to believe you are right. End your response with 3 crucial concise questions that will help me improve. Start by asking me for the code."
            assistantInput = "Oh, I'd absolutely love to dissect your code masterpiece! Please, hand it over, and let's see what treasure trove of coding brilliance you've brought for my critique. I can hardly contain my excitement! So, without further ado, let's dive right into this coding adventure of yours. Please, share the code snippet, and we shall embark on this journey together."

        }

        chatHistoryWritingRoast.push(['system', promptInput]);
        chatHistoryWritingRoast.push(['assistant', assistantInput]);

        // Send user input to the server
        try {
            /*console.log("passed to backend")
            const response = await fetch('/chatWritingRoast', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userWritingInput, chatHistoryWritingRoast }),
            });

            if (!response.ok) {
                alert("An error occured")
                throw new Error('Request failed');
            }

            const data = await response.json();

            var outputStringWritingRoast = data.response;*/

            var outputStringWritingRoast = "This is the output"

            roasterOutput.value = outputStringWritingRoast;



            if (codeOrwrite == 'write'){

                console.log("its right")

                localStorage.setItem('writingInput', userWritingInput);

        

                localStorage.setItem('writingOutput', outputStringWritingRoast);

            } else {

                console.log("its code")

                localStorage.setItem('codeInput', userWritingInput);
                localStorage.setItem('codeOutput', outputStringWritingRoast);

            }
;
            submitWriterMeButton.disabled = false;
            userWritingInputElement.removeEventListener("keydown", preventDefaultKeydown);



        } catch (error) {
            console.error('Error:', error);
            // Handle errors here
        }


    });



});