<template>
  <div class="entries-container">
    <div v-if="entries.length === 0" class="no-entries">
      keine Reise vorhanden
    </div>
    
    <ul v-else class="entry-list">
      <li v-for="(entry, index) in entries" :key="index" class="entry-item">
        <div class="entry-content">
          <div class="entry-details">
            <div class="entry-date">Besucht am: {{ formatDate(entry.date) }}</div>
            <h3>{{ entry.place }}</h3>
            <div v-if="entry.notes" class="entry-notes">{{ entry.notes }}</div>
          </div>
          
          <div class="entry-image">
            <img v-if="entry.imageUrl" :src="entry.imageUrl" :alt="entry.place" />
            <div v-else class="no-image">Kein Bild</div>
          </div>
        </div>
        
        <div class="entry-actions">
          <button @click="$emit('remove-entry', index)" class="delete-btn">Löschen</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  entries: Array
});

defineEmits(['remove-entry']);

// Datum formatieren
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('de-DE', options);
};
</script>

<style scoped>
.entries-container {
  margin-top: 2rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.no-entries {
  text-align: center;
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid #3980c0;
  color: #1e5c97;
}

.entry-list {
  list-style: none;
  padding: 0;
}

.entry-item {
  margin-bottom: 1.5rem;
  border: 2px solid #3980c0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.entry-content {
  display: flex;
  flex-direction: row;
}

.entry-details {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.entry-date {
  color: #1e5c97;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.entry-details h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #1e5c97;
  font-size: 1.5rem;
}

.entry-notes {
  margin-bottom: 1rem;
  flex-grow: 1;
  line-height: 1.6;
}

.entry-image {
  width: 300px;
  height: 200px;
  flex-shrink: 0;
}

.entry-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
}

.entry-actions {
  border-top: 1px solid #b8d1e8;
  padding: 1rem;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.6rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background-color: #c82333;
}

@media (max-width: 700px) {
  .entry-content {
    flex-direction: column-reverse;
  }
  
  .entry-image {
    width: 100%;
    height: 200px;
  }
}
</style>