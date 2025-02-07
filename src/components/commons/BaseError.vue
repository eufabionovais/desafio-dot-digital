
<template>
    <div class="error-message" v-if="error">
    <v-icon name="ri-alarm-warning-line" fill="#ff0000" scale="8" />
    <p>{{ error }}</p>  
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
  .error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    p {
      max-width: 32ch;
      text-align: center;
    }
  }
</style>