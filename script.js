// ─── Config ───────────────────────────────────────────────────────────────────
const WEBHOOK_URL = "https://hook.eu1.make.com/p7sgb3owq4exwufn63hjavh0r4ujuatj";
const DISCOVERY_WEBHOOK_URL = "https://hook.eu1.make.com/rmfykk8olkq5trl2emqsrms9i3d2etwd";

// ─── Opt-in Form (Page 1) ─────────────────────────────────────────────────────
const leadForm = document.getElementById("lead-form");
if (leadForm) {
  leadForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors(leadForm);

    const name  = leadForm.querySelector('[name="name"]').value.trim();
    const phone = leadForm.querySelector('[name="phone"]').value.trim();

    if (!name)  { showError(leadForm, "name",  "נא להזין שם"); return; }
    if (!phone) { showError(leadForm, "phone", "נא להזין מספר טלפון"); return; }

    setLoading(leadForm, true);

    postToWebhook({ type: "lead", name, phone, source: "landing_page" }).catch(() => {});
    window.location.href = "tutorial.html?name=" + encodeURIComponent(name);
  });
}

// ─── Discovery Form (Page 2) ──────────────────────────────────────────────────
const discoveryForm = document.getElementById("discovery-form");
if (discoveryForm) {
  discoveryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors(discoveryForm);

    const val = (n) => { const el = discoveryForm.querySelector(`[name="${n}"]`); return el ? el.value.trim() : ""; };
    const name            = val("name");
    const email           = val("email");
    const phone           = val("phone");
    const business_domain = val("business_domain");
    const clients_to_add  = val("clients_to_add");
    const pricing         = val("pricing");
    const main_challenge  = val("main_challenge");

    if (!name)  { showError(discoveryForm, "name",  "נא להזין שם"); return; }
    if (!email) { showError(discoveryForm, "email", "נא להזין כתובת אימייל"); return; }
    if (!isValidEmail(email)) { showError(discoveryForm, "email", "כתובת האימייל אינה תקינה"); return; }
    if (!phone) { showError(discoveryForm, "phone", "נא להזין מספר וואטסאפ"); return; }

    setLoading(discoveryForm, true);

    fetch(DISCOVERY_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "discovery_call", name, email, phone,
        business_domain, clients_to_add, pricing, main_challenge,
        source: "tutorial_page"
      })
    }).catch(() => {});
    discoveryForm.style.display = "none";
    document.getElementById("discovery-success").style.display = "block";
  });
}

// ─── Personalize tutorial page greeting ──────────────────────────────────────
const greetEl = document.getElementById("greeting-name");
if (greetEl) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  if (name) greetEl.textContent = ", " + name;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function postToWebhook(payload) {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Webhook error");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setLoading(form, loading) {
  const btn = form.querySelector("button[type='submit']");
  btn.disabled = loading;
  btn.textContent = loading ? "שולח..." : btn.dataset.label;
}

function showError(form, fieldName, msg) {
  const input = form.querySelector(`[name="${fieldName}"]`);
  if (!input) return;
  const errEl = input.parentElement.querySelector(".form-error");
  if (errEl) { errEl.textContent = msg; errEl.classList.add("visible"); }
}

function showGlobalError(form, msg) {
  let globalErr = form.querySelector(".form-global-error");
  if (!globalErr) {
    globalErr = document.createElement("p");
    globalErr.className = "form-error form-global-error visible";
    form.appendChild(globalErr);
  }
  globalErr.textContent = msg;
  globalErr.classList.add("visible");
}

function clearErrors(form) {
  form.querySelectorAll(".form-error").forEach(el => {
    el.textContent = "";
    el.classList.remove("visible");
  });
}

// Store button labels before first load
document.querySelectorAll("button[type='submit']").forEach(btn => {
  btn.dataset.label = btn.textContent;
});
