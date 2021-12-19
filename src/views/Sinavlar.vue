<template>
  <div>
    <sinav2 v-if="konu == 'sinav2'"></sinav2>
    <sinav1 v-else-if="konu == 'sinav1'"></sinav1>
    <div v-else>
        Sınav türü bulunamadı
    </div>
  </div>
</template>

<script>
import sinav2 from "./Sinav2.vue";
import sinav1 from "./Sinav1";

export default {
  components: {
    sinav2,
    sinav1,
  },
  props: {
    konu: {
      type: String,
      default: "",
    },
  },
};
</script>