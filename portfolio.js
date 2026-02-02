document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAV ================= */

  const nav = document.querySelector(".signature-nav");
  if (nav) {
    const toggle = nav.querySelector(".nav-toggle");
    const links = nav.querySelectorAll(".nav-links a");

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        document.body.classList.toggle("scrolled", window.scrollY > 40);
        ticking = false;
      });
    }, { passive:true });

    toggle?.addEventListener("click", e => {
      e.stopPropagation();
      nav.classList.toggle("open");
      document.body.style.overflow = nav.classList.contains("open") ? "hidden" : "";
    });

    links.forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.style.overflow = "";
    }));

    document.addEventListener("click", e => {
      if (!nav.contains(e.target)) {
        nav.classList.remove("open");
        document.body.style.overflow = "";
      }
    });

    window.addEventListener("resize", () => {
      if (innerWidth > 860) {
        nav.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  /* ================= REACTOR ================= */

  const hero = document.querySelector(".hero");
  const core = document.querySelector(".reactor-core");
  const labels = document.querySelectorAll(".ui-overlay .labels span");

  if (hero && core && labels.length) {
    const mouse = { x:0, y:0 };
    let t = 0;

    window.addEventListener("mousemove", e => {
      mouse.x = e.clientX / innerWidth - 0.5;
      mouse.y = e.clientY / innerHeight - 0.5;
    }, { passive:true });

    const loop = () => {
      t += 0.01;
      const energy = Math.hypot(mouse.x, mouse.y);

      hero.style.setProperty("--px", mouse.x);
      hero.style.setProperty("--py", mouse.y);
      hero.dataset.state = energy > 0.3 ? "focused" : "idle";

      core.style.transform =
        `translate(-50%,-50%) scale(${1 + energy * 0.4}) rotate(${t * 20}deg)`;

      labels[0].textContent = `SYS-${(t * 10 | 0) % 99}`;
      labels[1].textContent = `FIELD ${(Math.sin(t) + 1) * 50 | 0}%`;
      labels[2].textContent = `ENERGY ${(energy * 100) | 0}%`;
      labels[3].textContent = `STABLE`;

      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ================= THREE BACKGROUND ================= */

  const canvas = document.getElementById("universe");
  if (canvas && window.THREE) {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02010a, 0.015);

    const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const geo = new THREE.BufferGeometry();
    const count = 40000;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3]     = (Math.random() - 0.5) * 200;
      pos[i3 + 1] = (Math.random() - 0.5) * 200;
      pos[i3 + 2] = (Math.random() - 0.5) * 200;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const swarm = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        color: 0x9b77ff,
        size: 0.15,
        transparent:true,
        opacity:0.6,
        depthWrite:false
      })
    );
    scene.add(swarm);

    const animate = () => {
      swarm.rotation.y += 0.0005;
      swarm.rotation.x += 0.0003;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", () => {
      renderer.setSize(innerWidth, innerHeight);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    });
  }


  /* ================= SKILLS BOOT ================= */

const skillsSection = document.querySelector("#skills");

if (skillsSection) {
  const horizontal = skillsSection.querySelectorAll(".signature-bars li");
  const vertical   = skillsSection.querySelectorAll(".signature-columns li");
  const rings      = skillsSection.querySelectorAll(".signature-ring");

  const clamp = (v, min = 0, max = 100) => Math.min(max, Math.max(min, v));

  const bootObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        /* ---------- HORIZONTAL BARS (LEFT → RIGHT) ---------- */
        horizontal.forEach((el, i) => {
          const raw = parseInt(el.dataset.value, 10) || 0;
          const v = clamp(raw);

          el.style.setProperty("--vx", v);   // % value
          setTimeout(() => {
            el.classList.add("loaded");
          }, i * 120);
        });

        /* ---------- VERTICAL COLUMNS ---------- */
        vertical.forEach((el, i) => {
          const raw = parseInt(el.dataset.value, 10) || 0;
          const v = clamp(raw);

          el.style.setProperty("--vh", `${v}%`);
          setTimeout(() => {
            el.classList.add("loaded");
          }, i * 120);
        });

        /* ---------- RINGS ---------- */
        rings.forEach((el, i) => {
          const raw = parseInt(el.dataset.value, 10) || 0;
          const v = clamp(raw);

          el.style.setProperty("--p", v);
          setTimeout(() => {
            el.classList.add("loaded");
          }, i * 120);
        });

        /* ---------- RUN ONCE ---------- */
        bootObserver.disconnect();
      });
    },
    {
      threshold: 0.4,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  bootObserver.observe(skillsSection);
}



  /* ================= PROJECTS ================= */

