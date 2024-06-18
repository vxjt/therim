/*
todo
date generator
do stamps
pick font
watchdog
*/

const letter = document.querySelector('#letter')
const namein = document.querySelector(`#nameinput`)
const periodin = document.querySelector('#periodinput')
const phin = document.querySelector('#phiinput')
const devilstrandin = document.querySelector('#devilstrandtoggle')
const hydroin = document.querySelector('#hydrotoggle')

const body = document.querySelector(`body`)
const toggles = document.querySelectorAll('.toggleclick')
const stamp = document.querySelector(`.stamp`)
const calcbutton = document.querySelector('#calcbutton')

const sr = new Map([
  ["paste", 6.667],
  ["simple", 11.111],
  ["fine", 16.667],
  ["lavish", 25]
])

const empirenames = {
  main: ["The 1 of 2",
    "The Exodus 1",
    "The Refugee 1",
    "The Broken 1",
    "The Shattered 1",
    "The Fallen 1",
    "The 3 1"],
  1: ["Empire",
    "Commonwealth",
    "Imperium",
    "Dominion",
    "Sovereignty"],
  2: ["the Sun",
    "the Moon",
    "the Universe",
    "God",
    "Perfection",
    "Eternity",
    "the Spirit"],
  3: ["Red",
    "Blue",
    "Green",
    "Purple",
    "Black",
    "White",
    "Gray",
    "Orange"]
}

const nonames = ["Jimbo, I'm assuming", "Lord of Mystery", "Lady of Mystery", "Mysterious Stranger", "???", "Colonist", "Sire", "John Rimworld", "Masked Stranger",
  "Man in Black"]

toggles.forEach((e) => e.addEventListener(`click`, toggle))
calcbutton.addEventListener(`click`, precalc)
body.addEventListener(`keydown`, precalc)

function precalc(e) {
  if ((e.key == `Enter` && e.target != calcbutton) || e.type == `click` && e.srcElement == calcbutton) {
    calc()
  }
}

