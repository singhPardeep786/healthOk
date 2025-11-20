function formValidation(){
    const form = document.querySelector('#contactForm');
    const fullName = document.querySelector('#fullName');
    const phoneNumber = document.querySelector('#phoneNumber');   
    const career = document.querySelector('#helpWith');
    const message = document.querySelector('#message');
    
    // Get error message elements for each field
    const errorMessages = document.querySelectorAll('.error_message');
    const fullNameError = errorMessages[0];
    const phoneError = errorMessages[1];
    const careerError = errorMessages[2];
    // const messageError = errorMessages[3];

    const responseMsg = document.querySelector(".responseMsg");

    // To keep track of timeout IDs for each error element
    const errorTimeouts = new Map();

    // Helper to show error and hide it after 3 seconds (for submit)
    function showTempError(errorElem, msg) {
        errorElem.style.display = "initial";
        errorElem.textContent = msg;

        if (errorTimeouts.has(errorElem)) {
            clearTimeout(errorTimeouts.get(errorElem));
        }
        const timeoutId = setTimeout(() => {
            errorElem.style.display = "none";
            errorElem.textContent = "";
            errorTimeouts.delete(errorElem);
        }, 3000);
        errorTimeouts.set(errorElem, timeoutId);
    }

    // Real-time validation for Name: only allow alphabets and spaces
    fullName.addEventListener('input', function () {
        const value = fullName.value;
        // Show error immediately if there is a number or special character
        if (/[^A-Za-z\s]/.test(value)) {
            // Remove any submit-timeout for this field, always show immediately
            if (errorTimeouts.has(fullNameError)) {
                clearTimeout(errorTimeouts.get(fullNameError));
                errorTimeouts.delete(fullNameError);
            }
            fullNameError.style.display = "initial";
            fullNameError.textContent = "Name should contain only alphabets";
        } else {
            // If the error was previously visible for this, hide it instantly
            if (fullNameError.textContent === "Name should contain only alphabets") {
                fullNameError.style.display = "none";
                fullNameError.textContent = "";
            }
        }
    });

    // Set maxLength for phone input directly
    phoneNumber.setAttribute('maxlength', '15');

    // Real-time validation for Phone Number: only digits, between 10 and 15
    phoneNumber.addEventListener('input', function () {
        // Remove all non-digit characters
        let val = phoneNumber.value.replace(/\D/g, '');
        // Cut to 15 chars if exceeded
        if (val.length > 15) {
            val = val.slice(0, 15);
        }
        // Set value (this will also prevent entering more digits)
        if (phoneNumber.value !== val) {
            phoneNumber.value = val;
        }
        // Show errors for short/long numbers
        if (val.length === 0) {
            phoneError.style.display = "none";
            phoneError.textContent = "";
        } else if (val.length > 15) {
            // This case should not happen anymore, but keep for safety
            phoneError.style.display = "initial";
            phoneError.textContent = "Phone number cannot exceed 15 digits";
        } else {
            phoneError.style.display = "none";
            phoneError.textContent = "";
        }
    });

    // Additionally, prevent more than 15 digits using pasting
    phoneNumber.addEventListener('paste', function (e) {
        e.preventDefault();
        let paste = (e.clipboardData || window.clipboardData).getData('text');
        paste = paste.replace(/\D/g, '').slice(0, 15);
        phoneNumber.value = paste;
        // Trigger input event to show error if any
        phoneNumber.dispatchEvent(new Event('input'));
    });

    form.addEventListener('submit', (e)=>{
      e.preventDefault();

      let isValid = true;

      // Reset all error messages immediately
      errorMessages.forEach((errorElem) => {
        errorElem.style.display = "none";
        errorElem.textContent = "";
        // Clear any pending timeout for this error message
        if (errorTimeouts.has(errorElem)) {
            clearTimeout(errorTimeouts.get(errorElem));
            errorTimeouts.delete(errorElem);
        }
      });
      responseMsg.style.display = "none";
  
      // fullName validation
      const nameValue = fullName.value.trim();
      if(nameValue.length < 2){
        showTempError(fullNameError, "Please enter your full name");
        isValid = false;
      } else if (/[^A-Za-z\s]/.test(nameValue)) {
        // If submit pressed and invalid, show error and block form
        showTempError(fullNameError, "Name should contain only alphabets");
        isValid = false;
      }
  
      // phoneNumber validation: must be 10-15 digits
      const phoneVal = phoneNumber.value.trim();
      if (phoneVal === "") {
        showTempError(phoneError, "Please enter your phone number");
        isValid = false;
      } else if (!/^\d{10,15}$/.test(phoneVal)) {
        if (!/^\d+$/.test(phoneVal)) {
          showTempError(phoneError, "Phone number should contain only digits");
        } else if (phoneVal.length < 10) {
          showTempError(phoneError, "Phone number must be at least 10 digits");
        } else if (phoneVal.length > 15) {
          showTempError(phoneError, "Phone number cannot exceed 15 digits");
        } else {
          showTempError(phoneError, "Please enter a valid phone number");
        }
        isValid = false;
      }

      // career validation
      if(career.value.trim().length < 2){
        showTempError(careerError, "Please enter your query");
        isValid = false;
      }
      
      // message validation
      // if(message.value.trim().length < 10){
      //   showTempError(messageError, "Please enter at least 10 characters");
      //   isValid = false;
      // }
  
      // Only reset form if validation passes
      if(isValid){
        form.reset();
        responseMsg.style.display = "initial";
        responseMsg.style.right = 0;
        responseMsg.style.opacity = 1;
        setTimeout(()=>{
          responseMsg.style.right = "-100%";
          responseMsg.style.opacity = 0;
        }, 3000)
      }
    });
}

formValidation();
