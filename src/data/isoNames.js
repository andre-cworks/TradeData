export const isoNames = {
  USA:"United States", CHN:"China", DEU:"Germany", JPN:"Japan", GBR:"United Kingdom",
  FRA:"France", NLD:"Netherlands", KOR:"South Korea", ITA:"Italy", CAN:"Canada",
  BEL:"Belgium", MEX:"Mexico", RUS:"Russia", SAU:"Saudi Arabia", SGP:"Singapore",
  IND:"India", AUS:"Australia", ESP:"Spain", BRA:"Brazil", THA:"Thailand",
  TWN:"Taiwan", CHE:"Switzerland", POL:"Poland", SWE:"Sweden", ZAF:"South Africa",
  NGA:"Nigeria", EGY:"Egypt", ARG:"Argentina", IDN:"Indonesia", NOR:"Norway",
  TUR:"Turkey", IRN:"Iran", ARE:"United Arab Emirates", MYS:"Malaysia",
  VNM:"Vietnam", PHL:"Philippines", CHL:"Chile", COL:"Colombia", PER:"Peru",
  PAK:"Pakistan", BGD:"Bangladesh",
};

export const nameToISO = Object.fromEntries(
  Object.entries(isoNames).map(([iso, name]) => [name, iso])
);

export const aliases = {
  "United States of America": "USA",
  "South Korea": "KOR",
  "Russia": "RUS",
  "Iran": "IRN",
  "Taiwan": "TWN",
  "United Arab Emirates": "ARE",
  "Vietnam": "VNM",
  "Bolivia": "BOL",
  "Venezuela": "VEN",
  "Tanzania": "TZA",
  "United Republic of Tanzania": "TZA",
  "Democratic Republic of the Congo": "COD",
  "Republic of the Congo": "COG",
  "Ivory Coast": "CIV",
  "Côte d'Ivoire": "CIV",
  "South Sudan": "SSD",
  "Somaliland": "SOM",
  "Kosovo": "XKX",
};

export function getISO(name) {
  if (aliases[name]) return aliases[name];
  return nameToISO[name] || null;
}

export function getIdToName() {
  return {
    4:"Afghanistan", 8:"Albania", 12:"Algeria", 24:"Angola", 32:"Argentina",
    36:"Australia", 40:"Austria", 50:"Bangladesh", 56:"Belgium", 68:"Bolivia",
    76:"Brazil", 100:"Bulgaria", 116:"Cambodia", 120:"Cameroon", 124:"Canada",
    152:"Chile", 156:"China", 170:"Colombia", 180:"Dem. Rep. Congo",
    178:"Congo", 188:"Costa Rica", 191:"Croatia", 192:"Cuba", 196:"Cyprus",
    203:"Czechia", 208:"Denmark", 218:"Ecuador", 818:"Egypt",
    231:"Ethiopia", 246:"Finland", 250:"France", 276:"Germany", 288:"Ghana",
    300:"Greece", 320:"Guatemala", 332:"Haiti", 340:"Honduras",
    348:"Hungary", 356:"India", 360:"Indonesia", 364:"Iran", 368:"Iraq",
    372:"Ireland", 376:"Israel", 380:"Italy", 388:"Jamaica", 392:"Japan",
    400:"Jordan", 398:"Kazakhstan", 404:"Kenya", 408:"North Korea",
    410:"South Korea", 414:"Kuwait", 418:"Laos", 422:"Lebanon",
    484:"Mexico", 504:"Morocco", 508:"Mozambique", 516:"Namibia",
    524:"Nepal", 528:"Netherlands", 554:"New Zealand", 566:"Nigeria",
    578:"Norway", 586:"Pakistan", 591:"Panama", 598:"Papua New Guinea",
    600:"Paraguay", 604:"Peru", 608:"Philippines", 616:"Poland",
    620:"Portugal", 634:"Qatar", 642:"Romania",
    643:"Russia", 682:"Saudi Arabia", 686:"Senegal", 710:"South Africa",
    716:"Zimbabwe", 724:"Spain", 144:"Sri Lanka", 729:"Sudan", 752:"Sweden",
    756:"Switzerland", 760:"Syria", 764:"Thailand", 788:"Tunisia",
    792:"Turkey", 800:"Uganda", 804:"Ukraine", 784:"United Arab Emirates",
    826:"United Kingdom", 840:"United States of America",
    858:"Uruguay", 860:"Uzbekistan", 862:"Venezuela", 704:"Vietnam",
    887:"Yemen", 894:"Zambia", 440:"Lithuania", 428:"Latvia", 233:"Estonia",
    705:"Slovenia", 442:"Luxembourg", 352:"Iceland", 158:"Taiwan",
  };
}
