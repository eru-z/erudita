/* ==========================================================
   PROJECT FILTERS (ALL / WEB / MOBILE)
========================================================== */

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".video-item");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    // Button state
    filterButtons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });

    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");

    // Filtering
    projects.forEach(project => {
      const category = project.dataset.category;

      if (filter === "all" || category === filter) {
        project.style.display = "";
      } else {
        project.style.display = "none";
      }
    });
  });
});


/* ==========================================================
   DATA
========================================================== */

const projectDescriptions = {

  /* =========================
     🥇 RANK 1 — SaaS Platform
     ========================= */
  project13: `
SaaS E-commerce Platform is a full-stack web application designed for
real-world business operations and scalability.

Tools & technologies:
• Frontend: React JS
• Backend: PHP (REST API)
• Database: MySQL
• Architecture: Role-based access, admin dashboard

How it helps:
The platform enables businesses to manage products, users, and orders
through a structured admin system. It demonstrates full-stack ownership,
secure authentication, and production-ready workflows.
`,

  /* =========================
     🥈 RANK 2 — CyberSafeX
     ========================= */
  project1: `
CyberSafeX is a full-stack cybersecurity web platform focused on improving
awareness of digital threats and security best practices.

Tools & technologies:
• Frontend: HTML, CSS, JavaScript
• Backend: PHP
• Database: MySQL
• Styling: Custom CSS

How it helps:
CyberSafeX helps users understand cybersecurity risks through structured data,
clear visuals, and educational content. It makes complex security concepts
accessible to non-technical users.
`,

  project12: `
Nutrition App is a mobile application designed to help users track meals,
nutritional intake, and healthy habits.

Tools & technologies:
• Frontend: React Native
• Logic: JavaScript
• Features: Meal tracking, nutrition insights

How it helps:
The app supports healthier lifestyle choices by giving users clear insight
into daily nutrition and balanced eating patterns.
`,

  project5: `
Legal Chatbot for School Directors is an AI-assisted web system designed to
provide fast access to education-related laws and regulations.

Tools & technologies:
• Frontend: HTML, CSS, JavaScript
• Backend: PHP
• Database: MySQL
• Logic: Rule-based legal responses

How it helps:
The chatbot helps school directors quickly understand legal obligations,
administrative procedures, and compliance requirements without searching
through complex legal documents.
`,
  /* =========================
     🥉 RANK 3 — GreenBridge
     ========================= */
  project2: `
GreenBridge is a sustainability analytics web platform connecting user behavior
with environmental impact metrics.

Tools & technologies:
• Frontend: HTML, CSS, JavaScript
• Backend: PHP
• Database: MySQL
• Styling: Tailwind CSS

How it helps:
GreenBridge allows users to visualize how daily actions affect the environment.
It encourages responsible behavior through clear, data-driven insights.
`,

  /* =========================
     RANK 4 — MindFlow OS
     ========================= */
  project11: `
MindFlow OS is a mobile productivity application designed to help users organize
tasks and improve focus.

Tools & technologies:
• Frontend: React Native
• Backend: Node.js
• Database: PostgreSQL
• Logic: JavaScript

How it helps:
MindFlow reduces mental overload by structuring tasks into clear workflows.
It supports consistent productivity habits and intentional daily execution.
`,

  /* =========================
     RANK 5 — Task Management
     ========================= */
  project14: `
Task Management System is a web application focused on structured productivity
and workflow clarity.

Tools & technologies:
• Frontend: React JS
• Features: Auth, task states, priorities, deadlines

How it helps:
The system helps users manage tasks efficiently using clear status flows
(To Do, In Progress, Done) and a clean dashboard for daily execution.
`,

  /* =========================
     RANK 6 — E-Commerce Shop
     ========================= */
  project9: `
E-Commerce Shop (ShopX) is an online shopping platform designed to support
product discovery and purchasing workflows.

Tools & technologies:
• Frontend: HTML, CSS, JavaScript

How it helps:
The platform enables businesses to sell products online efficiently through
structured browsing, cart flows, and conversion-focused UX patterns.
`,

  /* =========================
     RANK 8 — Expense Tracker
     ========================= */
  project15: `
Expense Tracker is a mobile application for tracking personal spending and
managing monthly budgets.

Tools & technologies:
• Frontend: React Native
• Backend: Node.js
• Database: PostgreSQL

How it helps:
The app helps users understand financial habits, analyze expenses, and
maintain better control over personal finances.
`,

  /* =========================
     RANK 9 — Bank Website
     ========================= */
  project4: `
Bank Website is a corporate financial platform designed to prioritize trust,
clarity, and accessibility.

Tools & technologies:
• Frontend: HTML, CSS, JavaScript
• Backend: PHP
• Database: MySQL
• Styling: Bootstrap

How it helps:
The platform guides users through banking services with clear structure
and reliable information-heavy layouts.
`,

  /* =========================
     RANK 10 — FitPrime
     ========================= */
  project8: `
FitPrime is a modern fitness club website showcasing programs, trainers,
memberships, and schedules.

Tools & technologies:
• Frontend: HTML, CSS, JavaScript
• Styling: Bootstrap

How it helps:
FitPrime helps gyms present services clearly, attract new members, and
maintain consistent communication with clients.
`,

  /* =========================
     RANK 11 — Coffee Website
     ========================= */
  project7: `
Coffee Website is a brand-focused site highlighting atmosphere, storytelling,
and menu presentation.

Tools & technologies:
• Frontend: HTML, CSS, JavaScript
• Styling: Tailwind CSS

How it helps:
The site strengthens brand identity and helps small businesses engage
customers through narrative-driven design.
`,

  /* =========================
     RANK 12 — Netflix Clone
     ========================= */
  project3: `
Netflix Clone is a responsive streaming interface recreating the core browsing
experience of modern media platforms.

Tools & technologies:
• Frontend: HTML, CSS, JavaScript
• Styling: Bootstrap
• Backend: PHP

How it helps:
This project demonstrates layout systems, responsive performance, and
media-oriented UI architecture.
`,

  /* =========================
     RANK 13 — Chanel Clone
     ========================= */
  project6: `
Chanel Clone is a luxury website UI focused on premium branding, typography,
and visual storytelling.

Tools & technologies:
• Frontend: HTML, CSS
• Styling: Tailwind CSS

How it helps:
The project demonstrates how high-end brands maintain refined digital
identity through spacing, imagery, and layout precision.
`
};



