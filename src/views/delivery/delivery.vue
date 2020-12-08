<template>
  <div class="view">
    <DeliveryCard></DeliveryCard>
    <DeliveryCard></DeliveryCard>
    <DeliveryCard></DeliveryCard>
    <DeliveryCard></DeliveryCard>
    <DeliveryCard></DeliveryCard>

  </div>
</template>

<script>
import DeliveryCard from "./compoments/deliveryCard";
// import AMap from "../../utils/amap-wx";
// import AMap from "https://webapi.amap.com/maps?v=1.4.15&key=981aeb7ed773a795f25e742b7cb05950";
export default {
  components: {
    DeliveryCard,
  },
 data() {
    let self = this;
    return {
    
    }
 },

created(){

},
  mounted(){
     
  
  },
  methods:{

  }
};
</script>

<style lang="less" scoped>
// .view {
//   padding: 10px;
// }
</style>