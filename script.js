document.addEventListener('DOMContentLoaded', function () {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const sections = document.querySelectorAll('.section');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = darkModeToggle.querySelector('i');
  const body = document.body;

  // Reload page when clicking profile image or name
  document.querySelectorAll('.profile-home-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.reload();
    });
  });

  // Smooth scroll for sidebar links
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const sectionId = link.getAttribute('href').replace('#', '');
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 20,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scrollspy functionality
  function onScroll() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let found = false;
    sections.forEach(section => {
      const offset = section.offsetTop - 40;
      const height = section.offsetHeight;
      if (scrollPos >= offset && scrollPos < offset + height && !found) {
        sidebarLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector('.sidebar-link[href="#' + section.id + '"]');
        if (activeLink) activeLink.classList.add('active');
        found = true;
      }
    });
    // If at the bottom, highlight last section
    if ((window.innerHeight + scrollPos) >= document.body.offsetHeight) {
      sidebarLinks.forEach(link => link.classList.remove('active'));
      sidebarLinks[sidebarLinks.length - 1].classList.add('active');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Dark mode logic
  function setDarkMode(enabled) {
    if (enabled) {
      body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
      darkModeToggle.title = 'Switch to light mode';
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
      darkModeIcon.classList.remove('fa-sun');
      darkModeIcon.classList.add('fa-moon');
      darkModeToggle.title = 'Switch to dark mode';
    }
  }
  const darkModePref = localStorage.getItem('darkMode');
  setDarkMode(darkModePref === 'true');
  darkModeToggle.addEventListener('click', function () {
    setDarkMode(!body.classList.contains('dark-mode'));
  });
});