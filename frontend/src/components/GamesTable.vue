<script>

import GameDetails from '@/components/game/GameDetails.vue'

export default {
  name: "GamesTable",
  components:{
    GameDetails
  },
  props: {
    items: Array,
  },
  data() {
    return {
      modalGame: null,
    }
  },
  methods: {
    async showDetailsModal(gameId) {
      const response = await (await fetch("http://localhost:8080/games/"+gameId)).json();
      if(response.error !== undefined){
        alert(response.error);
        this.modalGame = null;
        return false;
      }
      this.modalGame = response;
    }
  }
}
</script>

<template>
  <table class="table table-striped">
    <thead class="table-dark">
      <tr>
        <th>Name</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items">
        <td @click="showDetailsModal(item.id)">{{ item.name }}</td>
        <td>{{ item.price }}</td>
      </tr>
    </tbody>
  </table>
  <GameDetails :key="modalGame ? modalGame.id : null" :variant="'success'" :game="modalGame"></GameDetails>
</template>

<style scoped>

</style>
