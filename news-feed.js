/* this is where News feed api and RSS feeds will live add retrospective API Or RSS to fetch new
data and headlines - this could be curated through blog post publications from offical sources
for example tech threats from NCSC or updates in Apple ecosystem on latest macbook */

const newsLibrary = [
  // declaring a constant called NewsLibrary this storing URLS through an array
  "https://www.theregister.com/?lab_viewport=rss",
  "https://www.ncsc.gov.uk/api/1/services/v1/news-rss-feed.xml",
]; // this closes the declatation of the array

let libraryBrands = {}; // this prepares {} to contain News outlet data
let newsContent = []; // this using square [] to initialise  empty list storing Articles

/*
 * This function is to take one news library url and
 * return the RSS feeds brand information and
 * post data
 */
async function getNewsFromRssApi(newsLibraryUrl) {
  // declaring function getnewsfromR to get RSS feeds
  if (!newsLibraryUrl) {
    return;
  } // if no url provided return nothing

  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(newsLibraryUrl)}`; // this tells us to use RSS2json to encode any RSS link in newsLibrary to parse xml feeds
  let returnedLibraryBrand = {}; //initialises empty array brands (news outlets)
  let returneditems = []; //initialises empty array  items (articles)

  await fetch(url) // invoking fetch function to get url above
    .then(async (res) => {
      // the .then function acts as next step when fetch completes
      const response = await res.json();

      if (response.status !== "ok") {
        // staus value must be OK to show article
        throw new Error("Unable to report that story please try again"); // this shows user error if article status is false
      }
      // res = raw response
      // response = response body
      returneditems = response.items;
      returnedLibraryBrand = response.feed;
    })
    .catch((error) => {
      console.error(error);
      throw new Error("Unable to report that story please try again");
    });
  return {
    items: returneditems,
    brand: returnedLibraryBrand,
  };
}
(async () => {
  const NCSC = await getNewsFromRssApi(newsLibrary[1]);
  console.log(NCSC);
})();
