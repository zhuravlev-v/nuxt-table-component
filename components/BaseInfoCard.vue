<template>
  <div class="card">
    <p v-for="(value, key) of info">
      <span class="card__name">{{ key }}:</span>
      <span class="card__value">{{ value }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    info: { type: Object, required: true }
  },
}
</script>

<style lang='scss' scoped>
.card {
  padding: 15px;
  box-sizing: border-box;
  font-family: 'Inter';
  background: #FFF;
  border-radius: 1em;
  overflow: hidden;
  min-width: 700px;
  width: 700px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);

  &__name {
    font-weight: 600;
  }
}
</style>