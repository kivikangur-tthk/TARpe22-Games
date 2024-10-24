<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
}
</script>
<template>
  <button @click="count++">You cliced me {{ count }} times.</button>
</template>
