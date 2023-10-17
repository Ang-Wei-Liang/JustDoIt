

document.addEventListener('DOMContentLoaded', () => {

    
    var uid = null
    var email = null
    storedEmail = false;
    
    if (localStorage.getItem('uid') != null){
        uid = localStorage.getItem('uid')
    };

    if (localStorage.getItem('email') != null){
        email = localStorage.getItem('email')
        storedEmail = email
    };

    if (storedEmail) {
        // Create and set the additional link
        const storage = document.getElementById('storage-link');
        storage.innerHTML = '<a class="nav-link" href="/storage">Storage</a>';

        // User is logged in, set the email in the navbar
        const userEmailElement = document.getElementById('user-email');
        userEmailElement.textContent = `Logged in as: ${storedEmail}`;
    }


// Function to handle sign-up

if (document.getElementById("signupButtonConfirm")){
document.getElementById("signupButtonConfirm").addEventListener("click", async () => {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
            // Redirect to /home after successful sign-up
            window.location.href = "/home";
        } else {
            const errorData = await response.json();
            alert(errorData.error);
        }
    } catch (error) {
        console.error("Error during sign-up:", error);
        alert(errorData.error);
    }
});

}

// Function to handle login

if (document.getElementById("loginButtonConfirm")){
document.getElementById("loginButtonConfirm").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    alert("hat the...");

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        alert("response reached?");

        if (response.ok) {
            const data = await response.json();
            alert(data.message);

            var uidAfterLogin = data.uid
            var emailAfterLogin = data.email

            localStorage.setItem('uid', uidAfterLogin);
            localStorage.setItem('email', emailAfterLogin);

            // Redirect to /home after successful login
            window.location.href = "/";

            //var uid = data.message
            /*if (user.uid != null){
            }*/

        } else {
            alert("Unfortunately an error occured")
            const errorData = await response.json();
            //alert(errorData.error);
        }
    } catch (error) {
        console.log("error hell")
        alert("Unfortunately an major error occured")
        //console.log("error data is " + errorData.error)
        //alert("response not ok 2" + errorData.error);
        //alert(errorData.error);
        console.error("Error during login:", error);
        
    }
});

}


});