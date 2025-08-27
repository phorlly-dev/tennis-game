function setupModal(buttonId, modalId) {
    const btn = document.getElementById(buttonId);
    const modal = document.getElementById(modalId);
    const span = modal.querySelector(".close");

    btn.onclick = () => (modal.style.display = "block");
    span.onclick = () => (modal.style.display = "none");
    window.onclick = (event) => {
        if (event.target === modal) modal.style.display = "none";
    };
}

setupModal("btn-guide-desktop", "modal-desktop");
setupModal("btn-guide-mobile", "modal-mobile");