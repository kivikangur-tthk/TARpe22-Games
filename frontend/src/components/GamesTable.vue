<script>
export default {
  name: "GamesTable",
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
    <th>Price</th>
  </tr>
  </thead>
<tbody>
  <tr v-for="item in items">
    <td>{{ item.name }}</td>
    <td>{{ item.price }}</td>
  </tr>
</tbody>
</table>
</template>

<style scoped>

</style>
