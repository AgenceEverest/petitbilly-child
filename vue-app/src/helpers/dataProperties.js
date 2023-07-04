export default function dataProperties() {
  return {
    cpts: [],
    cptName: "",
    displayablePosts: 0, // correspond au nombre de posts qui ont show = true et toCome = true
    displayed: 0,
    selected: "",
    filters: [],
    taxonomiesAndTerms: [],
    indexCptShow: 0,
    incrementNumber: 0,
    isLoaded: false,
    hasMoreContent: true,
    howManyTaxonomiesInExcerpt: 0,
    extraitPaddingTop: "extrait-padding-top-1",
    maxDisplayable: 0,
    protocol: "",
    perPage: 0,
    postsFilteredByKeyword: false,
    postsFoundByKeyword: 0,
    lastKeyword: "",
    loadMore: "",
    showTaxonomies: {
      1: false,
      2: false,
      3: false,
      4: false,
    },
    textePourBandeauNouveau: "",
    website: "",
  };
}
