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
    <div class="img-container">
      <template v-if="cpt.hasOwnProperty('_embedded')">
        <template v-if="cpt._embedded['wp:featuredmedia']">
          <img :src="cpt._embedded['wp:featuredmedia'][0].source_url" alt="" />
        </template>
      </template>
    </div>
    <div class="terms-container">
      <template v-if="cpt.acf.nouvelle_formation">
        <p v-if="cpt.acf.nouvelle_formation" class="nouvelle-formation">
          {{ texte_pour_le_bandeau_de_nouvelle_formation }}
        </p>
      </template>
      <template v-for="(taxo, index) in cpt._embedded['wp:term']" :key="taxo.id">
        <template v-if="taxo && taxo.length">
          <div class="term-wrapper">
            <span v-for="term in taxo" :key="term.id" :class="'term term-' + index">
              {{ term.name }}
            </span>
            <svg preserveAspectRatio="none" class="term-bg" xmlns="http://www.w3.org/2000/svg" width="88.686"
              height="38.778" viewBox="0 0 88.686 38.778">
              <g id="Groupe_1651" data-name="Groupe 1651" transform="translate(-14.46 9.184)">
                <path id="Tracé_342" data-name="Tracé 342"
                  d="M25.743-.028C46.713-1.445,47,.568,61.609,1.985a130,130,0,0,0,22.921.475c.138.069,0,35.806,0,35.806H62.536c-13.372,0-20.435-1.109-33.856-2.016C7.71,34.834,7.983,39.736.235,32.083s-3.4-25.731,0-30.1S4.773,1.388,25.743-.028Z"
                  transform="translate(18.556 -8.673)" />
              </g>
            </svg>
          </div>
        </template>
      </template>
      <template v-if="cpt.hasOwnProperty('_embedded')">
        <span v-if="cpt.acf.champ_libre" class="term term-libre">
          {{ cpt.acf.champ_libre }}
        </span>
      </template>
    </div>
    <h3> <a :href="cpt.link" class="lien-telechargement" target="_blank">{{ cpt.title.rendered }}</a>
    </h3>

    <p v-if="cpt.acf.hasOwnProperty('description_extrait_de_la_page')" class="desc-page">
      {{ cpt.acf.description_extrait_de_la_page }}
    </p>

    <template v-if="cpt.acf.lien_telechargement != null">
      <a :href="cpt.acf.lien_telechargement" class="lien-telechargement" target="_blank">
        {{ cpt.acf.texte_du_lien_vers_le_fichier_a_telecharger }}
      </a>
    </template>
    <template v-if="cpt.acf.lien_externe != null">
      <a target="_blank" class="lien-telechargement" :href="cpt.acf.lien_externe.url">{{ cpt.acf.lien_externe.title }}</a>
    </template>
    <div class="buttons-extrait">
      <p v-if="cpt.link" class="cta_center">
        <a target="_blank" :href="cpt.link"><span>{{ texte_en_savoir_plus }}</span>
          <svg preserveAspectRatio="none" id="fond-cta" xmlns="http://www.w3.org/2000/svg" width="207.852" height="49.779"
            viewBox="0 0 207.852 49.779">
            <path id="Tracé_342" data-name="Tracé 342"
              d="M65.823.109c49.139-1.819,49.813.766,84.042,2.584S179.388.16,194.784,7.383s7.607,26.36,1.449,33.947-12.86,7.938-44.195,7.938-47.884-1.424-79.333-2.588c-49.139-1.819-48.5,4.474-66.654-5.35s-7.97-33.03,0-38.637S16.684,1.927,65.823.109Z"
              transform="translate(4.095 0.511)" fill="#c5191b" />
          </svg>
        </a>
      </p>
    </div>
  </div>
</template>
<style></style>
