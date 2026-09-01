const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');

menuBtn.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    const selected = btn.dataset.filter;

    projectCards.forEach(function (card) {
      if (selected === 'all' || card.dataset.category === selected) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
const themeBtn = document.getElementById('theme-btn');

// on page load, check if user chose dark mode before
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

themeBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('nav ul a');

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');

      navLinkEls.forEach(function (link) {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active-link');
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(function (section) {
  observer.observe(section);
});
const cardObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

projectCards.forEach(function (card) {
  cardObserver.observe(card);
});
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // stops the page from reloading/submitting anywhere
  let isValid = true;

  // Name check
  if (nameInput.value.trim() === '') {
    document.getElementById('name-error').textContent = 'Please enter your name.';
    nameInput.classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('name-error').textContent = '';
    nameInput.classList.remove('invalid');
  }

  // Email check — simple pattern: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    document.getElementById('email-error').textContent = 'Please enter a valid email.';
    emailInput.classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('email-error').textContent = '';
    emailInput.classList.remove('invalid');
  }

  // Message check
  if (messageInput.value.trim() === '') {
    document.getElementById('message-error').textContent = 'Please write a message.';
    messageInput.classList.add('invalid');
    isValid = false;
  } else {
    document.getElementById('message-error').textContent = '';
    messageInput.classList.remove('invalid');
  }

  if (isValid) {
    document.getElementById('form-success').textContent = 'Thanks — I\'ll get back to you soon!';
    form.reset();
  }
});