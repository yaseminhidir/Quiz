<template>
  <div>
    <sinav :questions="questions"></sinav>
  </div>
</template>

<script>
import sinav from "./Sinav";
export default {
  components: {
    sinav,
  },
  data() {
    return {
      questions: [
        {
          question: '"||" bir mantıksal operatördür.',
          answers: ["Doğru", "Yanlış"],
          correctAnswer: "Doğru",
          givenAnswer: "",
          type: "radio",
        },
      ],
    };
  },
};
</script>
