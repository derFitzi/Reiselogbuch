import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'leaflet/dist/leaflet.css';

// Fix für Leaflet Icon-Pfade
import L from 'leaflet';

// Entfernt die Methode zum Abrufen von Icon-URLs (geht sonst nicht) und setzt absolute Icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const app = createApp(App);
app.use(router);
app.mount('#app');