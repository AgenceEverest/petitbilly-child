<!-- Si vous souhaitez customiser l'app, copiez tous le dossier de l'app ainsi que le block acf associé 
dans le thème enfant, et redéclarez un bloc avec l'app copiée -->
<!-- 
  Un post est soit "displayable", soit "show"
-->
<script>
import FiltersCpts from "./FiltersCpts.vue";
import RecetteExtrait from "./excerpts/RecetteExtrait.vue";
import dataProperties from "../helpers/dataProperties";
import he from "he";
import { getApiData } from "../helpers/getApi";
import { cleanUrl } from "../helpers/cleanUrl";
export default {
  name: "ShowCpt",
  components: {
    FiltersCpts,
    RecetteExtrait,
  },
  data() {
    return {
      ...dataProperties(),
      dataJson: {},
    };
  },
  mounted() {
    this.app = document.querySelector("#app");
    this.dataJson = JSON.parse(this.app.getAttribute("data-json"));
    this.setMaxDisplayablePosts(this.dataJson.max_posts);
    this.setIncrementNumber(this.dataJson.increment_number);
    this.getCpt(this.dataJson.publication_liste_app).then(() => {
      this.activeAllAtStart();
    });
  },
  methods: {
    activeAllAtStart() {
      this.cpts.forEach((cpt) => {
        cpt.show = true;
        this.displayPostAccordingMaxDisplayable(cpt);
      });
      this.filters.forEach((filter) => {
        filter.isAllButtonToggled = true;
        filter.terms.forEach((term) => {
          term.active = false;
        });
      });
      this.hasMoreContent = this.displayed < this.displayablePosts;
      this.recordOriginalCpts();
    },
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
    async getCpt(cptName) {
      const { website, protocol } = cleanUrl(this.website, this.protocol); // récupère le bon nom de site et le bon protocole
      this.website = website;
      this.protocol = protocol;
      this.cptName = cptName;

      let cptNameForRequest = this.cptName;

      // attention ici en cas d'usage des posts, le nom est différent entre la route et le nom en PHP...
      if (this.cptName === "post") {
        cptNameForRequest = "posts";
      }

      try {
        console.log(
          `${this.protocol}://${this.website}/wp-json/custom/v1/${cptNameForRequest}`
        );
        this.cpts = await getApiData(
          `${this.protocol}://${this.website}/wp-json/custom/v1/${cptNameForRequest}`
        );

        // this.cpts = this.reorganiseCpts(this.cpts);

        //on récupère les taxonomies et les terms
        this.taxonomiesAndTerms = await getApiData(
          `${this.protocol}://${this.website}/wp-json/wp/v2/taxonomies-and-terms/`
        );

        // on charge le contenu des filtres
        this.filters = this.loadFiltersContent(
          this.taxonomiesAndTerms,
          this.cptName
        );
        this.isLoaded = true;
      } catch (err) {
        console.log(err);
      }
      // si this.cpts.length est égal à 100, il faut refaire une requête pour récupérer les 100 suivants
    },
    loadFiltersContent(taxonomiesAndTerms, cptName) {
      let filters = [];
      let i = 1;
      for (i = 1; i < 5; i++) {
        let filter = this.dataJson["filtre_etage_" + i];
        filter ? filters.push(filter) : null;
      }
      return filters.map((filter) => {
        if (taxonomiesAndTerms[cptName][filter]) {
          return {
            taxonomy: filter,
            terms: taxonomiesAndTerms[cptName][filter],
            isAllButtonToggled: false,
          };
        }
      });
    },
    reorganiseCpts(cpts) {
      return (cpts = cpts.map((cpt) => {
        let newCpt = { ...cpt, show: true };
        if ("_embedded" in newCpt) {
          newCpt.terms = newCpt._embedded["wp:term"]
            ? newCpt._embedded["wp:term"].flatMap((taxo) => taxo)
            : "";
        } else {
          newCpt.terms = [];
        }
        return newCpt;
      }));
    },
    decodeHtmlInTree(node) {
      const nodes = node.childNodes;
      for (let i = 0; i < nodes.length; i++) {
        const currentNode = nodes[i];
        if (currentNode.nodeType === Node.TEXT_NODE) {
          currentNode.textContent = currentNode.textContent
            ? he.decode(currentNode.textContent)
            : "";
        } else if (currentNode.nodeType === Node.ELEMENT_NODE) {
          this.decodeHtmlInTree(currentNode);
        }
      }
    },
    displayPostAccordingMaxDisplayable(cpt) {
      // console.log("montre les CPT selon le max possible");
      this.displayablePosts++;
      if (this.displayed < this.maxDisplayable) {
        cpt.display = true;
        this.displayed++;
      } else {
        cpt.display = false;
      }
    },
    handleClick(termName, filter) {
      console.log("gestion du clic des boutons");
      if (this.originalCpts.length === 0) {
        this.recordOriginalCpts();
      } else {
        if (
          this.originalCpts.length > 0 &&
          this.originalCpts.length !== this.cpts.length
        ) {
          this.cpts = JSON.parse(JSON.stringify(this.originalCpts));
        }
      }
      console.log("Clic sur un filtre");
      this.filters = this.filters.map((innerFilter) => {
        if (termName === "all") {
          if (innerFilter.taxonomy === filter.taxonomy) {
            return this.toggleAllToTrueInFilter(innerFilter);
          } else {
            return innerFilter;
          }
        } else {
          let termsCopy = this.toggleTermClicked(termName, innerFilter);
          let isAllButtonToggled = this.checkIfAnyTermActive(termsCopy);

          return {
            ...innerFilter, // On copie toutes les propriétés de 'filter'
            terms: termsCopy, // On utilise la copie modifiée des termes
            isAllButtonToggled: isAllButtonToggled, // On met à jour la valeur de 'isAllButtonToggled'
          };
        }
      });
      this.filterCpts();
      // this.hasMoreContent = this.displayed < this.displayablePosts;
    },
    toggleTermClicked(termName, innerFilter) {
      let termsCopy = innerFilter.terms.map((term) => {
        let termCopy = { ...term }; // Copie de l'objet 'term'
        if (termCopy.name === termName) {
          termCopy.active = !termCopy.active;
        }
        return termCopy;
      });
      return termsCopy;
    },
    checkIfAnyTermActive(termsCopy) {
      let activeTermFound = termsCopy.find((term) => term.active);
      let isAllButtonToggled = activeTermFound === undefined ? true : false;
      return isAllButtonToggled;
    },
    incrementmaxDisplayable() {
      this.maxDisplayable = this.maxDisplayable + this.incrementNumber;
      this.displayed = 0;
      this.cpts.forEach((cpt) => {
        if (this.displayed < this.maxDisplayable) {
          if (cpt.show) {
            cpt.display = true;
            this.displayed++;
          }
        }
      });

      this.hasMoreContent = this.displayed < this.displayablePosts;
    },
    toggleAllToTrueInFilter(innerFilter) {
      let termsCopy = innerFilter.terms.map((term) => {
        let termCopy = { ...term }; // Copie de l'objet 'term'
        termCopy.active = false;
        return termCopy;
      });
      let isAllButtonToggled = true;
      return {
        ...innerFilter, // On copie toutes les propriétés de 'filter'
        terms: termsCopy, // On utilise la copie modifiée des termes
        isAllButtonToggled: isAllButtonToggled, // On met à jour la valeur de 'isAllButtonToggled'
      };
    },
    recordOriginalCpts() {
      // console.log("enregistrement des CPTS originaux");
      this.originalCpts = JSON.parse(JSON.stringify(this.cpts));
    },
    setMaxDisplayablePosts(value) {
      this.maxDisplayable = parseInt(value);
    },
    setIncrementNumber(value) {
      this.incrementNumber = parseInt(value);
    },
    userSearchOrDeleteKeyword(keyword) {
      this.lastKeyword = keyword;
      this.displayed = 0;
      this.displayablePosts = 0;

      this.cpts.forEach((cpt) => {
        const title = cpt.title.toLowerCase();

        const checkMatch = (input) =>
          he.decode(input.toLowerCase()).includes(keyword.toLowerCase());

        const checkAcfFields = (acf) => {
          for (const key in acf) {
            if (
              acf[key] &&
              typeof acf[key] === "string" &&
              checkMatch(acf[key])
            ) {
              return true;
            }
          }
          return false;
        };

        const checkTerms = (terms) => {
          for (const key in terms) {
            const termsArray = Array.from(terms[key]);
            for (let i = 0; i < termsArray.length; i++) {
              if (checkMatch(termsArray[i])) {
                return true;
              }
            }
          }
          return false;
        };

        const termFound = cpt.terms ? checkTerms(cpt.terms) : false;

        let match = checkMatch(title) || checkAcfFields(cpt.acf) || termFound;

        if (match) {
          this.displayablePosts++;
        }

        cpt.display = match;
        this.displayed++;
      });
      this.maxDisplayable = this.displayed;
      this.hasMoreContent = this.displayed < this.displayablePosts;
    },
    filterElementsByKeyword(keyword) {
      this.displayed = 0;
      this.displayablePosts = 0;
      console.log("filtre par mots clés : ", keyword);
      if (this.lastKeyword.length < keyword.length) {
        console.log("lutilisateur affine");
        this.userSearchOrDeleteKeyword(keyword);
      } else {
        console.log("lutilisateur efface");
        this.lastKeyword = keyword;
        const isAnyTermActive = this.isAnyTermActive();

        if (isAnyTermActive) {
          this.cpts = JSON.parse(JSON.stringify(this.filteredCpts));
        } else {
          this.cpts = JSON.parse(JSON.stringify(this.originalCpts));
        }
        if (keyword === "") {
          console.log("le champ est de nouveau vide");
          this.cpts.forEach((cpt) => {
            if (cpt.show) {
              this.displayPostAccordingMaxDisplayable(cpt);
            }
          });

          this.hasMoreContent = this.displayed < this.displayablePosts;
          return;
        } else {
          console.log("l'utilisateur efface mais le champ n'est pas vide");
          this.userSearchOrDeleteKeyword(keyword);
        }
      }
    },
    isAnyTermActive() {
      return this.filters.some((filter) => {
        return filter.terms.some((term) => term.active === true);
      });
    },
    /**
     * Filtre les custom post types (CPTs) en fonction des taxonomies actives et des termes sélectionnés.
     *
     * Voici comment fonctionne cette méthode :
     *
     * Pour chaque CPT, elle passe en revue chaque filtre (lié à une taxonomie).
     * Pour chaque filtre, elle vérifie si le bouton "Tout" est activé et si un ou plusieurs des termes actifs du filtre sont présents dans le CPT.
     *
     * Après avoir vérifié tous les filtres pour un CPT donné, elle vérifie si tous les boutons "Tout" des filtres sont activés ou si tous les filtres actifs sont satisfaits.
     * Si l'une de ces conditions est vraie, le CPT est marqué comme devant être affiché (cpt.show = true).
     *
     * Ensuite, elle met à jour les compteurs de posts affichables et affichés (this.displayablePosts et this.displayed),
     * ainsi que l'indicateur signalant s'il reste encore du contenu à afficher (this.hasMoreContent).
     *
     * Enfin, elle enregistre les CPTs filtrés pour une utilisation ultérieure (this.recordFilteredCpts()).
     */ filterCpts() {
      // Réinitialisation des compteurs pour les posts pouvant être affichés et les posts affichés
      this.displayablePosts = 0;
      this.displayed = 0;

      // Boucle sur chaque CPT
      this.cpts.forEach((cpt) => {
        let termsActiveInFilters = {};
        let isAllButtonToggledInFilters = {};

        // Boucle sur chaque filtre
        this.filters.forEach((innerFilter) => {
          const currentTaxonomy = innerFilter.taxonomy;

          // Vérifie si le bouton "Tout" est activé pour ce filtre
          isAllButtonToggledInFilters[currentTaxonomy] =
            innerFilter.isAllButtonToggled;

          if (cpt[currentTaxonomy]) {
            // Récupère les IDs des termes dans le CPT pour cette taxonomie
            const termsIdsInCpt = Array.from(cpt[currentTaxonomy]);

            // Récupère les termes actifs dans le filtre
            const activeTerms = innerFilter.terms.filter((term) => term.active);

            // Vérifie si un des termes actifs est dans le CPT
            termsActiveInFilters[currentTaxonomy] = activeTerms.every((term) =>
              termsIdsInCpt.includes(term.term_id)
            );
          } else {
            termsActiveInFilters[currentTaxonomy] = false;
          }
        });

        // Vérifie si tous les boutons "Tout" sont activés
        const allButtonsToggled = Object.values(
          isAllButtonToggledInFilters
        ).every((toggled) => toggled);

        // Vérifie si tous les filtres actifs sont satisfaits
        const allActiveFiltersSatisfied = Object.keys(
          termsActiveInFilters
        ).every(
          (taxonomy) =>
            isAllButtonToggledInFilters[taxonomy] ||
            termsActiveInFilters[taxonomy]
        );

        // Si tous les boutons "Tout" sont activés ou si tous les filtres actifs sont satisfaits, affiche le CPT
        if (allButtonsToggled || allActiveFiltersSatisfied) {
          cpt.show = true;
          cpt.display = true;
          this.displayablePosts++;
          this.displayed++;
        } else {
          cpt.show = false;
        }

        // Met à jour si il reste plus de contenu à afficher
        this.hasMoreContent = this.displayed < this.displayablePosts;

        // Enregistre les CPTs filtrés pour une utilisation ultérieure
        this.recordFilteredCpts();
      });
      this.maxDisplayable = this.displayed;
    },

    recordFilteredCpts() {
      this.filteredCpts = JSON.parse(JSON.stringify(this.cpts));
    },
  },
};
</script>

