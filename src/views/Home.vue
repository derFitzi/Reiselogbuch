<template>
  <div class="home-container"> <!-- Nur für Style-->
    <div class="hero-section"> <!-- Nur für Style-->
      <h1>Lukas Reiselogbuch</h1>
      <p>Zum Dokumentieren der tollsten Reiseerlebnisse</p>
      
      <div class="action-button"> <!-- Nur für Style-->
        <router-link to="/entries">
          <button class="primary-btn">Zu den Reiseeinträgen</button>
        </router-link>
      </div>
    </div>
    
  </div>
</template>

<style scoped> 
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
}

.hero-section {
  text-align: center;
  padding: 3rem 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #343a40;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  color: #6c757d;
  margin-bottom: 2rem;
}

.action-button {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.primary-btn, .secondary-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.primary-btn {
  background-color: #3871b5;
  color: white;
}

.secondary-btn {
  background-color: #6c757d;
  color: white;
}

.recent-entries {
  margin-top: 3rem;
}

.recent-entries h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #343a40;
}

.entry-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.entry-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-image {
  height: 200px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-info {
  padding: 1rem;
}

.card-info h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: #343a40;
}

.card-info p {
  margin: 0;
  color: #6c757d;
}
</style>