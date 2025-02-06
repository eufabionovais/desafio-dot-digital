<template>
  <div class="tooltip-container" ref="container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot></slot>
    <div v-if="visible" class="tooltip" :style="tooltipStyle">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      tooltipStyle: {
        top: "100%",
        left: "0px",
        transform: "translateX(-50%)",
      },
    };
  },
  methods: {
    showTooltip(event) {
      
      this.visible = true;

      const button = event?.target?.getBoundingClientRect();
      const container = this.$refs.container.getBoundingClientRect();
      const tooltip = this.$refs?.tooltip?.getBoundingClientRect();
      const margin = 8; 

      if(!tooltip) {
        return
      }

    
      let left = button.left - container.left + button.width / 2;
      let top = button.top - container.top - tooltip.height - margin;


      if (left + tooltip.width / 2 > window.innerWidth) {
        left = window.innerWidth - tooltip.width / 2 - margin;
        this.tooltipStyle.transform = "translateX(0%)"; 
      }

      
      if (left - tooltip.width / 2 < 0) {
        left = margin;
        this.tooltipStyle.transform = "translateX(0%)"; 
      }

      
      if (top < 0) {
        top = button.top - container.top + button.height + margin;
      }

      
      this.tooltipStyle = {
        top: `${top}px`,
        left: `${left}px`,
        transform: this.tooltipStyle.transform,
      };
    },
    hideTooltip() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss">
.tooltip-container {
  display: inline-block;
  position: relative;
}

.tooltip {
  position: absolute;
  background: black;
  color: white;
  padding: 6px 10px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  transform: translateX(-50%);
  z-index: 100;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  top: 100%;
  &:before {
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px;
    border-color: transparent transparent #000 transparent;
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }
}
</style>
