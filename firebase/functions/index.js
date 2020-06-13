const functions = require("firebase-functions");
const admin = require("firebase-admin");

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

  admin.firestore().collection("shops").doc(url).set({
    name: name,
    //url: url,
    site: site,
    categories: categories,
  });
  res.status(200).send("success")
});

exports.checkBusiness = functions.https.onRequest(async(req, res)=> {
    res.set('Access-Control-Allow-Origin', '*');
    let url = req.body.url;
    url = url.replace("https://", "");
    let doc = await admin.firestore().collection("shops").doc(url).get();
    
    if(doc.exists){
        res.status(200).send({
            "exists":true,
            "blacklisted": doc.data().categories.includes("blacklist"),
            "categories": doc.data().categories
        });
    }else{
        res.status(200).send({
            exists:false
        })
    }
});