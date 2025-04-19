let mediaAnimation = gsap.matchMedia();
ScrollTrigger.defaults({
  markers: false
});

const colors = ["#2E4D71", "#856546", "#05625C", "#5A483E", "#886648"];

mediaAnimation.add("(min-width: 0px)", () => {
  // Desktop animations
  const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)");
  const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)");

  gsap.set(photos, { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 });

  const allPhotos = gsap.utils.toArray(".desktopPhoto");

  details.forEach((section, i) => {
      let bgColor = colors[i + 1];
      ScrollTrigger.create({
          trigger: section,
          start: "200 bottom",
          end: "+=100%",
          
          onToggle: self => {
              if (self.isActive) {
                  gsap.to(".custom-gallery", { backgroundColor: bgColor });
              } else if ((i === 0 && self.direction < 0) || (i === details.length - 1 && self.direction > 0)) {
                  gsap.to(".custom-gallery", { backgroundColor: "#2E4D71" });
              }
          }
      });
  });

  details.forEach((detail, index) => {
      let headline = detail.querySelector(".reveal");
      let animation = gsap.timeline()
          .to(photos[index], { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, duration: 1.5 })
          .set(allPhotos[index], { autoAlpha: 1, duration: 1.5 });

      ScrollTrigger.create({
          trigger: headline,
          start: "top 120%",
          end: "top 60%",
          animation: animation,
          scrub: true,
          markers: false
      });
  });
});

mediaAnimation.add("(max-width: 665px)", () => {
  // Mobile animations
  const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)");

  details.forEach((section, i) => {
      let bgColor = colors[i + 1];
      ScrollTrigger.create({
          trigger: section,
          start: "200 bottom",
          end: "+=100%",
          
          onToggle: self => {
              if (self.isActive) {
                  gsap.to(".custom-gallery", { backgroundColor: bgColor });
              } else if ((i === 0 && self.direction < 0) || (i === details.length - 1 && self.direction > 0)) {
                  gsap.to(".custom-gallery", { backgroundColor: "#2E4D71" });
              }
          }
      });
  });
});

const lazyloadRunObserver = () => {
    const lazyloadBackgrounds = document.querySelectorAll( `.e-con.e-parent:not(.e-lazyloaded)` );
    const lazyloadBackgroundObserver = new IntersectionObserver( ( entries ) => {
        entries.forEach( ( entry ) => {
            if ( entry.isIntersecting ) {
                let lazyloadBackground = entry.target;
                if( lazyloadBackground ) {
                    lazyloadBackground.classList.add( 'e-lazyloaded' );
                }
                lazyloadBackgroundObserver.unobserve( entry.target );
            }
        });
    }, { rootMargin: '200px 0px 200px 0px' } );
    lazyloadBackgrounds.forEach( ( lazyloadBackground ) => {
        lazyloadBackgroundObserver.observe( lazyloadBackground );
    } );
};
const events = [
    'DOMContentLoaded',
    'elementor/lazyload/observe',
];
events.forEach( ( event ) => {
    document.addEventListener( event, lazyloadRunObserver );
} );


function animateValue(id, start, end, duration, suffix = '') {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);

        let displayValue;
        if (end >= 1000) {
            displayValue = (value / 1000).toFixed(1) + 'k';
            if (displayValue.endsWith('.0k')) {
                displayValue = displayValue.replace('.0k', 'k');
            }
        } else {
            displayValue = value;
        }

        obj.innerHTML = displayValue + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

window.onload = function () {
    setTimeout(() => {
        // Delay the animations by 2 seconds (2000ms) after page load
        setTimeout(() => {
            animateValue('students', 0, 29300, 1800);
            animateValue('classes', 0, 32400, 1800);
            animateValue('satisfaction', 0, 100, 1500, '%');
            animateValue('instructors', 0, 354, 2000, '+');
        }, 10000); // Adjust this delay as needed
    }, 300);
};
