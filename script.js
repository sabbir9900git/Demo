// Certificate lightbox + CV viewer
document.addEventListener('DOMContentLoaded', function () {
  var lightbox = document.getElementById('certLightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxTitle = document.getElementById('lightboxTitle');
  var cvViewer = document.getElementById('cvViewer');
  var cvFrame = document.getElementById('cvFrame');
  var lastFocused = null;

  function openModal(modal) {
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modal === cvViewer) {
      cvFrame.src = ''; // stop the PDF from continuing to load/play in the background
    }
    if (lastFocused) lastFocused.focus();
  }

  // Open certificate lightbox — triggered by a thumbnail image or a "View Certificate" button
  document.querySelectorAll('[data-full]').forEach(function (el) {
    el.addEventListener('click', function () {
      var full = el.getAttribute('data-full');
      var title = el.getAttribute('data-title') || '';
      lightboxImg.src = full;
      lightboxImg.alt = title;
      lightboxTitle.textContent = title;
      openModal(lightbox);
    });
  });

  // Open CV viewer — triggered by any "View CV" button
  document.querySelectorAll('.view-cv').forEach(function (btn) {
    btn.addEventListener('click', function () {
      cvFrame.src = 'cv/CV.pdf';
      openModal(cvViewer);
    });
  });

  // Close buttons / backdrop clicks
  document.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', function () {
      var modal = el.closest('.lightbox');
      if (modal) closeModal(modal);
    });
  });

  // Escape key closes whichever modal is open
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (lightbox.classList.contains('is-open')) closeModal(lightbox);
    if (cvViewer.classList.contains('is-open')) closeModal(cvViewer);
  });
});
