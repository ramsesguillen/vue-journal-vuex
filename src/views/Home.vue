<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="goToDaybook" class="btn btn-primary">uno</button>
    <button @click="goToDaybook" class="btn btn-secondary">dos</button>
    <button @click="goToDaybook" class="btn btn-success">tres</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToDaybook() {
      this.$router.push({ name: 'no-entry' })
    }
  }
}
</script>
