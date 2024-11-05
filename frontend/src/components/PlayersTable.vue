<script>
export default {
  name: "PlayersTable",
  props: {
    items: Array
  }
}
</script>

<template>
<table class="table table-striped">
  <thead class="table-dark">
  <tr>
    <th>Name</th>
  </tr>
  </thead>
<tbody>
  <tr v-for="item in items">
    <td>{{ item.name }}</td>
  </tr>
</tbody>
</table>
</template>

<style scoped>

</style>
