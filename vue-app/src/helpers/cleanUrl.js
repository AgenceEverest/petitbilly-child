/**
 * Cleans the URL by setting the website and protocol based on the location.
 *
 * @param {string} website - the website to be cleaned.
 * @param {string} protocol - the protocol to be cleaned.
 * @return {object} An object containing the cleaned website and protocol.
 */
export function cleanUrl(website, protocol) {
  // console.log("lurl est cleanée");
  if (location.hostname === "localhost") {
    let pathname = location.pathname;
    if (location.pathname === "/") {
      // dans le cas d'un localhost avec la commande NPM run dev
      pathname = "/petitbilly";
    }
    pathname = pathname.split("/");
    pathname = pathname[1];
    website = `localhost/${pathname}`;
    protocol = "http";
  } else {
    website = location.host;
    protocol = "https";
  }
  return { website, protocol };
}
