//https://www.etsy.com/featured/blackownedshops
import 'package:http/http.dart';
import 'package:html/dom.dart' as dom;
import 'package:html/parser.dart';
import 'shop.dart';

Future<List<Shop>> estyBLM() async {
  int counter = 0;
  List<Shop> shops = [];
  print("Calling https://www.etsy.com/featured/blackownedshops");
  var globalResponse =
      await get('https://www.etsy.com/featured/blackownedshops');
  var globalDoc = parse(globalResponse.body);
  var content = globalDoc.getElementById('content');
  var shopsContainer = content.children.last;
  var shopsList = shopsContainer.children.first.children;
  print("Compiling shops");
  for (var shop in shopsList) {
    if (shop.children.isNotEmpty) {
      for (var shopData in shop.children) {
        for (var shop in shopData.children) {
          if (shop.attributes.containsKey('href')) {
            if (shop.attributes['href']
                .startsWith("https://www.etsy.com/listing/")) {
              print("Getting shop "+shop.attributes['href']);
              var listingResponse = await get(shop.attributes['href']);
              var globalDoc = parse(listingResponse.body);
              var rightColumn =
                  globalDoc.getElementById("listing-right-column");
              var links = rightColumn
                  .getElementsByClassName("wt-text-link-no-underline");
              var userLinkData = links.first;
              var username = userLinkData.text.trim();
              var href = userLinkData.attributes['href'];
              shops.add(
                Shop(
                  url: href,
                  name: username,
                  site: "etsy.com",
                  categories: [
                    'BLM',
                  ],
                ),
              );
            }
          }
          //print(shop.attributes['href']);
        }
      }
    }
  }
  return shops;
}
