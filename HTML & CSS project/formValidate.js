function load()
{
	hideErrors();

	// The submit event should trigger the submit() function
	document.getElementById("contactform").addEventListener("submit", validate);

	document.getElementById("contactform").reset();

	// The reset button should trigger the resetForm() function
	document.getElementById("contactform").addEventListener("reset", resetForm);

}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for ( let i = 0; i < error.length; i++ )
	{
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

 // * Displays the error for an invalid form field.
 // *
 // * param formField A reference to the form field that caused a validation error.
 // * param errorId   The id of the error element to display.
 // * param errorFlag True (an error has already occured), False (no errors have occured thus far)
 
function showError(formField, errorId, errorFlag)
{
	// Set the display style of the error element to diplay
	document.getElementById(errorId).style.display = "block";
	
	// Determine if this is the first error
	// If so, set focus to the text field
	if ( !errorFlag )
	{
		// Set focus to the text field that caused the error
		formField.focus();
		
		if ( formField.type == "text" )
		{
			// Select the text in the text field
			formField.select();
		}		
	}
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement)
{
	// Check if the text field has a value
	if ( fieldElement.value == null || trim(fieldElement.value) == "" )
	{
		// Invalid entry
		return false;
	}
	
	// Valid entry
	return true;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
	var errorFlag = false;

	// Validate the contact information
	var contactInfoFields = ["fullname", "phone", "email"];
	var input = document.getElementsByTagName("input").value;
	for(var i=0; i<contactInfoFields.length; i++)
	{
		var textField = document.getElementById(contactInfoFields[i]);
		if(!formFieldHasInput(textField))
		{
			// Display the appropriate error message
			document.getElementById(contactInfoFields[i] + "_error").style.display = "block";

			if(!errorFlag)
			{
				textField.focus();
				textField.select();
			}

			// Rasie the error flag
			errorFlag = true;
		}
	}

	//validate Card Number digit
	var regexPhone = new RegExp(/^\d{10}$/);
	var phoneFieldValue = document.getElementById("phone").value;

	//Determine if the value passes the regex
	if(!regexPhone.test(phoneFieldValue))
	{
		var textField = document.getElementById("phone");
		document.getElementById("phoneformat_error").style.display = "block";

		if(!errorFlag)
		{
			textField.focus();
			textField.select();
		}

		//Raise the error flag
		errorFlag = true;
	}

	// Create a regular expression for email address
	var regexEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

	var emailFieldValue = document.getElementById("email").value;

	if(!regexEmail.test(emailFieldValue))
	{
		document.getElementById("emailformat_error").style.display = "block";
		if(!errorFlag)
		{
			textField.focus();
			textField.select();
		}

		errorFlag = true;
	}

	return errorFlag;
}





/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if(formHasErrors())
	{
		// Prevents the form from submitting
		e.preventDefault();
		// Returning false prevents the form from submitting
		return false;
	}

	return true;
}

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm()
{
	// Ensure all error fields are hidden
	hideErrors();
	
	document.getElementsByTagName("input").value = "";
	document.getElementById("fullname").focus();
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}