const projectDescriptions = {
  /* ================= TASK MANAGEMENT WEB APP ================= */
project14: `
Task Management System is a static React.js dashboard UI focused on structured
productivity and workflow clarity.

Tools & technologies:
• Frontend: React JS
• Features: Visual task states, priorities, deadlines (UI only)

How it helps:
The interface demonstrates clear task organization using status flows
(To Do, In Progress, Done) and a clean dashboard layout for productivity design.
`,


  /* ================= SAAS E-COMMERCE WEB APP ================= */
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

  /* ================= MINDFLOW OS ================= */
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
};


  const body = document.body;
  const descModal = document.getElementById("desc-modal");
  const descContent = document.getElementById("desc-content");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const videoLightbox = document.getElementById("videoLightbox");
  const lightboxVideo = document.getElementById("lightboxVideo");

  let currentFolder="", totalImages=0, currentIndex=1, currentExt="png";

  const lockScroll=()=>body.style.overflow="hidden";
  const unlockScroll=()=>body.style.overflow="";

  window.openDesc=id=>{
    descContent.innerHTML = (projectDescriptions[id]||"").replace(/\n/g,"<br>");
    descModal.classList.add("active");
    lockScroll();
  };
  window.closeDesc=()=>{descModal.classList.remove("active");unlockScroll();};

  window.openLightbox=(folder,num,ext)=>{
    currentFolder=folder; totalImages=num; currentIndex=1; currentExt=ext;
    lightboxImg.src=`images/${folder}/${currentIndex}.${ext}`;
    lightbox.classList.add("active");
    lockScroll();
  };
  window.closeLightbox=()=>{lightbox.classList.remove("active");unlockScroll();};
  window.nextImage=()=>{currentIndex=currentIndex>=totalImages?1:currentIndex+1;lightboxImg.src=`images/${currentFolder}/${currentIndex}.${currentExt}`;};
  window.prevImage=()=>{currentIndex=currentIndex<=1?totalImages:currentIndex-1;lightboxImg.src=`images/${currentFolder}/${currentIndex}.${currentExt}`;};

  window.openVideoFromCard=(e,src)=>{
    e.preventDefault();
    lightboxVideo.src=src;
    videoLightbox.classList.add("active");
    lockScroll();
  };
  window.closeVideoLightbox=()=>{
    lightboxVideo.pause();
    lightboxVideo.src="";
    videoLightbox.classList.remove("active");
    unlockScroll();
  };

  document.querySelectorAll(".photos-btn").forEach(b=>b.onclick=()=>openLightbox(b.dataset.folder,b.dataset.count,b.dataset.ext));
  document.querySelectorAll(".desc-btn").forEach(b=>b.onclick=()=>openDesc(b.dataset.project));

  /* ================= SYSTEM CORE ================= */

  const hudState = document.querySelector("[data-hud='state']");
  const hudFPS   = document.querySelector("[data-hud='fps']");
  const hudLoad  = document.querySelector("[data-hud='load']");

  let last = performance.now();
  let frames = 0;

  const updateSystem = now => {
    frames++;
    if (now - last >= 1000) {
      const fps = frames;
      frames = 0;
      last = now;
      hudFPS.textContent = `FPS ${fps}`;
      hudLoad.textContent = `LOAD ${Math.min(100, Math.round((1 - fps / 60) * 100))}%`;
    }
    requestAnimationFrame(updateSystem);
  };
  requestAnimationFrame(updateSystem);

  let systemState = "IDLE";
  const setState = s => {
    if (systemState === s) return;
    systemState = s;
    hudState.textContent = s;
  };

  window.addEventListener("scroll", () => setState(scrollY > 200 ? "ACTIVE" : "IDLE"), {passive:true});
  window.addEventListener("mousemove", () => setState("FOCUSED"), {passive:true});
  document.addEventListener("mouseleave", () => setState("IDLE"));

});