function calc() {
  const ra = /(paste|simple|fine|lavish)/

  const cornyield = 1.48
  const riceyield = 1.52
  const ricehydro = 3.03
  const cornp = 20.86 * 2 / 60

  const smokedaily = 4
  const smokeyield = 0.91
  const smokehydro = 1.82
  const smokep = 13.85 * 2 / 60

  const psydaily = 4
  const psyyield = 0.56
  const psyhydro = 0.83
  const psyp = 16.62 * 2 / 60

  const hopdaily = 2 * 5
  const hopyield = 1.11
  const hophydro = 1.96
  const hopp = 9.23 * 2 / 60

  const healdaily = 1 / 3
  const healyield = 0.11
  const healhydro = 0.22

  const cocodaily = 1
  const cocoyield = 0.81
  const cocop = 29.54 / 60

  const fdaily = 1

  const cottonyield = 0.95
  const cottonhydro = 1.9

  const devilyield = 0.2
  const devilp = 41.54 / 60

  var rego, foods, period, phi, devilres, hydrores, mans, a, rice, cotton, power, cotton, name, jbc, closing, empire, recs, devil, wd

  devil = a = foods = mans = power = wd = 0

  letter.innerHTML = recs = ""

  //replaces the diet types with their coefficients then multiplies it, summing the values of every instance, and sums the number of mans

  if (stamp.attributes["data-reggie"].value && stamp.value) {
    rego = new RegExp(stamp.attributes["data-reggie"].value, "g")
    stamp.value.matchAll(rego).forEach(e => {
      foods += Number(eval(e[0].replace(ra, `* ${sr.get(e[3])}`)))
      mans += e[1] ? Number(e[1].match(/\d+/)) : 1
    })
  }

  period = periodin.value && 0 < Number(periodin.value) && Number(periodin.value) < 61 ? Number(periodin.value) / 60 : undefined
  devilres = devilstrandin.attributes["data-state"].value == "true" ? true : false
  hydrores = hydroin.attributes["data-state"].value == "true" ? true : false
  phi = phin.value ? Number(phin.value) : undefined

  /*food*/
  if (period > cornp && !hydrores) {
    recs += `<span class="colorc">❧</span> Corn, ${Math.ceil(phi * (foods / cornyield / period))} acres <br>`
  } else if (!hydrores) {
    recs += `<span class="colorc">❧</span> Rice, ${Math.ceil(phi * (foods / riceyield / period))} acres <br>`
  } else if (hydrores) {
    rice = foods
  }

  /*smokeleaf */
  if (period > smokep && !hydrores) {
    recs += `<span class="colorc">❧</span> Smokeleaf, ${Math.ceil(phi * ((mans * smokedaily) / smokeyield / period))} acres <br>`
  } else if (hydrores) {
    a = Math.ceil(phi * ((mans * smokedaily) / smokehydro))
    a = a - (a % 4 - 4) * Math.ceil((a % 4) / 4)
    power += a
    recs += `<span class="colorc">❧</span> Smokeleaf, ${a} acres <br>`
  }

  /*psychoid */
  if (period > psyp && !hydrores) {
    recs += `<span class="colorc">❧</span> Psychoid, ${Math.ceil(phi * ((mans * psydaily) / psyyield / period))} acres <br>`
  } else if (hydrores) {
    a = Math.ceil(phi * ((mans * psydaily) / psyhydro))
    a = a - (a % 4 - 4) * Math.ceil((a % 4) / 4)
    power += a
    recs += `<span class="colorc">❧</span> Psychoid, ${a} acres <br>`
  }

  /*hops*/
  if (period > hopp && !hydrores) {
    recs += `<span class="colorc">❧</span> Hops, ${Math.ceil(phi * ((mans * hopdaily) / hopyield / period))} acres <br>`
  } else if (hydrores) {
    a = Math.ceil(phi * ((mans * hopdaily) / hophydro))
    a = a - (a % 4 - 4) * Math.ceil((a % 4) / 4)
    power += a
    recs += `<span class="colorc">❧</span> Hops, ${a} acres <br>`
  }

  /*healroot*/
  if (!hydrores) {
    recs += `<span class="colorc">❧</span> Healroot, ${Math.ceil(phi * ((mans * healdaily) / healyield / period))} acres <br>`
  } else if (hydrores) {
    a = Math.ceil(phi * ((mans * healdaily) / healhydro))
    a = a - (a % 4 - 4) * Math.ceil((a % 4) / 4)
    power += a
    recs += `<span class="colorc">❧</span> Healroot, ${a} acres <br>`
  }

  /*chocolate*/
  if (period > cocop) {
    recs += `<span class="colorc">❧</span> Chocolate, ${Math.ceil(phi * ((mans * cocodaily) / cocoyield / period)) * 4} acres <br>`
  }

  /*cotton*/
  /*cotton from medicine*/
  if (!hydrores) {
    cotton = (mans * healdaily * 3) / cottonyield / period
  } else if (hydrores) {
    cotton = (mans * healdaily * 3) / cottonhydro
  }

  /*fabric*/

  if (devilres && hydrores) {
    /*just uses lights*/
    a = Math.ceil(phi * ((mans * fdaily) / devilyield))
    devil = a
    recs += `<span class="colorc">❧</span> Devil's Strand, ${a} acres <br>`
  } else if (devilres && !hydrores && period > devilp) {
    recs += `<span class="colorc">❧</span> Devil's Strand ${Math.ceil(phi * ((mans * fdaily) / devilyield / period))} acres <br>`
  } else if (!devilres && hydrores) {
    cotton += (mans * fdaily) / cottonhydro
  } else if (!devilres && !hydrores) {
    cotton += (mans * fdaily) / cottonyield / period
  }

  a = Math.ceil(phi * cotton)
  
  if (hydrores) {
    a = a - (a % 4 - 4) * Math.ceil((a % 4) / 4)
    power += a
  }

  recs += `<span class="colorc">❧</span> Cotton, ${a} acres <br>`

  /*power*/
  /*rice not divided by yield for tiles because rice/tiles would be exact while the rest of power is already rounded.*/
  /*devil is number of tiles needed without hydro*/

  if (hydrores) {
    let irice = Math.ceil(phi * (rice / ricehydro))
    irice = irice - (irice % 4 - 4) * Math.ceil((irice % 4) / 4)
    let itiles = irice + power
    //itiles = initial tiles, food added to power.
    let ihydros = Math.ceil(itiles / 4) //dont need ceil?
    let ilights = Math.ceil((itiles + devil) / 96)
    let ipower = ihydros * 70 + ilights * 2069
    let igens = Math.ceil(ipower / 1000)
    let lastgens, ntiles, nhydros, nlights, npower, ngens, nrice
    lastgens = igens
    ngens = 0
    while (lastgens != ngens) {
      lastgens = ngens
      nrice = Math.ceil(phi * ((lastgens * 9 + rice) / ricehydro))
      nrice = nrice - (nrice % 4 - 4) * Math.ceil((nrice % 4) / 4)
      ntiles = nrice + power
      nhydros = Math.ceil(ntiles / 4) //dont need ceil?
      nlights = Math.ceil((ntiles + devil) / 96)
      npower = nhydros * 70 + nlights * 2069
      ngens = Math.ceil(npower / 1000)
    }
    nrice = Math.ceil(phi * ((ngens * 9 + rice) / ricehydro))
    nrice = nrice - (nrice % 4 - 4) * Math.ceil((nrice % 4) / 4)
    recs += `<span class="colorc">❧</span> Rice, ${nrice} acres`
    wd = npower
  }

  /*if hydrores, calc power apply to rice
  rice = foods*/

  /*letter*/

  empire = empiregen(empirenames)

  if (namein.value) {
    name = namein.value
  } else {
    jbc = Math.floor(Math.random() * nonames.length)
    name = nonames[jbc]
  }

  if (jbc != 0 && Math.random() < 0.1) {
    closing = `Jimbo, A Most Royal Scribe`
  } else {
    closing = empire
  }

  letter.innerHTML = `
  <p class="mid">${empire}</p>
  <p>Dear ${name},</p>
  <p>Thank you for your correspondence.  We have reviewed your situation and provide the following guidance:</p>
  <p class="split">${recs}</p>`

  letter.innerHTML += hydrores ? `
  <p>Additionally, based on your report the following information may be useful:</p>
  <p class="split"><span class="colorc">❧</span> Power consumption, <span id="power">${wd}</span> Wd</p>` : ``

  letter.innerHTML += `<p class="end">Yours truly, <br> ${closing}</p>`
}

/*expects e.target*/

function toggle(e) {
  const nlreg = /\n/g
  const dsreg = /\s{2,}/g
  const spanreg = />\w*/g
  const altreg = /<span class="colorc"(>\w*)<\/span>/g
  var a, t

  if (e?.target?.attributes?.["data-alt"]?.value) {
    a = e.target
  } else if (e?.target?.parentElement?.attributes["data-alt"]?.value) {
    a = e.target.parentElement
  }

  t = a.innerHTML.replaceAll(nlreg, ``).replaceAll(dsreg, ` `).trim().replaceAll(altreg, "$1")

  a.innerHTML = a.attributes["data-alt"].value.replaceAll(nlreg, ``).replaceAll(dsreg, ` `).replaceAll(spanreg, "<span class=\"colorc\"$&</span>")
  a.attributes["data-alt"].value = t
  a.attributes["data-state"].value = a.attributes["data-state"].value == "true" ? "false" : "true"
}

function empiregen(a) {
  return a.main[Math.floor(Math.random() * a.main.length)].replaceAll(/\d/g, e => {
    return a[e][Math.floor(Math.random() * a[e].length)]
  })
}
