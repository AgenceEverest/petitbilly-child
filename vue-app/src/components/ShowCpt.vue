<!-- Si vous souhaitez customiser l'app, copiez tous le dossier de l'app ainsi que le block acf associé 
dans le thème enfant, et redéclarez un bloc avec l'app copiée -->
<!-- BRANCH REFACTO -->
<script>
import FiltersCpts from "./FiltersCpts.vue";
import FormationExtrait from "./excerpts/formationExtrait.vue";
import dataProperties from "../helpers/dataProperties";
import he from "he";
import { getApiData } from "../helpers/getApi";
import { cleanUrl } from "../helpers/cleanUrl";
export default {
  name: "ShowCpt",
  components: {
    FiltersCpts,
    FormationExtrait,
  },
  data() {
    return {
      activeTerms: [],
      filterDataModel: {
      
      },
      ...dataProperties(),
      dataJson: {},
    };
  },
  mounted() {
    console.log('Branche refacto');
    this.app = document.querySelector("#app");
    this.dataJson = JSON.parse(this.app.getAttribute("data-json"));
    this.setMaxDisplayablePosts(this.dataJson.max_posts);
    this.setIncrementNumber(this.dataJson.increment_number);
    let i = 1;
    for (i = 1; i < 5; i++) {
      let filter = this.dataJson["filtre_etage_" + i];
      filter ? this.filters.push(filter) : null;
    }
    this.getCpt(this.dataJson.publication_liste_app).then(() => {
      // la première option est sélectionnée par défaut dans le select, mais il faut aussi l'activer dans le store
      if (this.filterType === "select") {
        this.setFirstOptionAsActive();
      } else {
        this.activeAllAtStart();
      }
      /*       // permet de cacher ou d'afficher le bouton pour charger plus de résultats
      this.checkIfMaxPostsIsReached(); */
    });
  } /*
  updated() {
       this.decodeHtmlInTree(this.app);
    console.log(this.cpts); 
  }, */,
  methods: {
    activeAllAtStart() {
      this.cpts.forEach((cpt) => {
        cpt.show = true;
        this.displayPostAccordingMaxDisplayable(cpt);
      });
      this.filters.forEach((filter) => {
        filter.isAllButtonToggled = true;
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
      if (this.cptName === "post") {
        cptNameForRequest = "posts";
      }

      // attention ici en cas d'usage des posts
      try {
        console.log(
          `${this.protocol}://${this.website}/wp-json/wp/v2/${cptNameForRequest}?per_page=100&_embed`
        );
        this.cpts = await getApiData(
          `${this.protocol}://${this.website}/wp-json/wp/v2/${cptNameForRequest}?per_page=100&_embed`
        );

        this.cpts.forEach(async (cpt) => {
          cpt.show = true;

          if ("_embedded" in cpt) {
            cpt.terms = cpt._embedded["wp:term"]
              ? cpt._embedded["wp:term"].flatMap((taxo) => taxo)
              : "";
          } else {
            cpt.terms = [];
          }
          cpt.toCome = true; // on le met par défaut sur tous les CPT pour faciliter le codes
          if (cpt.acf.date_de_levenement) {
            if (cpt.acf.date_de_levenement) {
              const year = cpt.acf.date_de_levenement.slice(0, 4);
              const month = cpt.acf.date_de_levenement.slice(4, 6) - 1; // Les mois commencent à 0
              const day = cpt.acf.date_de_levenement.slice(6, 8);
              const eventDate = new Date(year, month, day);
              const now = new Date();
              if (eventDate < now) {
                cpt.toCome = false; // L'événement est déjà passé
              }
              if (cpt.acf.date_de_levenement) {
                cpt.acf.date_de_levenement = this.convertToFrenchDate(
                  cpt.acf.date_de_levenement
                );
              }
            }
          }
          if (cpt.acf.lien_telechargement) {
            const fileObject = await getApiData(
              `${this.protocol}://${this.website}/wp-json/wp/v2/media/${cpt.acf.lien_telechargement}`
            );
            cpt.acf.lien_telechargement = fileObject.source_url;
          }
        });

        //on récupère les taxonomies et les terms
        const taxonomiesAndTerms = await getApiData(
          `${this.protocol}://${this.website}/wp-json/wp/v2/taxonomies-and-terms/`
        );
        this.taxonomiesAndTerms = taxonomiesAndTerms;
        this.filters = this.filters.map((filter) => {
          if (this.taxonomiesAndTerms[this.cptName][filter]) {
            return {
              taxonomy: filter,
              terms: this.taxonomiesAndTerms[this.cptName][filter],
              isAllButtonToggled: false,
            };
          }
        });
        this.isLoaded = true;
      } catch (err) {
        console.log(err);
      }
      // si this.cpts.length est égal à 100, il faut refaire une requête pour récupérer les 100 suivants
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
    toggleAllButton(filter) {
      // console.log('le bouton "tout est activé');
      filter.terms.forEach((term) => {
        if (term.active) {
          this.isAllButtonToggled = false;
        }
      });
      this.recordFilteredCpts();
    },
    displayPostAccordingMaxDisplayable(cpt) {
      // console.log("montre les CPT selon le max possible");
      if (cpt.toCome) {
        this.displayablePosts++;
        if (this.displayed < this.maxDisplayable) {
          cpt.display = true;
          this.displayed++;
        } else {
          cpt.display = false;
        }
      }
    },
    handleClick(termName, filter) {
      /*       console.log(termName, filter);*/
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
      if (termName === "all") {
        this.displayed = 0;
        this.displayablePosts = 0;
          console.log("Clic sur TOUT");
        filter.terms.forEach((term) => {
          if (this.activeTerms.includes(term.name)) {
            this.activeTerms = this.activeTerms.filter(
              (activeTerm) => activeTerm !== term.name
            );
          }
        });
        let filterTaxonomy = filter.taxonomy;
        this.filters.forEach((filter) => {
          if (filter.taxonomy === filterTaxonomy) {
            filter.terms.forEach((term) => {
              term.active = false;
            });
          }
        });
        this.toggleAllButton(filter);
        if (this.activeTerms.length > 0) {
          this.filterCpts();
        } else {
          this.cpts.forEach((cpt) => {
            cpt.show = true;
            this.displayPostAccordingMaxDisplayable(cpt);
          });
        }
      } else {
        console.log("Clic sur un filtre");
        this.filters.forEach((filter) => {
          filter.terms.forEach((term) => {
            if (term.name === termName) {
              if (term.active) {
                term.active = false;
                this.activeTerms = this.activeTerms.filter(
                  (activeTerm) => activeTerm !== term.name
                );
              } else {
                term.active = true;
                filter.isAllButtonToggled = false;
                this.activeTerms = [...this.activeTerms, term.name];
              }
            }
            // on réactive le button pour tous les termes, mais si un terme est actif, on le désactive, ce qui permet
            // de le réactiver par défaut quand on désactive un terme
          });
          if (filter.terms.find((term) => term.active) !== undefined) {
            filter.isAllButtonToggled = false;
          } else {
            filter.isAllButtonToggled = true;
          }
        });
       // this.filterCpts();
      }
      this.hasMoreContent = this.displayed < this.displayablePosts;
    },
    incrementmaxDisplayable() {
      this.maxDisplayable = this.maxDisplayable + this.incrementNumber;
      this.displayed = 0;
      this.cpts.forEach((cpt) => {
        if (this.displayed < this.maxDisplayable) {
          if (cpt.show && cpt.toCome) {
            cpt.display = true;
            this.displayed++;
          }
        }
      });

      this.hasMoreContent = this.displayed < this.displayablePosts;
    },
    recordOriginalCpts() {
      // console.log("enregistrement des CPTS originaux");
      this.originalCpts = JSON.parse(JSON.stringify(this.cpts));
    },
    setFirstOptionAsActive() {
      // console.log("Activation de la première option en cas de selected");

      this.filters.forEach((filter) => {
        filter.terms[0].active = true;
        this.activeTerms.push(filter.terms[0].name);
      });
      this.filterCpts();
    },
    setMaxDisplayablePosts(value) {
      this.maxDisplayable = parseInt(value);
    },
    setIncrementNumber(value) {
      this.incrementNumber = parseInt(value);
    },

    userSearchOrDeleteKeyword(keyword) {
      this.lastKeyword = keyword;

      // Si le mot-clé est vide (l'utilisateur a effacé son mot-clé), on réinitialise la liste des CPTs et on sort de la fonction
      // Si le mot-clé est de longueur 1 (quand l'utilisateur a commencé à entrer une valeur),
      // on supprime du tableau des CPT ceux qui ne sont pas visibles, dans le but de pouvoir revenir à l'état
      // du premier filtre
      this.displayed = 0;
      this.displayablePosts = 0;
      this.cpts.forEach((cpt) => {
        if (cpt.toCome) {
          const title = cpt.title.rendered.toLowerCase();
          // condition qui permet de vérifier si le mot-clé renvoyé par l'utilisateur correspond à une des propriétés du custom post type
          let match = false;
          for (const key in cpt.acf) {
            console.log(key);

            if (cpt.acf[key] && typeof cpt.acf[key] === "string") {
              if (
                he
                  .decode(cpt.acf[key].toLowerCase())
                  .includes(keyword.toLowerCase())
              ) {
                match = true;
                break;
              }
            }
          }

          // vérification des terms du custom post type
          if (cpt.terms.length > 0) {
            for (const key in cpt.terms) {
              if (
                he
                  .decode(cpt.terms[key].name)
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
              ) {
                match = true;
                break;
              }
            }
          }

          if (
            (he.decode(title).includes(keyword.toLowerCase()) || match) &&
            cpt.show
          ) {
            this.displayablePosts++;
            cpt.display = false;
            if (this.displayed < this.maxDisplayable) {
              cpt.display = true;
              this.displayed++;
            }
          } else {
            cpt.display = false;
          }
        }
      });

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
        if (keyword === "") {
          console.log("le champ est de nouveau vide");
          if (this.activeTerms.length > 0) {
            this.cpts = JSON.parse(JSON.stringify(this.filteredCpts));
          } else {
            this.cpts = JSON.parse(JSON.stringify(this.originalCpts));
          }

          this.cpts.forEach((cpt) => {
            if (cpt.show) {
              this.displayPostAccordingMaxDisplayable(cpt);
            }
          });

          this.hasMoreContent = this.displayed < this.displayablePosts;
          return;
        } else {
          /*           this.postsFilteredByKeyword = true;
           */ console.log("l'utilisateur efface mais le champ n'est pas vide");
          this.userSearchOrDeleteKeyword(keyword);
        }
      }
    },
    filterCpts() {
      console.log("les CPTS sont filtrés");
      this.displayablePosts = 0;
      this.displayed = 0;
      this.cpts.forEach((cpt) => {
        // On vérifie tous les terms actifs, et si l'un des terms du CPT correspond à l'un des terms actif, alors on affiche le CPT
        if (this.activeTerms.length > 0) {
          cpt.show = this.activeTerms.some((activeTerm) => {
            if (cpt.terms.length > 0) {
              return cpt.terms.some((term) => term.name === activeTerm);
            }
          });
          if (cpt.show) {
            this.displayPostAccordingMaxDisplayable(cpt);
          }
        } else {
          // aucun term n'est actif, on affiche tout
          console.log("Aucun term actif, on affiche tout");
          cpt.show = true;
          this.displayPostAccordingMaxDisplayable(cpt);
        }
      });
      this.hasMoreContent = this.displayed < this.displayablePosts;
      this.recordFilteredCpts();
    },
    recordFilteredCpts() {
      // console.log("enregistrement des CPTS filtrés");
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
      <FormationExtrait
        v-show="cpt.show && cpt.display"
        class="cpt-extrait"
        v-for="cpt in cpts"
        :key="cpt.id"
        :cpt="cpt"
        :texte_en_savoir_plus="dataJson.texte_en_savoir_plus"
        :texte_pour_le_bandeau_de_nouvelle_formation="
          dataJson.texte_pour_le_bandeau_de_nouvelle_formation
        "
        :protocol="protocol"
        :website="website"
        :activeTerms="activeTerms"
      />
    </div>
    <div
      @click="incrementmaxDisplayable"
      v-if="hasMoreContent"
      class="load-more"
    >
      {{ dataJson.load_more_text }}
    </div>
  </div>
  <div v-show="!isLoaded" class="loader-container">
    <div class="lds-ripple">
      <div class="1" />
      <div class="2" />
    </div>
  </div>
</template>

<style lang="scss">
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
