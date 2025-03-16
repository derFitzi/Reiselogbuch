<template>
  <div class="app-container">
    <header>
      <div class="logo">
        <router-link to="/">
           Lukas Reiselogbuch
        </router-link>
      </div>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/entries">Einträge</router-link>
        <router-link to="/statistics">Statistik</router-link>
      </nav>
    </header>
    
    <main>
      <router-view v-bind:entries="entries" @add-entry="addEntry" @remove-entry="removeEntry" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';

// Daten definieren (für v-model Bindung)
const entries = ref([]);

// Computed Property für das aktuelle Jahr
const currentYear = computed(() => new Date().getFullYear());

// Einträge aus localStorage laden
const loadEntries = () => {
  const savedEntries = localStorage.getItem('travelEntries');
  if (savedEntries) {
    entries.value = JSON.parse(savedEntries);
  }
};

// Einträge im localStorage speichern
const saveEntries = () => {
  localStorage.setItem('travelEntries', JSON.stringify(entries.value));
};

// Neuen Eintrag hinzufügen
const addEntry = (newEntry) => {
  entries.value.push(newEntry);
};

// Eintrag entfernen
const removeEntry = (index) => {
  entries.value.splice(index, 1);
};

// Einträge aus localStorage laden, wenn die Komponente geladen wird
onMounted(() => {
  loadEntries();
});

// Änderungen an entries im localStorage speichern
watch(entries, () => {
  saveEntries();
}, { deep: true });
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #4d81db;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
}

nav a.router-link-active {
  border-bottom: 2px solid white;
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

footer {
  background-color: #f8f9fa;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}
</style>