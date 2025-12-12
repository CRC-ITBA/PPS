/* ===========================================================
   Funciones de despliegue "ver más / ver menos"
   =========================================================== */

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("toggle-details")) {
    const container = e.target.closest(".option-item");
    const details = container.querySelector(".option-details");

    if (!details) return;

    const isOpen = details.classList.contains("open");

    details.classList.toggle("open");
    e.target.textContent = isOpen ? "ver más" : "ver menos";
  }
});


/* ===========================================================
   Configuración de mínimos requeridos por sección
   =========================================================== */

const minBySection = {
  1: 4,
  2: 2,
  3: 2,
  4: 2,
  5: 3,
  6: 2,
  7: 4,
  8: 3 // ✅ mínimo correcto
};


/* ===========================================================
   Función para evaluar cada sección
   =========================================================== */

function evaluateSection(id) {
  const checkboxes = document.querySelectorAll(`input[data-section="${id}"]`);
  let checkedCount = 0;
  let missingRequired = [];

  checkboxes.forEach(cb => {
    if (cb.checked) checkedCount++;

    if (cb.dataset.required === "true" && !cb.checked) {
      missingRequired.push(cb.dataset.label);
    }
  });

  const minRequired = minBySection[id];
  const resultEl = document.getElementById(`result-${id}`);
  let isOk = true;
  let msg = "";

  if (checkedCount < minRequired) {
    isOk = false;
    msg += `<div>Faltan ${minRequired - checkedCount} ítems para alcanzar el mínimo requerido (${minRequired}).</div>`;
  }

  if (missingRequired.length > 0) {
    isOk = false;
    msg += `<div>Faltan los siguientes ítems obligatorios:</div><ul>`;
    missingRequired.forEach(item => {
      msg += `<li>${item}</li>`;
    });
    msg += `</ul>`;
  }

  if (isOk) {
    resultEl.className = "section-result ok";
    resultEl.textContent = "Este apartado cumple con los requisitos mínimos.";
  } else {
    resultEl.className = "section-result error";
    resultEl.innerHTML = msg;
  }

  return isOk;
}


/* ===========================================================
   Evaluación global al presionar el botón
   =========================================================== */

document.getElementById("evaluateBtn").addEventListener("click", () => {
  let allOk = true;

  for (let id = 1; id <= 8; id++) {
    const ok = evaluateSection(id);
    if (!ok) allOk = false;
  }

  const global = document.getElementById("globalResult");
  global.style.display = "block";

  if (allOk) {
    global.className = "global-result global-ok";
    global.textContent =
      "✔ Tu informe cumple con los principales apartados que todo informe técnico debe contener. Asegúrate que su abordaje refleje el nivel de profesionalismo de un próximo graduado antes de enviarlo.";
  } else {
    global.className = "global-result global-error";
    global.textContent =
      "✖ Tu informe no cumple con uno o más requisitos mínimos. Por ello te recomendamos, repasar la información en el campus (especialmente las recomendaciones y criterios de evaluación) antes de enviar tu informe.";
  }

  global.scrollIntoView({ behavior: "smooth", block: "center" });
});

