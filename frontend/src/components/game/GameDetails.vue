<script>
import BootstrapModal from '../modals/BootstrapModal.vue'
import Game from '@/models/Game'

export default {
  name: 'GameDetails',
  components: {
    BootstrapModal
  },
  props: {
    game: {
      type: {...Game}
    }
  }
}
</script>

<template>
  <BootstrapModal :visible="game!==null">
    <template v-slot:header><h5>{{ game.name }}</h5></template>
    <dl>
      <dt>Price</dt>
      <dd>{{ game.price ? game.price : 'free' }}</dd>
    </dl>
  </BootstrapModal>
</template>

<style scoped>

</style>
