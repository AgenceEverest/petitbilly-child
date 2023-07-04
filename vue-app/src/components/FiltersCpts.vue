<script>
import SvgLoop from "../svg/SvgLoop.vue";

export default {
  name: "FiltersCpts",
  emits: ['handleClick', 'filterElementsByKeyword'],
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
    type_de_filtre: {
      type: String,
      default: "",
    },
    champs_texte_pour_affiner: {
      type: Boolean,
      default: false,
    },
    texte_pour_le_label_1: {
      type: String,
      default: "Type 1",
    },
    texte_pour_le_label_2: {
      type: String,
      default: "Type 2",
    },
    texte_pour_le_label_3: {
      type: String,
      default: "Type 3",
    },
    texte_pour_le_label_4: {
      type: String,
      default: "Type 4",
    },
    texte_tous_les_filtres_1: {
      type: String,
      default: "Tous les filtres",
    },
    texte_tous_les_filtres_2: {
      type: String,
      default: "Tous les filtres",
    },
    texte_tous_les_filtres_3: {
      type: String,
      default: "Tous les filtres",
    },
    texte_tous_les_filtres_4: {
      type: String,
      default: "Tous les filtres",
    },
  },
  components: {
    SvgLoop,
  },
  data() {
    return {
      userEntry: "",
    };
  },
};
</script>

<template>
  <div class="filters">
    <!-- Filtre avec boutons -->
    <template v-if="this.type_de_filtre === 'boutons'">
      <div
        class="buttons"
        v-for="(filter, index) in filters"
        :key="filter.taxonomy"
      >
        <div
          :class="filter.isAllButtonToggled ? 'active' : ''"
          @click="
            () => {
              if (!filter.isAllButtonToggled) {
                $emit('handleClick', 'all', filter);
                filter.isAllButtonToggled = !filter.isAllButtonToggled;
              }
            }
          "
          class="button"
        >
          {{ this.$props[`texte_tous_les_filtres_${index + 1}`] }}
        </div>
        <div
          @click="$emit('handleClick', term.name, filter)"
          :class="term.active ? 'active' : ''"
          class="button"
          v-for="term in filter.terms"
          :key="term.id"
        >
          {{ term.name }}
        </div>
      </div>
    </template>
    <!-- Champ pour filtrer les résultats de la page -->
    <div v-if="champs_texte_pour_affiner" class="text-filter-container">
      <SvgLoop />
      <input
        v-if="champs_texte_pour_affiner"
        type="text"
        v-model="userEntry"
        @input="$emit('filterElementsByKeyword', userEntry)"
        class="filter-input"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selects-container {
  color: black;
}
</style>
