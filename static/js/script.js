document.addEventListener("DOMContentLoaded", () => {
  const typewriter = document.querySelector(".typewriter")
  const text = typewriter.dataset.text
  let index = 0

  function type() {
    if (index < text.length) {
      typewriter.textContent = text.slice(0, index + 1)
      index++
      setTimeout(type, 100)
    }
  }

  setTimeout(type, 1000)

  const progressBar = document.querySelector(".progress-bar")

  function updateProgressBar() {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.offsetHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    progressBar.style.width = scrollPercent + "%"
  }

  window.addEventListener("scroll", updateProgressBar)

  const blob = document.querySelector(".blob")

  function updateBlobPosition(e) {
    requestAnimationFrame(() => {
      const x = e.clientX
      const y = e.clientY
      blob.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`
    })
  }

  function disableBlobOnMobile() {
    if ("ontouchstart" in window || navigator.maxTouchPoints) {
      blob.style.display = "none"
      document.removeEventListener("mousemove", updateBlobPosition)
    } else {
      document.addEventListener("mousemove", updateBlobPosition)
    }
  }

  disableBlobOnMobile()

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running"
      }
    })
  }, observerOptions)

  document.querySelectorAll(".fade-in, .slide-in").forEach((el) => {
    el.style.animationPlayState = "paused"
    observer.observe(el)
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  const skillTags = document.querySelectorAll(".skill-tag")
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`
  })

  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`
  })
})
