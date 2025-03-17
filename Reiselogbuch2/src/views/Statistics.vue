<template>
  <div class="statistics-container">
    <h1>Reisestatistik</h1>

    <div v-if="totalEntries === 0" class="no-data">
      Keine Reisen vorhanden
    </div>
    
    <div v-else>
      <div class="statistics-list">
        <div class="stat-card">
          <h3>Anzahl der Reisen</h3>
          <div class="stat-value">{{ totalEntries }}</div>
        </div>
        
        <div class="stat-card" v-if="mostRecentPlace">
          <h3>Letzte Reise</h3>
          <div class="stat-value">{{ mostRecentPlace }}</div>
          <div class="stat-label">{{ formatDate(mostRecentDate) }}</div>
        </div>
        
        <div class="stat-card" v-if="topDestination">
          <h3>Häufigste Reise</h3>
          <div class="stat-value">{{ topDestination.place }}</div>
          <div class="stat-label">{{ topDestination.count }} mal besucht</div>
        </div>
      </div>
  </div>

      <div class="map-container">
        <h2>Meine Reiseziele auf der Karte</h2>
        <div id="map" ref="mapRef"></div>
      </div>
    </div>

</template>

<script setup>
import { computed, defineProps, onMounted, ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const props = defineProps({ entries: Array });
const mapRef = ref(null);
let map = null;
let markers = [];

// Gesamtzahl der Reisen
const totalEntries = computed(() => props.entries?.length || 0);

// Letzter  Ort
const mostRecentEntry = computed(() => {
  if (!props.entries || props.entries.length === 0) return null;
  
  return [...props.entries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )[0];
});

const mostRecentPlace = computed(() => mostRecentEntry.value?.place || null);
const mostRecentDate = computed(() => mostRecentEntry.value?.date || null);

// Häufigste Reise
const topDestination = computed(() => {
  if (!props.entries || props.entries.length === 0) return null;
  
  const placeCounts = {};
  
  props.entries.forEach(entry => {
    placeCounts[entry.place] = (placeCounts[entry.place] || 0) + 1;
  });
  
  return Object.entries(placeCounts)
    .map(([place, count]) => ({ place, count }))
    .sort((a, b) => b.count - a.count)[0];
});

// Datum formatieren
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
};

// einzigartige Orte für die Karte (für häufigste Reiseziel)
const uniqueLocations = computed(() => {
  if (!props.entries || props.entries.length === 0) return []; // keine Einträge
  
  const locations = {};
  
  props.entries.forEach(entry => {
    if (!locations[entry.place]) {  // neuer Ort
      locations[entry.place] = {
        place: entry.place,
        count: 1,
        lastVisit: entry.date
      };
    } else { // Ort gibt es schon (update)
      locations[entry.place].count++;
      if (new Date(entry.date) > new Date(locations[entry.place].lastVisit)) {
        locations[entry.place].lastVisit = entry.date;
      }
    }
  });
  
  return Object.values(locations);
});

// Von Namen zu Koordinaten
// Mit Api Namen holen
const geocodeLocation = async (placeName) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`);
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        displayName: data[0].display_name
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding-Fehler:', error);
    return null;
  }
};

// Karte initialisieren
const initMap = async () => {
  if (!mapRef.value || !props.entries || props.entries.length === 0) return;
  
  // Kurz warten (sonst Fehler)
  setTimeout(async () => {
    // Icon für die Marker definieren
    const customIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
    
    // Karte initialisieren und auf Europa zentrieren
    map = L.map(mapRef.value).setView([48.2, 16.4], 5);
    
    // Kartenlayer hinzufügen (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Für jeden einzigartigen Ort einen Marker hinzufügen
    for (const location of uniqueLocations.value) {
      const geoData = await geocodeLocation(location.place);
      
      if (geoData) {
        const marker = L.marker([geoData.lat, geoData.lng], { icon: customIcon }) // neuer Marker
          .addTo(map) // zur Karte hinzufügen
        
        markers.push(marker); // in Arrayhinzufühen
      }
    }
    
    // Karte auf alle Marker zentrieren, wenn vorhanden
    if (markers.length > 0) {
      const group = L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, 100);
};

// Nach dem Mounten der Komponente die Karte initialisieren (sonst Fehler)
onMounted(() => {
  initMap();
});
</script>

<style scoped>
.statistics-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

h1 {
  text-align: center;
  color: #1e5c97;
  margin-bottom: 2rem;
  border-bottom: 2px solid #b8d1e8;
  padding-bottom: 0.8rem;
}

h2 {
  color: #1e5c97;
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.no-data {
  text-align: center;
  padding: 2rem;
  background-color: #f0f8ff;
  border-radius: 8px;
  border: 2px solid #3980c0;
  color: #1e5c97;
  margin: 2rem 0;
}

.statistics-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.stat-card {
  background-color: #f0f8ff;
  border: 2px solid #3980c0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
  margin-top: 0;
  color: #1e5c97;
  border-bottom: 1px solid #b8d1e8;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1e5c97;
  margin-bottom: 0.5rem;
  text-align: center;
}

.stat-label {
  color: #3980c0;
  text-align: center;
  font-size: 1.1rem;
}

.map-container {
  margin-top: 2rem;
  background-color: #f0f8ff;
  border: 2px solid #3980c0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#map {
  height: 400px;
  width: 100%;
  border-radius: 4px;
  z-index: 1;
}
</style>