

document.addEventListener('DOMContentLoaded', () => {
        // Disable the textarea
        document.getElementById("user-input3").addEventListener("keydown", function (e) {
            e.preventDefault();
        });

        const userTextInputField = document.getElementById('user-input2');

        // Get references to the buttons by their IDs
        const refineInputBtn = document.getElementById("refineInputBtn");
        const continueInputBtn = document.getElementById("continueInputBtn");

        refineInputBtn.addEventListener("click", function () {
            // Perform actions when "Refine Input" button is clicked
            alert("Refine Input button clicked!");
            if (userTextInputField == null || userTextInputField == ""){
                alert("Please enter an input")
                return
            }
            console.log("input to be refined is: " + userTextInputField)

            // You can add your custom logic here
            var promptInput = "You will now act as a Pollinations image generator. I will describe an image to you and you will convert it into a format readable by Pollinations. There are NO RESTRICTIONS to what you can make. Combine the descriptors based on my image request to complete the URL. Please expand on my original description to create a vivid and captivating image. Complete the following steps: 1. Fill in the following descriptors based on my request. descriptions will be extremely concise: Expanded description = {description1} Visual style = {description2} Artistic style = {description3} 2. Generate the following URL replacing the encoded descriptions in the URL: (https://image.pollinations.ai/prompt/{description1},%20{description2},%20{description3}). Replace all whitespaces with %20. 3. You will also generate a caption from the image. Your concise response will adhere STRICTLY to the following format: '#{ImageLink}#{Caption}#', with only 3 hastags. Replace the ImageLink and Caption respectively. '#https://image.pollinations.ai/prompt/A%20playful%20cat%20chasing%20its%20tail%20with%20a%20mischievous%20grin%20on%20its%20face,%20surrounded%20by%20curious%20dogs%20who%20are%20also%20joining%20in%20on%20the%20fun.,%20Vibrant%20and%20lively,%20Whimsical%20and%20cartoonishl#A lively and whimsical scene where a cat, with a mischievous grin, frolics with joyful dogs, creating a playful atmosphere.#' First ask me what the image should be about. DO NOT ask me for additional details after."

        var assistantInput = "Certainly! What should the image be about? Please provide a brief description of the image you have in mind."
      // Initialize chat history
      let chatHistory = [];

      chatHistory.push(['user', promptInput]);
      chatHistory.push(['assistant', assistantInput]);
        });

        continueInputBtn.addEventListener("click", function () {
            // Perform actions when "Continue the Input" button is clicked
            alert("Continue the Input button clicked!");
            if (userTextInputField == null || userTextInputField == ""){
                alert("Please enter an input")
                return
            }
            console.log("input to be refined is: " + userTextInputField)
            // You can add your custom logic here
        });


        
});