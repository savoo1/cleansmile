AOS.init();

$(".our-service .btn-box .btn-pr").click(function (e) {
  e.preventDefault();
  if ($(this).parent().parent().parent().hasClass("openedbox")) {
    $(this).parent().parent().parent().removeClass("openedbox");
    $("html, body").animate(
      {
        scrollTop: $(".our-service .boxes.hidden-boxes").offset().top - 150, // Adjust scroll position for nav height
      },
      1000
    );
    $(this).text("View more");
  } else {
    $(this).parent().parent().parent().addClass("openedbox");
    $("html, body").animate(
      {
        scrollTop: $(".our-service .boxes.hidden-boxes").offset().top - 150, // Adjust scroll position for nav height
      },
      1000
    );
    $(this).text("View less");
  }
});

$(".navbar .lines").click(function (e) {
  e.preventDefault();
  if ($(this).parent().parent().parent().parent().hasClass("active")) {
    $(this).parent().parent().parent().parent().removeClass("active");
  } else {
    $(this).parent().parent().parent().parent().addClass("active");
  }
});

$(".faq-card .question").click(function (e) {
  e.preventDefault();
  if ($(this).parent().hasClass("question_opened")) {
    $(this).parent().removeClass("question_opened");
    $(this).next().css("max-height", "0px");
  } else {
    $(".question_opened").find(".answer").css("max-height", "0px");
    $(".question_opened").removeClass("question_opened");
    $(this).parent().addClass("question_opened");
    var heightinside = $(this).next().find(".in").height() + 50;
    $(this)
      .next()
      .css("max-height", heightinside + "px");
  }
});

$(document).ready(function () {
  const container = $(".bubbles");

  function createBubble() {
    const bubble = $("<img src='img/bable.webp' class='bubble' />");

    const size = Math.floor(Math.random() * (200 - 70 + 1)) + 70;
    const left = Math.random() * 150;
    const duration = Math.random() * 7 + 12; // 7 to 12 seconds
    const delay = Math.random() * 2;

    bubble.css({
      width: `${size}px`,
      left: `${left}%`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      zIndex: Math.floor(Math.random() * 5),
    });

    container.append(bubble);

    // Remove after animation ends
    setTimeout(() => {
      bubble.remove();
    }, (duration + delay) * 1000);
  }

  // Show bubbles right away
  for (let i = 0; i < 20; i++) {
    createBubble();
  }

  // Continue generating
  setInterval(() => {
    for (let i = 0; i < 3; i++) {
      createBubble();
    }
  }, 500);
});

