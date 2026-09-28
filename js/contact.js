/* ==========================================================================
   contact.js — validates the message form, then hands it to the mail client
   Everything is client-side: no server, no third-party form service.
   ========================================================================== */

window.Contact = (function () {
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var form, status;
  var fields = ["name", "email", "subject", "message"];

  function input(name) {
    return document.getElementById("cf-" + name);
  }

  function errorNode(name) {
    return document.getElementById("cf-" + name + "-error");
  }

  function setError(name, hasError) {
    var field = input(name);
    var error = errorNode(name);
    if (!field || !error) return;

    field.setAttribute("aria-invalid", hasError ? "true" : "false");

    if (hasError) {
      field.setAttribute("aria-describedby", "cf-" + name + "-error");
    } else {
      field.removeAttribute("aria-describedby");
    }

    error.hidden = !hasError;
  }

  function validateField(name) {
    var field = input(name);
    if (!field) return true;

    var value = field.value.trim();
    var valid = name === "email" ? EMAIL_RE.test(value) : value.length > 0;

    setError(name, !valid);
    return valid;
  }

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("contact-form__status--error", Boolean(isError));
  }

  function buildMailto() {
    var to = (window.PORTFOLIO && window.PORTFOLIO.contact && window.PORTFOLIO.contact.email) || "";
    var name = input("name").value.trim();
    var email = input("email").value.trim();
    var subject = input("subject").value.trim();
    var message = input("message").value.trim();

    var body =
      message +
      "\n\n—\nFrom: " + name +
      "\nReply to: " + email;

    return (
      "mailto:" + encodeURIComponent(to) +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body)
    );
  }

  function onSubmit(e) {
    e.preventDefault();

    // Validate every field so the visitor sees all problems at once
    var firstInvalid = null;
    fields.forEach(function (name) {
      if (!validateField(name) && !firstInvalid) firstInvalid = name;
    });

    if (firstInvalid) {
      setStatus("Please check the highlighted fields.", true);
      var node = input(firstInvalid);
      if (node) node.focus();
      return;
    }

    var to = (window.PORTFOLIO && window.PORTFOLIO.contact && window.PORTFOLIO.contact.email) || "";
    setStatus("Opening your mail app…");
    window.location.href = buildMailto();

    // If no mail client picked it up, give the visitor something to fall back on
    window.setTimeout(function () {
      setStatus("If nothing opened, email me directly at " + to + ".");
    }, 2200);
  }

  function init() {
    form = document.getElementById("contact-form");
    status = document.getElementById("contact-status");
    if (!form) return;

    form.addEventListener("submit", onSubmit);

    // Clear an error as soon as the field becomes valid again
    fields.forEach(function (name) {
      var node = input(name);
      if (!node) return;

      node.addEventListener("blur", function () {
        if (node.value.trim()) validateField(name);
      });

      node.addEventListener("input", function () {
        if (node.getAttribute("aria-invalid") === "true") validateField(name);
      });
    });
  }

  return { init: init };
})();
