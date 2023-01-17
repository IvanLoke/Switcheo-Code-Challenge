const temp = document.querySelector(".sendbutton");
temp.classList.remove("button--loading");
const temp2 = document.querySelector(".confirmbutton");
temp2.classList.remove("confirm--button--loading");

function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
function startLoading() {
  const btn = document.querySelector(".sendbutton");
  btn.classList.toggle("button--loading");
}

function makeShadow() {
  let x = document.getElementById("overlayForm");
  x.style.boxShadow = "0 0 0 100vmax rgba(0, 0, 0, .3)";
  document.getElementById("sendbutton").disabled = true;
}

function showOverlay() {
  let x = document.getElementById("overlayForm");
  x.style.visibility = "visible";
}

function loadValues() {
  document.getElementById("to-who").innerHTML =
    "(" + document.getElementById("input-address").value + ")";
  document.getElementById("from-who").innerHTML =
    "Switcheo(0xb5d4f343412dc8efb6ff599d790074d0f1e8d430)";
  document.getElementById("how-much").innerHTML =
    document.getElementById("input-amount").value + " Ethers";
}

function checkValidity() {
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
  if (document.getElementById("input-otp").value.length < 6) {
    document.getElementById("invalid-otp").style.visibility = "visible ";
    error = true;
  }
  if (error) {
    return 0;
  }
}

function sendMouseClick() {
  startLoading();
  if (checkValidity() == 0) {
    document.getElementById("sendbutton").disabled = false;
    const btn = document.querySelector(".sendbutton");
    btn.classList.remove("button--loading");
    return;
  }
  makeShadow();
  setTimeout(showOverlay, 3000);
  loadValues();
}

function closeOverlay() {
  let x = document.getElementById("overlayForm");
  x.style.visibility = "hidden";
  x.style.boxShadow = "none";
  document.getElementById("sendbutton").disabled = false;
  const btn = document.querySelector(".sendbutton");
  btn.classList.remove("button--loading");
}

function openConfirmationPage() {
  let x = document.getElementById("confirmation-page");
  x.style.visibility = "visible";
}

function startLoading2() {
  const btn = document.querySelector(".confirmbutton");
  btn.classList.toggle("confirm--button--loading");
}

function confirmMouseClick() {
  startLoading2();
  setTimeout(closeOverlay, 2000);
  setTimeout(openConfirmationPage, 2000);
}

function closeConfirmationPage() {
  let x = document.getElementById("confirmation-page");
  x.style.visibility = "hidden";
}

function closeMouseClick() {
  const temp2 = document.querySelector(".confirmbutton");
  temp2.classList.remove("confirm--button--loading");
  setTimeout(closeConfirmationPage, 40);
  document.getElementById("input-address").value = "";
  document.getElementById("input-amount").value = "";
  document.getElementById("input-otp").value = "";
}
