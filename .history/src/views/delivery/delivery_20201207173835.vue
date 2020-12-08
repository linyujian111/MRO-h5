<template>
  <div class="view">
    <DeliveryCard></DeliveryCard>
  </div>
</template>

<script>
import DeliveryCard from "./compoments/deliveryCard";
export default {
  components: {
    DeliveryCard,
  }
};
</script>

<style lang="less" scoped>
.view {
  padding: 10px;
}
</style>