/* ==========================================================
   DOM STATE
========================================================== */

const body = document.body;

/* ---------- Description Modal ---------- */
const descModal = document.getElementById("descModal");
const descTitle = document.getElementById("descTitle");
const descText  = document.getElementById("descText");
const descClose = descModal?.querySelector(".close");

/* ---------- IMAGE LIGHTBOX ---------- */
const lightbox       = document.getElementById("lightbox");
const lightboxFrame  = lightbox?.querySelector(".lightbox-frame");
const lightboxImg    = document.getElementById("lightbox-img");
const btnClose       = document.querySelector(".lightbox-close");
const btnNext        = document.querySelector(".lightbox-next");
const btnPrev        = document.querySelector(".lightbox-prev");

/* ---------- VIDEO LIGHTBOX ---------- */
const videoLightbox  = document.getElementById("videoLightbox");
const lightboxVideo  = document.getElementById("lightboxVideo");
const videoCloseBtn  = videoLightbox?.querySelector(".lightbox-close");

/* ---------- Gallery State ---------- */
let currentFolder = "";
let totalImages   = 0;
let currentIndex  = 1;
let currentExt    = "png";

/* ==========================================================
   HELPERS
========================================================== */

const lockScroll   = () => (body.style.overflow = "hidden");
const unlockScroll = () => (body.style.overflow = "");

/* ==========================================================
   DESCRIPTION MODAL
========================================================== */

window.openDesc = id => {
  descTitle.style.display = "none"; // 👈 hide title completely

  descText.innerHTML =
    (projectDescriptions[id] || "Details coming soon.")
      .replace(/\n+/g, "<br>");

  descModal.classList.add("active");
  lockScroll();
};


const closeDesc = () => {
  descModal.classList.remove("active");
  unlockScroll();
};

descClose?.addEventListener("click", closeDesc);
descModal?.addEventListener("click", closeDesc);
descModal?.querySelector(".desc-box")
  ?.addEventListener("click", e => e.stopPropagation());

