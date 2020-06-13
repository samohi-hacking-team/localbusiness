import 'dart:convert';

import 'package:http/http.dart';

import 'etsyBLM.dart';

void extractData() async {
  var etsyBLM = (await estyBLM());
  print(etsyBLM.length);
  print(jsonEncode(etsyBLM.map((e) {
    return e.toJSON();
  }).toList()));
  for (var x in etsyBLM) {
    await post(
      "https://us-central1-local-businesss.cloudfunctions.net/addToFirestore",
      body: {
        "name": x.name,
        'url': x.url.replaceFirst("https://", ""),
        'site': x.site,
        'categories': x.categories.toString(),
      },
    ).then((value) => print(value.body));
  }
}