$(document).ready(function () {
  $(".language-switcher").each(function () {
    let $dropdown = $(this).find(".language-dropdown");
    let $chosen = $(this).find(".choosen");

    // Function to update the language icon based on the current language
    function updateLanguageIcon(lang) {
      // Get the selected language (can also be from localStorage or a default fallback)
      let $selectedItem = $dropdown.find(`li[data-lang="${lang}"]`);
      if ($selectedItem.length) {
        let flag = $selectedItem.find("img").attr("src");
        let text = $selectedItem.text().trim();

        // Update chosen language display
        $chosen.html(
          `<img src="${flag}" class="flag-icon"> ${text} <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99995 11.1301C8.67995 11.1301 8.34993 11.007 8.10993 10.7611L0.369941 3.0215C-0.120059 2.5291 -0.120059 1.7309 0.369941 1.2387C0.859941 0.746604 1.65997 0.746604 2.14997 1.2387L8.99995 8.08721L15.8499 1.23901C16.3399 0.746805 17.14 0.746805 17.63 1.23901C18.12 1.73111 18.12 2.5294 17.63 3.0217L9.88996 10.7614C9.63996 11.0072 9.31995 11.1301 8.99995 11.1301Z"/></svg>`
        );
      }
    }

    // Run on load to set the initial icon
    let initialLang = localStorage.getItem("language") || "en"; // Default to English
    updateLanguageIcon(initialLang);

    // Toggle dropdown
    $chosen.on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      $dropdown.toggle();
    });

    // Hide dropdown when clicking outside
    $(document).on("click", function (event) {
      if (
        !$chosen.is(event.target) &&
        !$dropdown.is(event.target) &&
        $dropdown.has(event.target).length === 0
      ) {
        $dropdown.hide();
      }
    });

    // Change Language - Using event delegation for list items
    $dropdown.on("click", "li", function () {
      let lang = $(this).data("lang");

      // Check if selected language is English
      if (lang === "en") {
        // Reset language settings (ensure Google Translate is disabled or reset)
        localStorage.setItem("language", "en"); // Save English as the selected language
        updateLanguageIcon("en"); // Update the language icon to English

        // Disable Google Translate translation for English (force it to reset)
        let googleTranslateCombo = document.querySelector(".goog-te-combo");
        if (googleTranslateCombo) {
          googleTranslateCombo.value = "en";
          googleTranslateCombo.dispatchEvent(new Event("change"));

          // If Google Translate is applied, reset the page to English by reloading
          if (
            typeof google &&
            google.translate &&
            google.translate.TranslateElement
          ) {
            let translateElement = google.translate.TranslateElement;
            if (translateElement) {
              google.translate.TranslateElement(
                { pageLanguage: "en", includedLanguages: "en" },
                "google_translate_element"
              );
            }
          }
        }

        // Optionally, reload the page to reset Google Translate if needed
        // location.reload(); // Uncomment if you want to reload the page and reset Google Translate

        return; // Prevent the rest of the translation flow
      }

      // For other languages, update the icon and trigger Google Translate
      updateLanguageIcon(lang);

      // Save the selected language in localStorage
      localStorage.setItem("language", lang);

      // Force Google Translate to change language (for non-English languages)
      let googleTranslateCombo = document.querySelector(".goog-te-combo");
      if (googleTranslateCombo) {
        googleTranslateCombo.value = lang;
        googleTranslateCombo.dispatchEvent(new Event("change"));
      }

      $dropdown.hide(); // Hide dropdown after selection
    });
  });
});

$(document).ready(function () {
  // Function to detect the section in view and activate the corresponding navbar link
  function checkActiveSection() {
    var scrollPos = $(document).scrollTop();
    var sectionInView = false; // Flag to check if any section is in view

    // Loop through each navbar link
    $(".scroll").each(function () {
      var sectionID = $(this).attr("href"); // Get the href (section ID)

      // Skip links that don't have valid href (like #)
      if (sectionID === "#") return;

      // Get the section by using the 'href' attribute (this links to a specific section)
      var section = $(sectionID);

      // Check if the section is in view (considering the section's offset and height)
      if (
        section.offset().top - 160 <= scrollPos && // Adjust for offset
        section.offset().top + section.height() - 160 > scrollPos
      ) {
        sectionInView = true; // Set flag to true if section is in view
        $(".scroll").removeClass("active"); // Remove active from all links
        $(this).addClass("active"); // Add active to the current link
        $(".navbar").removeClass("active");
      }
    });

    // If no section is in view, remove active from all navbar links
    if (!sectionInView) {
      $(".scroll").removeClass("active");
    }
  }

  // Detect when the page is scrolled and check for the active section
  $(window).on("scroll", function () {
    checkActiveSection();
  });

  // Smooth scrolling when clicking on navbar links
  $(".scroll").click(function (e) {
    e.preventDefault();
    var targetSection = $(this).attr("href"); // Get the section linked by the anchor
    if (targetSection !== "#") {
      // Ensure we don't try to scroll to "#" if it's not a valid section
      $("html, body").animate(
        {
          scrollTop: $(targetSection).offset().top - 150, // Adjust scroll position for nav height
        },
        1000
      );
    }
  });

  // Initial check on page load
  checkActiveSection();
});

$(".scroll2").click(function (e) {
  e.preventDefault();
  $("nav").removeClass("nav_active");
  var nameof = "." + $(this).attr("name");
  $(".navbar").removeClass("active");
  $("html, body").animate(
    {
      scrollTop: $(nameof).offset().top - 150,
    },
    1000
  );
});
