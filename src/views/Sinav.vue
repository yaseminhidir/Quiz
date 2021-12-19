<template>
  <div>
    <div v-if="isHiden">
      <div class="row justify-content-center" style="margin-top: 30px">
        <div
          class="col-6 bg-light"
          style="padding: 50px; border: 1px solid black"
          :style="hataBorder ? '' : 'border-color:red;'"
        >
          <h5 style="float: left">Giriş</h5>
          <br />
          <hr />
          <div class="row">
            <div class="col-sm-4 col-md-4 text-start">
              <label> Ad: </label>
            </div>
            <div class="col-sm-8 col-md-8 text-start">
              <input type="text" class="input bg-light" v-model="ad" />
              <label class="small" :style="hataAd ? '' : 'color:red'">
                Adınızı giriniz
              </label>
            </div>
            <p></p>
            <div class="col-sm-4 col-md-4 text-start">
              <label> Soyad: </label>
            </div>
            <div class="col-sm-8 col-md-8 text-start">
              <input type="text" class="input bg-light" v-model="soyad" />
              <label class="small" :style="hataSoyad ? '' : 'color:red'">
                Soyadınızı giriniz
              </label>
            </div>
            <div class="col-12">
              <button
                @click="start"
                class="btn btn-outline-success"
                style="margin-bottom: 18px"
                :class="hataBorder ? '' : 'btn btn-outline-danger'"
              >
                Başla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <button @click="clearAll">Sil</button> -->
    <div class="bg-light col-8 mx-auto" v-if="isShown">
      <h5 style=" padding-top: 18px;text-align: left;">
        {{ CurrentQuestion.question }}
      </h5>
      
      <hr />
      <div v-if="CurrentQuestion.type == 'radio'">
        <div v-for="(answer, index) in CurrentQuestion.answers" :key="index">
          <div class="row">
            <div class="col-3">
              <input
                type="radio"
                :name="'soru' + index"
                :value="answer"
                v-model="CurrentQuestion.givenAnswer"
              />
              <div class="vl"></div>
            </div>
            <div class="col-9 d-flex justify-content-start">
              {{ answer }}
            </div>
          </div>
          <hr />
        </div>
      </div>
      <div v-if="CurrentQuestion.type == 'button'">
        <div v-for="(answer, index) in CurrentQuestion.answers" :key="index">
          <label
            :class="
              CurrentQuestion.givenAnswer == answer
                ? 'btn btn-secondary btn-block'
                : 'btn btn-outline-secondary btn-block'
            "
            @click="cevapla(answer)"
          >
            {{ answer }}
          </label>
          <hr />
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <button
            style="width: 50%"
            @click="Back"
            class="btn btn-outline-primary"
            :disabled="isDisabledBack"
          >
            &laquo;
          </button>
        </div>
      
        <div class="col-6">
          <button
            style="width: 50%"
            @click="Next"
            class="btn btn-outline-primary"
            :disabled="isDisabledNext"
          >
            &raquo;
          </button>
        </div>
      </div>
        <hr />
      <div class="row">
          <div class="col-6">
          <button class="btn btn-outline-danger" @click="Clear">Temizle</button>
        </div>
        <div class="col-6 ">
          <button class="btn btn-outline-primary" @click="basaDon">
            Başa Dön
          </button>
        </div>
      </div>
      <hr />
      <div
        class="d-flex justify-content-center align-items-center"
        v-if="isShownButton"
      >
        <button
          :class="isDisabledBitir ? '' : 'btn btn-outline-success'"
          :disabled="isDisabledBitir"
          @click="Bitir()"
          style="margin-bottom: 18px"
        >
          Bitir
        </button>
      </div>
    </div>
    <div class="row" style="margin-top:100px">
      <card
        class="col-md-12 col-lg-4 col-sm-12"
        v-for="(user, index2) in users"
        :key="index2"
        :user="user"
      ></card>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import card from "./card.vue";
