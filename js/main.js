var app = new Vue({
  el: "#app",
  data: {
    estadisticas: {
      democratas: [],
      republicanos: [],
      independentistas: [],
      cantDem: 0,
      cantRep: 0,
      cantInd: 0,
      votoPorDem: 0,
      votoPorRep: 0,
      votoPorInd: 0,
      totalsenadores: 0,
      totalPorcen: 0,
      menosleales: [],
      masleales: [],
      masatten: [],
      menosatten: []
    }
  }
});
if (page == "senate") {
  var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
}
if (page == "house") {
  var url = "https://api.propublica.org/congress/v1/113/house/members.json";
}

fetch(url, {
  headers: {
    "X-API-Key": "4176hl4Gxx2UkE27V2QLwqLmtK2vxaYPdXG71FG5"
  }
})
  .then(Response => Response.json())
  .then(datos => {
    var todoJson = datos.results[0].members;
    console.log(todoJson);
    app.estadisticas.democratas = getparty(todoJson, "D");
    app.estadisticas.republicanos = getparty(todoJson, "R");
    app.estadisticas.independentistas = getparty(todoJson, "I");
    app.estadisticas.cantDem = app.estadisticas.democratas.length;
    app.estadisticas.cantRep = app.estadisticas.republicanos.length;
    app.estadisticas.cantInd = app.estadisticas.independentistas.length;
    app.estadisticas.totalsenadores =
      app.estadisticas.cantDem + app.estadisticas.cantRep + app.estadisticas.cantInd;
    app.estadisticas.votoPorDem = parseFloat(porcentajepartido(app.estadisticas.democratas).toFixed(2));
    app.estadisticas.votoPorRep = parseFloat(porcentajepartido(app.estadisticas.republicanos).toFixed(2));
    app.estadisticas.votoPorInd = parseFloat(porcentajepartido(app.estadisticas.independentistas).toFixed(2));

    app.estadisticas.votoPorInd = esnulo(app.estadisticas.votoPorInd);
    app.estadisticas.totalPorcen = totalporcentajes(
      app.estadisticas.votoPorDem,
      app.estadisticas.votoPorRep,
      app.estadisticas.votoPorInd
    );
    var orden, porcents, porcentaje;
    orden = sortJSON(todoJson, "votes_with_party_pct", "asc");
    porcents = porcent10(orden);
    app.estadisticas.menosleales = porcents;
    orden = sortJSON(todoJson, "votes_with_party_pct", "desc");
    porcents = porcent10(orden);
    app.estadisticas.masleales = porcents;

    orden = sortJSON(todoJson, "missed_votes_pct", "desc");
    porcents = porcent10(orden);
    app.estadisticas.menosatten = porcents;
    orden = sortJSON(todoJson, "missed_votes_pct", "asc");
    porcentaje = porcent10(orden);
    app.estadisticas.masatten = porcentaje;
  });

// // OBTENER CANTIDADES DE PARTIDO
function getparty(array, party) {
  var senador = array.filter(senador => {
    if (senador.party == party) {
      return senador;
    }
  });
  return senador;
}

function porcentajepartido(partido) {
  var porcent = 0;
  for (let i = 0; i < partido.length; i++) {
    if (partido[i].votes_with_party_pct) {
      porcent += partido[i].votes_with_party_pct || 0;
    }
  }
  return porcent / partido.length;
}
function esnulo(v) {
  if (isNaN(v)) {
    return 0;
  } else {
    return v;
  }
}
function totalporcentajes(democratas, republicanos, independentistas) {
  var total = 0;
  if (independentistas == 0) {
    total = ((democratas + republicanos) / 2).toFixed(2);
  } else {
    total = ((democratas + republicanos + independentistas) / 3).toFixed(2);
  }
  return total;
}

// ORDENAR
function sortJSON(array, key, orden) {
  return array.sort(function(a, b) {
    var x = a[key],
      y = b[key];
    if (orden === "asc") {
      return x < y ? -1 : x > y ? 1 : 0;
    }
    if (orden === "desc") {
      return x > y ? -1 : x < y ? 1 : 0;
    }
  });
}

function porcent10(array) {
  var nums = [];
  var porcent = (array.length * 10) / 100;
  Math.trunc(porcent);
  for (var i = 0; i <= porcent - 1; i++) {
    nums[i] = array[i];
  }
  return nums;
}
