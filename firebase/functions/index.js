const functions = require("firebase-functions");
const admin = require("firebase-admin");
const superagent = require("superagent");

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addToFirestore = functions.https.onRequest((req, res) => {
  let name = req.body.name;
  let url = req.body.url;
  let site = req.body.site;
  let categories = req.body.categories;

  admin.firestore().collection("shops").doc(name).set({
    url: url,
    site: site,
    categories: categories,
  });
  res.status(200).send("success");
});

exports.checkBusiness = functions.https.onRequest(async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");
    let url =  req.body.url;
    let test = typeof req.body
    console.log(req.body);
    //url = url.replace("https://", "");
    let doc = await admin.firestore().collection("shops").doc(url).get();

    if (doc.exists) {
      res.status(200).send({
        exists: true,
        blacklisted: doc.data().categories.includes("blacklist"),
        categories: doc.data().categories,
      });
      //http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=microsoft&region=1&lang=en&callback=YAHOO.Finance.SymbolSuggest.ssCallback
    } else {
        
      res.status(200).send({
        exists: false,
      });
    }
  } catch (error) {
    console.log("ERRORRORO");
    console.log(error)
      return res.status(400).send("SMH KEN OHMAH GAWD")
  }
});
exports.checkLocalBusinessV2 = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  let name = req.path.replace("/", "").trim();
  name = 'facebook';
  let nameData = await superagent
    .get(
      "http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=$name&region=1&lang=en&callback=YAHOO.Finance.SymbolSuggest.ssCallback"
    )
    .then((responseYahoo) => res.send(responseYahoo.body));
        console.log(nameData);
});

exports.checkLocalBusiness = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  let name = req.body.name;
  return res.status(200).send(!restaurants.includes(name));
});

const restaurants = [
  "McDonald's",
  "Starbucks",
  "Chick-fil-A",
  "Taco Bell",
  "Burger King",
  "Subway",
  "Wendy's",
  "Dunkin'",
  "Domino's",
  "Panera Bread",
  "Pizza Hut",
  "Chipotle Mexican Grill",
  "Sonic Drive-In",
  "KFC",
  "Olive Garden",
  "Applebee's",
  "Panda Express",
  "Arby's",
  "Popeyes Louisiana Kitchen",
  "Little Caesars",
  "Dairy Queen",
  "Buffalo Wild Wings",
  "Chili's Grill & Bar",
  "Jack in the Box",
  "IHOP",
  "RankChain",
  "Texas Roadhouse",
  "Denny's",
  "Papa John's",
  "Outback Steakhouse",
  "Whataburger",
  "Red Lobster",
  "Cracker Barrel",
  "The Cheesecake Factory",
  "Jimmy John's Gourmet Sandwiches",
  "Hardee's",
  "Zaxby's",
  "LongHorn Steakhouse",
  "Culver's",
  "Golden Corral",
  "Five Guys Burgers and Fries",
  "Red Robin Gourmet Burgers and Brews",
  "Raising Cane's Chicken Fingers",
  "Carl's Jr.",
  "Wingstop",
  "Waffle House",
  "Jersey Mike's Subs",
  "Bojangles'",
  "BJ's Restaurant & Brewhouse",
  "TGI Fridays",
  "In-N-Out Burger",
  "Steak 'n Shake",
  "P.F. Chang's",
  "Qdoba Mexican Eats",
  "El Pollo Loco",
  "Krispy Kreme",
  "Hooters",
  "Del Taco",
  "Firehouse Subs",
  "Bob Evans",
  "Moe's Southwest Grill",
  "Papa Murphy's Pizza",
  "Ruby Tuesday",
  "McAlister's Deli",
  "Cheddar's Scratch Kitchen",
  "Church's Chicken",
  "Tim Hortons",
  "Ruth's Chris Steak House",
  "Carrabba's Italian Grill",
  "Jason's Deli",
  "Marco's Pizza",
  "Shake Shack",
  "California Pizza Kitchen",
  "Baskin-Robbins",
  "Yard House",
  "Bonefish Grill",
  "Rank",
  "Chain",
  "White Castle",
  "Tropical Smoothie Cafe",
  "Dave & Buster's",
  "Dutch Bros. Coffee",
  "Captain D's Seafood Kitchen",
  "Auntie Anne's",
  "First Watch",
  "Perkins Restaurant & Bakery",
  "Freddy's Frozen Custard & Steakburgers",
  "Checkers Drive-In Restaurants",
  "",
  "Noodles & Company",
  "",
  "Einstein Bros. Bagels",
  "Jamba",
  "Portillo's",
  "Boston Market",
  "The Habit Burger Grill",
  "Logan's Roadhouse",
  "MOD Pizza",
  "Smoothie King",
  "Mellow Mushroom",
  "The Capital Grille",
  "Round Table Pizza",
  "Miller's Ale House",
  "Potbelly sandwich Shop",
  "Hungry Howie's Pizza",
  "Charleys Philly Steaks",
  "Chuy's",
  "O'Charley's",
  "Pollo Tropical",
  "Maggiano's Little Italy",
  "Cicis",
  "Long John Silver's",
  "Saltgrass Steak House",
  "Chuck E. Cheese's",
  "Taco John's",
  "Texas de Brazil Churrascaria",
  "Cold Stone Creamery",
  "Blaze Pizza",
  "Peet's Coffee",
  "Dickey's Barbecue Pit",
  "Zoes Kitchen",
  "Corner Bakery_Cafe",
  "Krystal Co.",
  "Benihana",
  "Cooper's Hawk Winery & Restaurants",
  "Big Boy/Frisch's Big Boy",
  "Black Bear Diner",
  "Twin Peaks",
  "Schlotzsky's",
  "Jet's Pizza",
  "Chain",
  "Famous Dave's",
  "On The Border Mexican Grill & Cantina",
  "Fogo de Chao",
  "Ninety Nine Restaurants",
  "Village Inn",
  "Taco Cabana",
  "Fleming's Prime Steakhouse & Wine Bar",
  "Caribou Coffee",
  "Jack's",
  "Au Bon Pain",
  "Bar Louie",
  "Sarku Japan",
  "Old Chicago Pizza & Taproom",
  "Rally's Hamburgers",
  "Torchy's Tacos",
  "Pizza Ranch",
  "Pappadeaux Seafood Kitchen",
  "Braum's Ice Cream & Dairy Stores",
  "Pei Wei Asian Diner",
  "Cafe Rio Mexican Grill",
  "Morton's The Steakhouse",
  "Smashburger",
  "Wienerschnitzel",
  "Sizzler",
  "Seasons",
];
