<template>
  <div class="entries-page">
    <TravelEntryForm @add-entry="addEntry" />
    

    <TravelEntryList 
      :entries="entries" 
      @remove-entry="removeEntry" 
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'; // Props und Events
import TravelEntryForm from '../components/TravelEntryForm.vue'; // Child Komponenten
import TravelEntryList from '../components/TravelEntryList.vue';

const props = defineProps({
  entries: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['add-entry', 'remove-entry']);

// Neuen Eintrag hinzufügen
const addEntry = (newEntry) => {
  emit('add-entry', newEntry);
};

// Eintrag entfernen
const removeEntry = (index) => {
    emit('remove-entry', index);
  
};
</script>

<style scoped>
.entries-page {
  max-width: 1000px;
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
</style>