<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-container">
      <header class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-button" @click="closeModal">
          <v-icon name="md-clear-round"  />
        </button>
      </header>

      <div class="modal-body">
        <slot></slot>
      </div>

      <footer class="modal-footer">
        <button @click="handleConfirm" class="btn btn-secondary">{{ confirmText }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      default: "Título do Modal"
    },
    cancelText: {
      type: String,
      default: "Cancelar"
    },
    confirmText: {
      type: String,
      default: "Confirmar"
    },
    onCancel: {
      type: Function,
      default: null
    },
    onConfirm: {
      type: Function,
      default: null
    },
    autoClose: {
      type: Boolean,
      default: true 
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:visible", false);
    },
    handleCancel() {
      if (this.onCancel) {
        this.onCancel();
      }
      if (this.autoClose) {
        this.closeModal();
      }
    },
    handleConfirm() {
      if (this.onConfirm) {
        this.onConfirm();
      }
      if (this.autoClose) {
        this.closeModal();
      }
    }
  }
};
</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-container {
    background: white;
    width: 400px;
    padding: 20px;
    border-radius: 8px;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }

  .modal-header h2 {
    margin: 0;
    font-weight: 500;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }

  .modal-body {
    padding: 24px 0;
  }

  .modal-footer {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
  }
</style>
