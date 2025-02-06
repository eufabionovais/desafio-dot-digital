<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-container">
      <header class="modal-header">
        <h2>{{ title }}</h2>
        <button class="close-button" @click="closeModal">×</button>
      </header>

      <div class="modal-body">
        <slot></slot>
      </div>

      <footer class="modal-footer">
        <!-- <button @click="handleCancel">{{ cancelText }}</button> -->
        <button @click="handleConfirm">{{ confirmText }}</button>
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
      default: true // O modal fecha automaticamente ao confirmar ou cancelar
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
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-body {
  padding: 15px 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.modal-footer button {
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.modal-footer button:first-child {
  background: #ccc;
}

.modal-footer button:last-child {
  background: #007bff;
  color: white;
}
</style>
