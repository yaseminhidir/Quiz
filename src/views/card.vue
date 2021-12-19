<template>
  <div class="home">
    <div class="container">
      <div
        :class="
          gectiKaldi ? ' card mb-3 border-danger' : 'card mb-3 border-success'
        "
      >
        <div class="card-body">
          <ul class=" list-group list-group-flush ">
            <li class="list-group-item bg-light">Sonuçlar</li>
            <li class="list-group-item">
              <b> Ad-Soyad: </b> {{ user.ad }} {{ user.soyad }}
            </li>
            <li class="list-group-item"><b> Puan: </b> {{ user.point }}</li>
            <li class="list-group-item">
              <b> Doğru cevap verilen soru sayısı:</b>
              {{ user.correctanswerCount }}
            </li>
            <div v-for="(question, index4) in user.questions" :key="index4">
              <li class="list-group-item">
                <b> Soru </b>{{ index4 + 1 }}<br />
                <b> Verilen Cevap:</b> {{ question.givenAnswer }} <br />
                <b> Doğru Cevap: </b>{{ question.correctAnswer }}
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: { type: Object },
  },
  computed: {
    gectiKaldi() {
      if (this.user.point <= 30) {
        return true;
      }

      return false;
    },
  },
};
</script>

<style lang="scss">
.list-group-flush .list-group-item {
  border-width: 0 0 1px;
}
//#28a745!important yesil
//#dc3545!importantkırmızı

.border-success li {
  border-color: #28a745 !important;
}

.border-danger li {
  border-color: #dc3545 !important;
}
</style>
