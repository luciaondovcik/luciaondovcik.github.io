function initCountdown() {
  const weddingDate = new Date("June 28, 2025 15:00:00").getTime();
  
  const interval = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance < 0) {
      document.getElementById("countdown").innerHTML = "<div class='countdown-item'><span class='countdown-number'>Svadba začína!</span></div>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const daysText = getPluralForm(days, 'deň', 'dni', 'dní');
    const hoursText = getPluralForm(hours, 'hodina', 'hodiny', 'hodín');
    const minutesText = getPluralForm(minutes, 'minúta', 'minúty', 'minút');
    const secondsText = getPluralForm(seconds, 'sekunda', 'sekundy', 'sekúnd');
    
    // document.getElementById("countdown").innerHTML = `${days} ${daysText} ${hours} ${hoursText} ${minutes} ${minutesText} ${seconds} ${secondsText}`;
    document.getElementById("countdown").innerHTML = `
      <div class="countdown-item">
        <span class="countdown-number">${days}</span>
        <span class="countdown-label">${getPluralForm(days, 'deň', 'dni', 'dní')}</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number">${hours}</span>
        <span class="countdown-label">${getPluralForm(hours, 'hodina', 'hodiny', 'hodín')}</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number">${minutes}</span>
        <span class="countdown-label">${getPluralForm(minutes, 'minúta', 'minúty', 'minút')}</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number">${seconds}</span>
        <span class="countdown-label">${getPluralForm(seconds, 'sekunda', 'sekundy', 'sekúnd')}</span>
      </div>
    `;
  }, 1000);
}

function getPluralForm(count, singular, dual, plural) {
  if (count === 1) {
    return singular;
  } else if (count > 1 && count < 5) {
    return dual;
  } else {
    return plural;
  }
}

function initMap() {
  var locations = [
    { lat: 48.6264, lng: 18.5753, title: 'Chata Hrádok' },
    { lat: 48.68536185531329, lng: 18.374914860447795, title: 'Kostol sv. Barnabáša' },
    { lat: 48.63477934097161, lng: 18.346335879012155, title: 'Hacienda Skaličanovci' }
  ];
  
  var map = L.map('map-container', {
    center: [48.6264, 18.5753],
    zoom: 13,
    zoomSnap: 0.25,       // Allow quarter-step zoom levels (e.g. 13.25, 13.5, 13.75)
    zoomDelta: 0.25, 
    zoomControl: true,   // Enable zoom buttons
    scrollWheelZoom: false,  // Disable zoom with mouse scroll
    doubleClickZoom: false,  // Disable zoom on double-click
    touchZoom: true,        // Disable zoom with pinch gestures (touch)
    dragging: true           // Keep dragging enabled
  });
  
  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  // Create a LatLngBounds object to fit all markers
  var bounds = L.latLngBounds();

  locations.forEach(function(location) {
    // Create a marker for each location
    var marker = L.marker([location.lat, location.lng]).addTo(map);
    marker.bindTooltip(location.title, { 
      permanent: true, 
      direction: 'top',
      offset: [-15, -15]
    }).openTooltip();

    // Extend the bounds to include each marker
    bounds.extend(marker.getLatLng());
  });

  var smallScreen = window.innerWidth <= 768;
  var middleScreen = window.innerWidth <= 980;
  
  map.fitBounds(bounds, {
    padding: [smallScreen ? 50 : 100, middleScreen ? 50 : 100]
  });
}

function initFloatingButtonVisibility(selector = '#rsvp', buttonSelector = '#rsvpBtn') {
  const section = document.querySelector(selector);
  const btn = document.querySelector(buttonSelector);

  if (!section || !btn) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          btn.classList.add('hidden');
        } else {
          btn.classList.remove('hidden');
        }
      });
    },
    {
      rootMargin: '0px 0px -200px 0px', // top, right, bottom, left
      threshold: 0,
    }
  );

  observer.observe(section);
}

window.onload = function() {
  initMap();
  initCountdown();
  initFloatingButtonVisibility();
};
