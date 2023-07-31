<script>
import FondCta from "./FondCta.vue";
import TermBg from "./TermBg.vue";
import he from "he";
export default {
  name: "RecetteExtrait",
  components: {
    FondCta,
    TermBg,
  },
  props: {
    cpt: {
      type: Object,
    },
    texte_en_savoir_plus: {
      type: String,
    },
    showTaxonomies: {
      type: Object,
    },
    texte_pour_le_bandeau_de_nouvelle_formation: {
      type: String,
    },
    texte_bandeau_nouveau: {
      type: String,
    },
    filters: {
      type: Array,
    },
  },
  methods: {
    convertToFrenchDate(dateString) {
      if (dateString) {
        var date = new Date(
          dateString.slice(0, 4),
          dateString.slice(4, 6) - 1,
          dateString.slice(6)
        );
        var options = { year: "numeric", month: "short", day: "numeric" };
        return new Intl.DateTimeFormat("fr-FR", options).format(date);
      }
    },
    decode(string) {
      if (string) {
        return he.decode(string);
      }
      return '';
    },
  },
};
</script>

<template>
  <div>
    <div class="img-container">
      <template v-if="cpt.thumbnail">
        <template v-if="cpt.thumbnail">
          <a target="_blank" :href="cpt.link"
            ><img :src="cpt.thumbnail" alt=""
          /></a>
        </template>
      </template>
    </div>
    <div class="terms-container">
      <template v-if="cpt.acf.nouvelle_recette">
        <p v-if="cpt.acf.nouvelle_recette" class="nouvelle_recette">
          {{ decode(texte_bandeau_nouveau) }}
        </p>
      </template>
      <div
        v-for="(taxo, index) in cpt.terms"
        :key="taxo"
        :class="'term-wrapper'"
      >
        <span :class="'term term-' + index">
          {{ decode(taxo) }}
        </span>
        <TermBg />
      </div>
      <template v-if="cpt.acf.champ_libre">
        <span v-if="cpt.acf.champ_libre" class="term term-libre">
          {{ decode(cpt.acf.champ_libre) }}
        </span>
      </template>
    </div>
    <h3>
      <a :href="cpt.permalink" class="lien-telechargement" target="_blank">{{
        decode(cpt.title)
      }}</a>
    </h3>

    <p v-if="cpt.acf.description_extrait_de_la_page" class="desc-page">
      {{ decode(cpt.acf.description_extrait_de_la_page) }}
    </p>

    <div class="buttons-extrait">
      <p v-if="cpt.permalink" class="cta_center">
        <a target="_blank" :href="cpt.permalink"
          ><span>{{ decode(texte_en_savoir_plus) }}</span>
          <FondCta />
        </a>
      </p>
    </div>
  </div>
</template>
<style></style>
