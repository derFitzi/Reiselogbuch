<template>
  <div class="form-container">
    <h2 class="form-title">Neue Reise</h2>
    <form @submit.prevent="submitEntry" class="entry-form">
      <div class="form-row">
        <div class="form-group half">  <!--  half dass sie nebeneinander sind-->
          <label for="place">Reiseziel</label>
          <input 
            id="place" 
            v-model="newEntry.place" 
            placeholder="z.B. Innsbruck, Wien, ..." 
            required 
            @input="searchImages"
          />
        </div>

        <div class="form-group half">
          <label for="date">Datum</label>
          <input 
            id="date" 
            type="date" 
            v-model="newEntry.date" 
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="notes">Notizen</label>
        <textarea 
          id="notes" 
          v-model="newEntry.notes" 
          placeholder="Beschreibe wie die Reise war"
        ></textarea>
      </div>

      <button type="submit" :disabled="!isFormValid">Hinzufügen</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const emit = defineEmits(['add-entry']);
const newEntry = ref({ 
  place: '', 
  date: new Date().toISOString().substr(0, 10),
  notes: '',
  imageUrl: 'https://images.pexels.com/photos/161853/vienna-austria-architecture-city-161853.jpeg' // Fallback-Bild
});

// Validierung nur für Ort und Datum
const isFormValid = computed(() => {
  return newEntry.value.place && newEntry.value.date;
});

const searchTimeout = ref(null);

// Bilder suchen, wenn der Nutzer einen Ort eingibt
const searchImages = () => {
  if (searchTimeout.value) clearTimeout(searchTimeout.value);
  
  if (!newEntry.value.place || newEntry.value.place.length < 3) return;
  
  searchTimeout.value = setTimeout(async () => {
    try {
      // API-Key für Unsplash
      const apiKey = '3aEla7O5NVAk_nlnwfTRqlSXuPvRD084hC9r8yYlWT4';
      
      const response = await axios.get('https://api.unsplash.com/search/photos', {
        params: {
          query: newEntry.value.place,
          per_page: 1 // Nur ein Bild abrufen
        },
        headers: {
          'Authorization': `Client-ID ${apiKey}`
        }
      });
      
      // Wenn ein Bild gefunden wurde, setzen wir es als imageUrl
      if (response.data.results.length > 0) {
        newEntry.value.imageUrl = response.data.results[0].urls.regular;
      }
    } catch (err) {
      console.error('Fehler beim Abrufen des Bildes:', err);
      // Bei einem Fehler behalten wir das Fallback-Bild
    }
  }, 500); // 500ms Debounce
};

// Absenden-Funktion
const submitEntry = () => {
  if (isFormValid.value) {
    emit('add-entry', { ...newEntry.value });
    // Formular zurücksetzen
    newEntry.value = { 
      place: '', 
      date: new Date().toISOString().substr(0, 10),
      notes: '',
      imageUrl: 'https://images.pexels.com/photos/161853/vienna-austria-architecture-city-161853.jpeg' // Fallback-Bild
    };
  }
};
</script>

<style scoped>
.form-container {
  max-width: 650px;
  margin: 2rem auto;
  background-color: #f0f8ff;
  border: 2px solid #3980c0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  color: #1e5c97;
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
  border-bottom: 1px solid #b8d1e8;
  padding-bottom: 0.8rem;
}

.entry-form {
  max-width: 100%;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group.half {
  flex: 1;
  min-width: 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #1e5c97;
}

input, textarea {
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #b8d1e8;
  border-radius: 4px;
  background-color: #ffffff;
  font-family: inherit;
  transition: border-color 0.2s ease-in-out;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #3980c0;
  box-shadow: 0 0 0 2px rgba(57, 128, 192, 0.2);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

button {
  background-color: #3980c0;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
  transition: background-color 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: #2c6da8;
}

button:disabled {
  background-color: #b8d1e8;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-group.half {
    margin-bottom: 1.5rem;
  }
}
</style>