/* ==========================================================
   IMAGE LIGHTBOX
========================================================== */

window.openLightbox = (folder, count, ext) => {
  currentFolder = folder;
  totalImages   = count;
  currentIndex  = 1;
  currentExt    = ext;

  lightboxImg.src = `images/${folder}/${currentIndex}.${ext}`;
  lightbox.classList.add("active");
  lockScroll();
};

const closeLightbox = () => {
  lightbox.classList.remove("active");
  lightboxImg.src = "";
  unlockScroll();
};

const nextImage = () => {
  currentIndex = currentIndex >= totalImages ? 1 : currentIndex + 1;
  lightboxImg.src = `images/${currentFolder}/${currentIndex}.${currentExt}`;
};

const prevImage = () => {
  currentIndex = currentIndex <= 1 ? totalImages : currentIndex - 1;
  lightboxImg.src = `images/${currentFolder}/${currentIndex}.${currentExt}`;
};

btnClose?.addEventListener("click", e => {
  e.stopPropagation();
  closeLightbox();
});

btnNext?.addEventListener("click", e => {
  e.stopPropagation();
  nextImage();
});

btnPrev?.addEventListener("click", e => {
  e.stopPropagation();
  prevImage();
});

lightbox?.addEventListener("click", closeLightbox);
lightboxFrame?.addEventListener("click", e => e.stopPropagation());

/* ==========================================================
   VIDEO LIGHTBOX
========================================================== */

const openVideoLightbox = src => {
  if (!videoLightbox || !lightboxVideo) return;

  lightboxVideo.src = src;
  videoLightbox.classList.add("active");
  lockScroll();

  lightboxVideo.muted = false;
  lightboxVideo.playsInline = true;
  lightboxVideo.setAttribute("playsinline", "");

  setTimeout(() => {
    lightboxVideo.play().catch(() => {
      lightboxVideo.controls = true;
    });
  }, 100);
};

const closeVideoLightbox = () => {
  lightboxVideo.pause();
  lightboxVideo.currentTime = 0;
  lightboxVideo.src = "";
  videoLightbox.classList.remove("active");
  unlockScroll();
};


videoCloseBtn?.addEventListener("click", e => {
  e.stopPropagation();
  closeVideoLightbox();
});

videoLightbox?.addEventListener("click", e => {
  if (e.target === videoLightbox) closeVideoLightbox();
});

/* ==========================================================
   KEYBOARD SUPPORT
========================================================== */

document.addEventListener("keydown", e => {

  if (lightbox?.classList.contains("active")) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  }

if (videoLightbox?.classList.contains("active") && e.key === "Escape") {
  closeVideoLightbox();
}


  if (descModal?.classList.contains("active") && e.key === "Escape") {
    closeDesc();
  }
});

/* ==========================================================
   GLOBAL CLICK HANDLER (FAST & CLEAN)
========================================================== */

document.addEventListener("click", e => {

  /* ---------- VIDEO PLAY ---------- */
/* ---------- VIDEO PLAY ---------- */
const playTarget =
  e.target.closest(".play-btn") ||
  e.target.closest(".video-wrap img");

if (playTarget) {
  const videoWrap = playTarget.closest(".video-wrap");
  if (!videoWrap || !videoWrap.dataset.video) return;

  e.preventDefault();
  e.stopPropagation();

  openVideoLightbox(videoWrap.dataset.video);
  return;
}



  /* ---------- GALLERY ---------- */
  const photoBtn = e.target.closest(".photos-btn");
  if (photoBtn) {
    e.preventDefault();

    photoBtn.style.transform = "scale(.96)";
    requestAnimationFrame(() => {
      photoBtn.style.transform = "";
      openLightbox(
        photoBtn.dataset.folder,
        Number(photoBtn.dataset.count),
        photoBtn.dataset.ext
      );
    });
    return;
  }

  /* ---------- DETAILS ---------- */
  const descBtn = e.target.closest(".desc-btn");
  if (descBtn) {
    e.preventDefault();

    descBtn.style.transform = "scale(.96)";
    requestAnimationFrame(() => {
      descBtn.style.transform = "";
      openDesc(descBtn.dataset.project);
    });
  }
});
