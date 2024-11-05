<script>
export default {
  name: 'BootstrapModal',
  props: {
    visible: Boolean,
    variant: String
  },
  data() {
    return {
      isOpen: this.visible
    }
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    }
  },
}
</script>

<template>
  <div >
    <!-- Modal -->
    <div v-if="isOpen" class="modal fade show"
         tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog"
         style="display:block">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header"></slot>
            <button type="button" @click="closeModal()" class="btn-close" ></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" @click="closeModal()" :class="'btn btn-'+variant" >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