import { v4 as uuidv4 } from "uuid";
export default {
  props: {
    questions: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      ad: "",
      soyad: "",
      users: [],
      correctanswerCount: 0,
      hataBorder: true,
      hataAd: true,
      hataSoyad: true,
      point: 0,
      isShown: false,
      isHiden: true,
      questionIndex: 0,
    };
  },
  mounted() {
    if (localStorage.getItem("questions")) {
      try {
        this.quesions = JSON.parse(localStorage.getItem("questions"));
      } catch (e) {
        localStorage.removeItem("questions");
      }
    }
  },
  methods: {
    start() {
      if (!this.ad) {
        this.hataAd = false;
      }
      if (!this.soyad) {
        this.hataSoyad = false;
      }
      if (!this.ad || !this.soyad) {
        this.hataBorder = false;
      }
      if (this.ad && this.soyad) {
        this.isShown = true;
        this.isHiden = false;
        this.questionIndex = 0;
        for (const i of this.questions) {
          i.givenAnswer = "";
        }

        var deger = this.ClampQuestionIndex();
        if (deger) {
          this.questions = shuffle(this.questions);
        }
        this.point = 0;
        return;
      }
    },

    /*sil(i) {
      this.questions = this.questions.filter((x) => x != i);
    },
  
    clearAll() {
      this.isShown = false; 
    },*/
    cevapla(answer) {
      this.CurrentQuestion.givenAnswer = answer;
    },
    Next() {
      if (!this.CurrentQuestion.givenAnswer) {
        return swal.fire({
          icon: "error",
          text: "Devam etmek için yanıtlamanız gerekmektedir!",
        });
      }
      this.questionIndex++;
      var deger = this.ClampQuestionIndex();
      if (deger) {
        this.CurrentQuestion.answers = shuffle(this.CurrentQuestion.answers);
      }
    },
    Back() {
      this.questionIndex--;
      var deger = this.ClampQuestionIndex();
      if (deger) {
        this.CurrentQuestion.answers = shuffle(this.CurrentQuestion.answers);
      }
    },
    Clear() {
      var count = 0;
      for (const q of this.questions) {
        if (q.givenAnswer) count++;
        this.questionIndex = 0;
        q.givenAnswer = "";
        this.point = 0;
      }
      swal.fire("Toplam " + count + " soru temizlendi");
    },
    basaDon() {
      this.isShown = false;
      this.isHiden = true;
      this.soyad = "";
      this.ad = "";
      this.hataAd = true;
      this.hataSoyad = true;
      this.hataBorder = true;
    },

    Bitir() {
      for (const g of this.questions) {
        if (g.givenAnswer == g.correctAnswer) {
          this.point += 10;
          this.correctanswerCount++;
        }
      }
      if (this.point <= 30) {
        swal.fire({
          icon: "error",
          title: "Toplam puan: " + this.point,
          text: "Kaldınız",
        });
      }
      if (this.point > 30) {
        swal.fire({
          icon: "success",
          title: "Toplam puan: " + this.point,
          text: "Geçtiniz",
        });
      }
     
      this.users.push({
        ad: this.ad,
        soyad: this.soyad,
        point: this.point,
        questions: this.questions.map(q=>{return {...q}}),
        questionIndex: this.questionIndex,
        correctanswerCount: this.correctanswerCount,

        id: uuidv4(),
      });
      this.correctanswerCount = 0;
      this.point = 0;
    },
    ClampQuestionIndex() {
      if (this.questionIndex < 0) {
        this.questionIndex = 0;
        return false;
      }
      if (this.questionIndex >= this.questions.length) {
        this.questionIndex = this.questions.length - 1;

        return false;
      }

      return true;
    },
  },
  components: {
    card,
  },
  computed: {
    CurrentQuestion() {
      return this.questions[this.questionIndex];
    },

    isShownButton() {
      if (this.questionIndex >= this.questions.length - 1) {
        return true;
      }
      return false;
    },

    isDisabledBitir() {
      if (this.questions[this.questions.length - 1].givenAnswer) {
        return false;
      }
      return true;
    },
    isDisabledBack() {
      if (this.questionIndex == 0) {
        return true;
      }
      return false;
    },
    isDisabledNext() {
      if (this.questionIndex >= this.questions.length - 1) {
        return true;
      }
      return false;
    },
  },
};

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
</script>
<style lang="scss">
* {
  transition: all 0.5s !important;
}

.small {
  float: left;
  margin-bottom: 18px;
}
.input {
  width: 100%;

  border: 0px 0px 0px 1px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
}
.vl {
  border-left: 1px solid gray;
  margin-left: 75%;
  position: absolute;
  top: 0;
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
