function teste(e) {
    var rego, argo
    argo = 0
    const ra = /(paste|simple|fine|lavish)/
    if (e?.target?.attributes?.["data-reggie"]?.value && e.target.value) {
      rego = new RegExp(e.target.attributes["data-reggie"].value, "g")
      e.target.value.matchAll(rego).forEach(e => argo += Number(eval(e[0].replace(ra, `* ${sr.get(e[3])}`))))
      console.log(argo)
    } else {
      console.log(e)
    }
  }

  
function add() {
  let food, diet
  food = foodin.value ? Number(foodin.value) : undefined
  diet = dietin.selectedIndex > 0 ? dietin.options[dietin.selectedIndex].value : undefined
  if (food && diet) {
    mans.push({ 'food': food, 'diet': diet })
    mansspan.innerHTML += `<span data-food="${food}" data-diet="${diet}">(${food} ${diet} <input type="button" class="dupebutton" value="+"/><input type="button" class="delbutton" value="x"/>)</span>`
  }
}

function del(a) {
  mans.splice(mans.findIndex((e) => e.food == a.dataset.food && e.diet == a.dataset.diet), 1)
  a.remove()
}

function dupe(a) {
  mans.push({ 'food': Number(a.dataset.food), 'diet': a.dataset.diet })
  a.after(a.cloneNode(true))
}