<template>
  <FiltersCpts
    v-show="isLoaded"
    @handleClick="handleClick"
    @filterElementsByKeyword="filterElementsByKeyword"
    :filters="filters"
    :champs_texte_pour_affiner="dataJson.champs_texte_pour_affiner"
    :type_de_filtre="dataJson.type_de_filtre"
    :texte_pour_le_label_1="dataJson.texte_pour_le_label_1"
    :texte_pour_le_label_2="dataJson.texte_pour_le_label_2"
    :texte_pour_le_label_3="dataJson.texte_pour_le_label_3"
    :texte_pour_le_label_4="dataJson.texte_pour_le_label_4"
    :texte_tous_les_filtres_1="dataJson.texte_tous_les_filtres_1"
    :texte_tous_les_filtres_2="dataJson.texte_tous_les_filtres_2"
    :texte_tous_les_filtres_3="dataJson.texte_tous_les_filtres_3"
    :texte_tous_les_filtres_4="dataJson.texte_tous_les_filtres_4"
  />
  <div v-show="isLoaded" :class="extraitPaddingTop">
    <div class="results">
      <RecetteExtrait
        v-show="cpt.show && cpt.display"
        class="cpt-extrait"
        v-for="cpt in cpts"
        :key="cpt.id"
        :cpt="cpt"
        :texte_bandeau_nouveau="dataJson.texte_bandeau_nouveau"
        :texte_en_savoir_plus="dataJson.texte_en_savoir_plus"
        :texte_pour_le_bandeau_de_nouvelle_formation="
          dataJson.texte_pour_le_bandeau_de_nouvelle_formation
        "
        :filters="filters"
      />
    </div>
    <div class="load-more-container">
      <div
        @click="incrementmaxDisplayable"
        v-if="hasMoreContent"
        class="load-more"
      >
        {{ dataJson.load_more_text }}
      </div>
      <svg
        @click="incrementmaxDisplayable"
        v-if="hasMoreContent"
        class="load-more-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="207.852"
        height="49.779"
        viewBox="0 0 207.852 49.779"
      >
        <path
          class="load-more-path"
          id="Tracé_342"
          data-name="Tracé 342"
          d="M65.823.109c49.139-1.819,49.813.766,84.042,2.584S179.388.16,194.784,7.383s7.607,26.36,1.449,33.947-12.86,7.938-44.195,7.938-47.884-1.424-79.333-2.588c-49.139-1.819-48.5,4.474-66.654-5.35s-7.97-33.03,0-38.637S16.684,1.927,65.823.109Z"
          transform="translate(4.095 0.511)"
          fill="#c5191b"
        />
      </svg>
    </div>
  </div>
  <div v-show="!isLoaded" class="loader-container">
    <div class="lds-ripple">
      <div class="1" />
      <div class="2" />
    </div>
  </div>
</template>

<!-- <style lang="scss">
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ripple div {
  position: absolute;
  border: 4px solid rgb(255, 255, 255);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
 -->
