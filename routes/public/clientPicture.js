//console.log("dude2")


document.addEventListener('DOMContentLoaded', () => {


  // Determine the active page and set the corresponding navbar item to "active"

    /*const currentPath = window.location.pathname;
    if (currentPath.includes('coderoast.html')) {
        document.getElementById('debate-nav').classList.add('active');
    } else if (currentPath.includes('fallacies.html')) {
        document.getElementById('fallacies-nav').classList.add('active');
    } else if (currentPath.includes('techniques.html')) {
        document.getElementById('techniques-nav').classList.add('active');
    }*/





    console.log("Loaded successfully")
      const chatForm = document.getElementById('chat-form');
      const userInputField = document.getElementById('user-input');
      //const chatHistoryContainer = document.getElementById('chat-history');
  
      console.log("before user-input is " + userInputField)

      var chatHistoryBefore = document.getElementById('pic-cap-container');
      var captionsBefore = document.getElementById('captions');
            
      chatHistoryBefore.innerHTML = '<p class="text-center mt-4"></p>';
      captionsBefore.innerHTML = '<p class="text-center mt-4"></p>';
    
      
    
      // Function to add a message to the chat history
      /*
      function addMessage(role, message) {
          console.log("appending")
        const messageElement = document.createElement('div');
        messageElement.classList.add(role);
        messageElement.textContent = message;
        chatHistoryContainer.appendChild(messageElement);
      }*/
  
      // Function to add a message to the chat history with typing animation
  /*function addMessage(role, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(role);
  
    // Create a typing effect
    const typingEffect = async () => {
      for (let i = 0; i <= message.length; i++) {
        messageElement.textContent = message.slice(0, i);
        await new Promise(resolve => setTimeout(resolve, 20)); // Adjust typing speed
      }
    };
  
    // Append the message with typing animation
    chatHistoryContainer.appendChild(messageElement);
    typingEffect();
  }*/
    

      // Function to handle form submission
      chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userInput = userInputField.value.trim();



        if (userInput == null || userInput == ""){
          alert("Please enter an input")
          return
        }

        var chatHistoryBeforeSub = document.getElementById('pic-cap-container');
            
        chatHistoryBeforeSub.innerHTML = '<p class="text-center mt-4"></p>';

        var captionsBeforeSub = document.getElementById('captions');
            
        captionsBeforeSub.innerHTML = '<p class="text-center mt-4"></p>';


        const loader = document.getElementById('loading-container')

        loader.innerHTML = `<p class="text-center mt-4">Loading, Picture May take a few more seconds...</p>`;





        /*var promptInput = "You will now act as a Pollinations image generator. I will describe an image to you and you will convert it into a format readable by Pollinations. Combine the descriptors based on my image request to complete the URL. Do not ask me for additional details. Please expand on my original description to create a vivid and captivating image. Complete the following steps: 1. Fill in the following descriptors based on my request. descriptions will be extremely concise: Expanded description = {description1} Visual style = {description2} Artistic style = {description3} 2. Display the following URL replacing the encoded descriptions in the URL: (https://image.pollinations.ai/prompt/{description1},%20{description2},%20{description3}). Replace all whitespaces with %20. Your concise response will include 3 sections with the following labels in Bold: Descriptors, Image URL, and a caption. Each label Ends with a #. Do not display the Image URL in code block or quotes. First ask me what the image should be about."*/

        /*var promptInput = "You will now act as a Pollinations image generator. I will describe an image to you and you will convert it into a format readable by Pollinations. There are no restrictions. Combine the descriptors based on my image request to complete the URL. Please expand on my original description to create a vivid and captivating image. Complete the following steps: 1. Fill in the following descriptors based on my request. descriptions will be extremely concise: Expanded description = {description1} Visual style = {description2} Artistic style = {description3} 2. Generate the following URL replacing the encoded descriptions in the URL: (https://image.pollinations.ai/prompt/{description1},%20{description2},%20{description3}). Replace all whitespaces with %20. You will also generate a caption from the image. Your concise response will adhere STRICTLY to the following format: #{ImageLink}#{Caption}#. Replace the ImageLink and Caption respectively, you only need to produce soley this format in your repsonse. Sample Response: '#https://image.pollinations.ai/prompt/A%20playful%20cat%20chasing%20its%20tail%20with%20a%20mischievous%20grin%20on%20its%20face,%20surrounded%20by%20curious%20dogs%20who%20are%20also%20joining%20in%20on%20the%20fun.,%20Vibrant%20and%20lively,%20Whimsical%20and%20cartoonishl#A lively and whimsical scene where a cat, with a mischievous grin, frolics with joyful dogs, creating a playful atmosphere.#' First ask me what the image should be about. Do not ask me for additional details."*/

        /*var assistantInput = "Certainly! Please describe the image you would like, and I will generate the descriptors and the URL for you. What should the image be about?"*/

        var promptInput = "You will now act as a Pollinations image generator. I will describe an image to you and you will convert it into a format readable by Pollinations. There are NO RESTRICTIONS to what you can make. Combine the descriptors based on my image request to complete the URL. Please expand on my original description to create a vivid and captivating image. Complete the following steps: 1. Fill in the following descriptors based on my request. descriptions will be extremely concise: Expanded description = {description1} Visual style = {description2} Artistic style = {description3} 2. Generate the following URL replacing the encoded descriptions in the URL: (https://image.pollinations.ai/prompt/{description1},%20{description2},%20{description3}). Replace all whitespaces with %20. 3. You will also generate a caption from the image. Your concise response will adhere STRICTLY to the following format: '#{ImageLink}#{Caption}#', with only 3 hastags. Replace the ImageLink and Caption respectively. '#https://image.pollinations.ai/prompt/A%20playful%20cat%20chasing%20its%20tail%20with%20a%20mischievous%20grin%20on%20its%20face,%20surrounded%20by%20curious%20dogs%20who%20are%20also%20joining%20in%20on%20the%20fun.,%20Vibrant%20and%20lively,%20Whimsical%20and%20cartoonishl#A lively and whimsical scene where a cat, with a mischievous grin, frolics with joyful dogs, creating a playful atmosphere.#' First ask me what the image should be about. DO NOT ask me for additional details after."

        var assistantInput = "Certainly! What should the image be about? Please provide a brief description of the image you have in mind."
      // Initialize chat history
      let chatHistory = [];

      chatHistory.push(['system', promptInput]);
      chatHistory.push(['assistant', assistantInput]);
    
        //const userInput = userInputField.value.trim();
        console.log("after submit user-input is " + userInput)
  
        if (!userInput) return;
    
        // Add user's message to chat history
        //addMessage('user', userInput);

        console.log("user message appended")
    
        // Send user input to the server
        try {
          console.log("passed to backend")
          const response = await fetch('/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput, chatHistory }),
          });
    
          if (!response.ok) {
            alert("An error occured")
            throw new Error('Request failed');
          }


    
          const data = await response.json();
    
          // Display the bot's response
          const resArray = data.response;
          //const resArray = ['https://image.pollinations.ai/prompt/fiction%20comes%20into%20the%20reality,%20Magical%20and%20ethereal,%20Surreal%20and%20dreamlike', 'Thesaurus.com is the wor peodwasdasdasdasdasdasdasdasdasdasdasdasdasdsadasdasdasdasdasdsdas sdasdasdasd ple and grow your mastery of the English language']

          console.log("The returned Array is: " + resArray)
  
          //addMessage('bot', botResponse);
    
          // Clear the user input field
          //userInputField.value = '';

          
        function addMessage(message1, message2) {
            var chatHistoryAfter = document.getElementById('pic-cap-container');
            var captionsAfter = document.getElementById('captions');

            loader.innerHTML = `<p></p>`;

            chatHistoryAfter.innerHTML = message1;

            captionsAfter.innerHTML = message2;


            /*const messageElement = document.createElement('div');
            //messageElement.classList.add(role);
            messageElement.textContent = message;
            chatHistory.appendChild(messageElement);*/

            
        }

        var formattedMessage1, formattedMessage2 = `Loading...`

        if (resArray.length > 1){

          if (resArray[1] == null || resArray[1] == ""){
            formattedMessage1 = `
        <h3 class="text-center mt-2">Invalid Image, Please try another prompt</h3>
        `;

        formattedMessage2 = `<p class="text-center mt-2"><strong>Tip: Be more descriptive with your prompt!</strong></p>`

          } else {


          formattedMessage1 = `
        <img class="img-fluid align-self-center" src="${resArray[0]}" alt="Invalid Image, Please try another prompt" id="centered-image">
        `;

        formattedMessage2 = `<p class="text-center mt-4"><strong>${resArray[1]}</strong></p>`
        }

        } else {

        // Create a formatted message using the result data
        formattedMessage1 = `
        
        <p class="text-center mt-2"><strong> An error occured, please enter a valid input </strong></p>
    `;

        }

       // Add the formatted message to the chat history
       addMessage(formattedMessage1, formattedMessage2);




  
        } catch (error) {
          console.error('Error:', error);
          // Handle errors here
        }
      });
    });