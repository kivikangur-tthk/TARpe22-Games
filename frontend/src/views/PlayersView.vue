<script>
import PlayersTable from '../components/PlayersTable.vue';
export default {
  name: "PlayersView",
  components: {
    PlayersTable,
  },
  data() {
    return {
      allPlayers: []
    }
  },
  async created() {
    this.allPlayers = await (await fetch('http://localhost:8080/players')).json();
  }
}
</script>

<template>
  <main>
    <PlayersTable :items=allPlayers />
  </main>

</template>

<style scoped>

</style>
