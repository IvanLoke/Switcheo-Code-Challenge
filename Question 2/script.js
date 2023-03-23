const temp = document.querySelector(".sendbutton");
temp.classList.remove("button--loading");
const temp2 = document.querySelector(".confirmbutton");
temp2.classList.remove("confirm--button--loading");

function isNumeric(str) {
  //function for checking if string is a valid number
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

function startLoading() {
  // function to start loading animation
  const btn = document.querySelector(".sendbutton");
  btn.classList.toggle("button--loading");
}

function makeShadow() {
  // function to grey out background of orignal form when confirmation page shows up
  let x = document.getElementById("overlayForm");
  x.style.boxShadow = "0 0 0 100vmax rgba(0, 0, 0, .3)";
  document.getElementById("sendbutton").disabled = true;
}

function showOverlay() {
  // function to set visibility of confirmation form to visible
  let x = document.getElementById("overlayForm");
  x.style.visibility = "visible";
}

function loadValues() {
  // function to set values in confirmation form based on values inputted
  document.getElementById("to-who").innerHTML =
    "(" + document.getElementById("input-address").value + ")";
  document.getElementById("from-who").innerHTML =
    "Switcheo(0xb5d4f343412dc8efb6ff599d790074d0f1e8d430)";
  document.getElementById("how-much").innerHTML =
    document.getElementById("input-amount").value + " Ethers";
}

function checkValidity() {
  // function to check validity of inputs
  document.getElementById("invalid-address").style.visibility = "hidden";
  document.getElementById("invalid-amount").style.visibility = "hidden";
  document.getElementById("invalid-otp").style.visibility = "hidden";
  let error = false;
  if (
    document
      .getElementById("input-address")
      .value.match(/[|\\/~^:,;?!&%$@*+]/) ||
    document.getElementById("input-address").value.length == 0
  ) {
    document.getElementById("invalid-address").style.visibility = "visible";
    error = true;
  }
  if (
    document.getElementById("input-amount").value <= 0 ||
    !isNumeric(document.getElementById("input-amount").value)
  ) {
    document.getElementById("invalid-amount").style.visibility = "visible";
    error = true;
  }
  if (document.getElementById("input-otp").value.length != 6) {
    document.getElementById("invalid-otp").style.visibility = "visible ";
    error = true;
  }
  if (error) {
    return 0;
  } else {
    return 1;
  }
}

function sendMouseClick() {
  // function to chain multiple functions when pressing send tokens button
  startLoading();
  if (checkValidity() == 0) {
    document.getElementById("sendbutton").disabled = false; // allows user to reinput values
    const btn = document.querySelector(".sendbutton");
    btn.classList.remove("button--loading");
    return;
  }
  makeShadow();
  setTimeout(showOverlay, 3000); //if successful, show confirmation page after 3s
  loadValues();
}

function closeOverlay() {
  // function to close confirmation page after pressing confirm
  let x = document.getElementById("overlayForm");
  x.style.visibility = "hidden";
  x.style.boxShadow = "none";
  document.getElementById("sendbutton").disabled = false;
  const btn = document.querySelector(".sendbutton");
  btn.classList.remove("button--loading");
}

function openConfirmationPage() {
  //function to open transaction confirmed page
  let x = document.getElementById("confirmation-page");
  x.style.visibility = "visible";
}

function startLoading2() {
  //function to toggle loading indicator for confirmation page
  const btn = document.querySelector(".confirmbutton");
  btn.classList.toggle("confirm--button--loading");
}

function confirmMouseClick() {
  // function to chain multiple functions when pressing confirm on confirmation page
  startLoading2();
  setTimeout(closeOverlay, 2000); //close confirmation page after 2s
  setTimeout(openConfirmationPage, 2000); //open transaction confirmed page after 2s
}

function closeConfirmationPage() {
  // function to close confirmation page
  let x = document.getElementById("confirmation-page");
  x.style.visibility = "hidden";
}

function closeMouseClick() {
  //function to close transaction confirmed page
  const temp2 = document.querySelector(".confirmbutton");
  temp2.classList.remove("confirm--button--loading");
  setTimeout(closeConfirmationPage, 40);
  document.getElementById("input-address").value = ""; // resetting the values in input box
  document.getElementById("input-amount").value = "";
  document.getElementById("input-otp").value = "";
}
