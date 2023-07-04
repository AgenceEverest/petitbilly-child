<script>
export default {
  name: "RecetteExtrait",
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
  },
};
</script>

<template>
  <div>
    <div class="terms-container">
      <template v-if="cpt.acf.nouvelle_formation">
        <p v-if="cpt.acf.nouvelle_formation" class="nouvelle-formation">
          {{ texte_pour_le_bandeau_de_nouvelle_formation }}
        </p>
      </template>
      <template
        v-for="(taxo, index) in cpt._embedded['wp:term']"
        :key="taxo.id"
      >
        <template v-if="taxo && taxo.length">
          <span
            v-for="term in taxo"
            :key="term.id"
            :class="'term term-' + index"
          >
            {{ term.name }}
          </span>
        </template>
      </template>
      <template v-if="cpt.hasOwnProperty('_embedded')">
        <span v-if="cpt.acf.champ_libre" class="term term-libre">
          {{ cpt.acf.champ_libre }}
        </span>
      </template>
    </div>
    <h3>{{ cpt.title.rendered }}</h3>

    <p
      v-if="cpt.acf.hasOwnProperty('description_extrait_de_la_page')"
      class="desc-page"
    >
      {{ cpt.acf.description_extrait_de_la_page }}
    </p>

    <template v-if="cpt.acf.lien_telechargement != null">
      <a
        :href="cpt.acf.lien_telechargement"
        class="lien-telechargement"
        target="_blank"
      >
        {{ cpt.acf.texte_du_lien_vers_le_fichier_a_telecharger }}
      </a>
    </template>
    <template v-if="cpt.acf.lien_externe != null">
      <a
        target="_blank"
        class="lien-telechargement"
        :href="cpt.acf.lien_externe.url"
        >{{ cpt.acf.lien_externe.title }}</a
      >
    </template>
    <div class="buttons-extrait">
      <p v-if="cpt.link" class="cta_btn_lead cta_secondaire cta_center">
        <a target="_blank" :href="cpt.link">{{ texte_en_savoir_plus }}</a>
      </p>
    </div>
  </div>
</template>
<style></style>
