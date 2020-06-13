import 'dart:convert';

import 'etsyBLM.dart';

void extractData()async{
  var etsyBLM = (await estyBLM());
  print(etsyBLM.length);
  print(jsonEncode(etsyBLM.map((e) => e.toJSON()).toList()));
}