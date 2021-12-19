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
          question: "Vue, Javascript kütüphanesidir.",
          answers: ["Doğru", "Yanlış"],
          correctAnswer: "Doğru",
          givenAnswer: "",
          type: "radio",
        },
        {
          question: "Css te bir elementin kenarlarini yuvarlatmak için border-color kullanılır.",
          answers: ["Doğru", "Yanlış"],
          correctAnswer: "Yanlış",
          givenAnswer: "",
          type: "radio",
        },
        {
          question:
            "Bootstrapte  col-sm-3  / col-sm-3 / col-sm-3 bir satiri 3 eşit parçaya böler.",
          answers: ["Doğru", "Yanlış"],
          correctAnswer: "Yanlış",
          givenAnswer: "",
          type: "radio",
        },
        {
          question: "if(true || false) komutu true ile sonuçlanır ve if bloğundaki kod çalışır.",
          answers: ["Doğru", "Yanlış"],
          correctAnswer: "Doğru",
          givenAnswer: "",
          type: "radio",
        },
        {
          question:
            "Asagidakilerden hangisi Vue de bir degiskeni inputa baglamak için doğru bir kullanimdir?",
          answers: ['v:model="ornek"', "v-model=ornek", 'v-model="ornek"'],
          correctAnswer: 'v-model="ornek"',
          givenAnswer: "",
          type: "button",
        },
        {
          question:
            "Vue de data icerisindeki değişkenler icin aşağıdakilerden hangisi yanlıştır?",
          answers: [
            "Template içinde kullanilmak istendiginde başına this. konularak kullanilir.",
            "İcinde bulundugu componentin degiskenlerini yonetmek için kullanılır.",
            "Script icerisinde erişmek için basina this. Konularak kullanililir. ",
          ],
          correctAnswer:
            "Template içinde kullanilmak istendiginde başına this. konularak kullanilir.",
          givenAnswer: "",
          type: "button",
        },
        {
          question: "Entity Framework aşağıdakilerden hangisi için kullanılır?",
          answers: [
            "Database ile uygulama arasinda iletişimi kolaylastirmak/sağlamak",
            "Arayüzden gelen isteği işlemek.",
            "Controller metodlarinin çalışma koşullarını belirlemek",
          ],
          correctAnswer:
            "Database ile uygulama arasinda iletişimi kolaylastirmak/sağlamak",
          givenAnswer: "",
          type: "button",
        },
        {
          question: "Asp.Net ve Asp.Net Core fameworklerinde arayüzden gelen istekler asagidakilerden hangisi içerisinde çalışır?",
          answers: ["Model", "Controller", "Entity Framework"],
          correctAnswer: "Controller",
          givenAnswer: "",
          type: "button",
        },
      ],
    };
  },
};
</script>
