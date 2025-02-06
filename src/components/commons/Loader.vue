<template>
  <div class="loader-wrapper">
    <div class="loader">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <p>Carregando filmes...</p>
  </div>
</template>

<style lang="scss">
.loader-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  p {
    margin: 5px 0 0;
  }
}

.loader {
  width: 70px;
  height: 16px;
  display: flex;
  justify-content: space-between;
}

.loader .dot {
  height: 100%;
  display: block;
  aspect-ratio: 1;
  border-radius: 50%;
  transform: scale(1);
  animation: carregando 0.5s linear infinite alternate-reverse;
  background-color: #010E7E;
}

.loader .dot:nth-child(1) {
  animation-delay: 0s;
}

.loader .dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loader .dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes carregando {
 from {transform: scale(0);}
 to {transform: scale(1);}
}
</style>