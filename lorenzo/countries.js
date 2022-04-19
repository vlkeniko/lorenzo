fetch("https://gist.githubusercontent.com/keeguon/2310008/raw/bdc2ce1c1e3f28f9cab5b4393c7549f38361be4e/countries.json")
  .then(function (data) {
    return data.json();
  })

  .then(function (post) {
    const datalist = document.getElementById("countries");
    const countries = post;

    for (name of countries) {
      datalist.insertAdjacentHTML(
        "beforeend",
        `<option>${name}</option>`
      );
    }
  });