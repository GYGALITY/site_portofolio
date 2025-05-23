document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#competence .filter");
  const bigBubble = container.querySelector(".big-bubble");
  const bubbles = Array.from(container.querySelectorAll(".bubble"));

  const radius = 250;
  let angleOffset = 0;
  let animationId = null;
  let returnTimeoutId = null; // Pour stocker le timeout

  const getCenter = () => {
    const bigRect = bigBubble.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const centerX = bigRect.left - containerRect.left + bigBubble.offsetWidth / 2;
    const centerY = bigRect.top - containerRect.top + bigBubble.offsetHeight / 2;
    return { centerX, centerY };
  };

  // Animation circulaire fluide
  const updateCircularPositions = () => {
    const { centerX, centerY } = getCenter();

    bubbles.forEach((bubble, i) => {
      const angle = angleOffset + (i / bubbles.length) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle) - bubble.offsetWidth / 2;
      const y = centerY + radius * Math.sin(angle) - bubble.offsetHeight / 2;

      bubble.style.transition = "none";
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
    });

    angleOffset += 0.005;
    animationId = requestAnimationFrame(updateCircularPositions);
  };

  // Démarrage initial
  updateCircularPositions();

  container.addEventListener("mouseenter", () => {
    // Stopper animation en cours
    bigBubble.classList.add("disappear");
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    // Annuler timeout de retour s’il existe
    if (returnTimeoutId) {
      clearTimeout(returnTimeoutId);
      returnTimeoutId = null;
    }

    const containerWidth = container.offsetWidth;
    const centerY = container.offsetHeight / 2;
    const spacing = 120;

    bubbles.forEach((bubble, i) => {
      bubble.style.transition = "all 0.5s ease";
      bubble.style.top = `${centerY - bubble.offsetHeight / 2}px`;
      bubble.style.left = `${(containerWidth - (bubbles.length - 1) * spacing) / 2 + i * spacing}px`;
      bubble.style.borderRadius = "20px";
      bubble.style.transitionDelay = `${i * 0.04}s`;
    });
  });

  container.addEventListener("mouseleave", () => {
    bigBubble.classList.remove("disappear");
    bubbles.forEach((bubble) => {
      bubble.style.transition = "all 0.8s ease";
      bubble.style.borderRadius = "50%";
    });

    const { centerX, centerY } = getCenter();

    bubbles.forEach((bubble, i) => {
      const angle = angleOffset + (i / bubbles.length) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle) - bubble.offsetWidth / 2;
      const y = centerY + radius * Math.sin(angle) - bubble.offsetHeight / 2;

      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
    });

    // Nettoyer un éventuel timeout en cours
    if (returnTimeoutId) clearTimeout(returnTimeoutId);

    returnTimeoutId = setTimeout(() => {
      bubbles.forEach(bubble => bubble.style.transition = "none");
      // Relancer animation circulaire
      if (!animationId) animationId = requestAnimationFrame(updateCircularPositions);
      returnTimeoutId = null;
    }, 800);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#competence .filter");
  const mainContainer = document.querySelector("#competence");
  const bubbles = Array.from(container.querySelectorAll(".bubble"));
  const imageElements = [];

  // Crée des images pour chaque bulle en-dehors du filtre
  bubbles.forEach((bubble, i) => {
    const img = document.createElement("img");
    img.src = bubble.dataset.image; // Assure-toi que chaque .bubble a data-image="..."
    img.classList.add("bubble-image");
    mainContainer.appendChild(img);
    imageElements.push(img);
  });

  // Synchroniser les positions des images avec les bulles
  const syncImagePositions = () => {
    bubbles.forEach((bubble, i) => {
      const bubbleRect = bubble.getBoundingClientRect();
      const containerRect = mainContainer.getBoundingClientRect();

      imageElements[i].style.left = `${bubbleRect.left - containerRect.left + bubble.offsetWidth / 2 - 35}px`;
      imageElements[i].style.top = `${bubbleRect.top - containerRect.top + bubble.offsetHeight / 2 - 35}px`;
    });

    requestAnimationFrame(syncImagePositions);
  };

  syncImagePositions();
});
