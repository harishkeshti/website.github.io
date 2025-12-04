// HERO TEXT ENTER ANIMATION
gsap.from(".hero-title", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".hero-sub", {
  y: 50,
  opacity: 0,
  delay: 0.3,
  duration: 1.2,
  ease: "power3.out"
});

gsap.from(".btn", {
  scale: 0.7,
  opacity: 0,
  delay: 0.5,
  duration: 1.2
});

// FLOATING ORBS
gsap.to(".orb1", {
  y: 60,
  x: 40,
  duration: 5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

gsap.to(".orb2", {
  y: -50,
  x: -40,
  duration: 6,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// PROJECT CARDS SCROLL
gsap.utils.toArray(".project-card").forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 85%"
    },
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
  });
});