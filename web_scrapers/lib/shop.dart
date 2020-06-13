class Shop {
  final String name;
  final String url;
  final List<String> categories;
  final String site;
  Shop({
    this.name,
    this.url,
    this.categories,
    this.site
  });
  Map toJSON(){
    return {
      'name': this.name,
      'url': this.url,
      'site': this.site,
      'categories':this.categories,
    };
  }
}
