mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 14 // starting zoom
});

const el = document.createElement('div');
el.className = 'custom-fa-marker';
el.innerHTML = `
  <div class="marker-icon">
    <span class="fa-stack fa-1x">
      <i class="fas fa-house fa-stack-1x"></i>
      <i class="fas fa-check fa-stack-1x fa-inverse" style="font-size: 0.5em; transform: translate(10px, 10px);"></i>
    </span>
  </div>
`;

const marker = new mapboxgl.Marker({ element: el })
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
        .setHTML(`<h5>${listing.title}</h5><p>Exact Location will be provided after booking</p>`)
        .setMaxWidth("300px"))
        .addTo(map);
