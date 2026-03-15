// Top export/import categories in billions USD (approximate, WTO data)
export const goodsData = {
  "USA": {
    exports: [{ n:"Energy & Fuels",v:350 },{ n:"Chemicals & Pharma",v:280 },{ n:"Machinery",v:250 },{ n:"Food & Agriculture",v:200 },{ n:"Vehicles",v:190 },{ n:"Electronics",v:180 },{ n:"Aircraft",v:120 }],
    imports: [{ n:"Electronics",v:500 },{ n:"Vehicles",v:350 },{ n:"Machinery",v:280 },{ n:"Chemicals & Pharma",v:220 },{ n:"Energy & Fuels",v:180 },{ n:"Pharmaceuticals",v:160 },{ n:"Apparel & Textiles",v:100 }],
  },
  "CHN": {
    exports: [{ n:"Electronics",v:950 },{ n:"Machinery",v:650 },{ n:"Textiles & Apparel",v:320 },{ n:"Metals & Steel",v:180 },{ n:"Vehicles",v:150 },{ n:"Chemicals",v:130 }],
    imports: [{ n:"Electronics",v:450 },{ n:"Energy & Fuels",v:430 },{ n:"Machinery",v:350 },{ n:"Iron Ore & Metals",v:200 },{ n:"Food & Agriculture",v:170 },{ n:"Chemicals",v:160 }],
  },
  "DEU": {
    exports: [{ n:"Vehicles",v:300 },{ n:"Machinery",v:280 },{ n:"Chemicals & Pharma",v:220 },{ n:"Electronics",v:160 },{ n:"Pharmaceuticals",v:120 },{ n:"Food & Beverages",v:80 }],
    imports: [{ n:"Energy & Fuels",v:200 },{ n:"Electronics",v:150 },{ n:"Vehicles",v:150 },{ n:"Machinery",v:120 },{ n:"Chemicals",v:100 },{ n:"Food & Agriculture",v:90 }],
  },
  "JPN": {
    exports: [{ n:"Vehicles",v:200 },{ n:"Machinery",v:180 },{ n:"Electronics",v:150 },{ n:"Chemicals",v:80 },{ n:"Steel & Metals",v:60 },{ n:"Ships",v:50 }],
    imports: [{ n:"Energy & LNG",v:250 },{ n:"Electronics",v:120 },{ n:"Machinery",v:100 },{ n:"Food & Agriculture",v:80 },{ n:"Chemicals",v:70 },{ n:"Metals",v:60 }],
  },
  "GBR": {
    exports: [{ n:"Machinery",v:100 },{ n:"Chemicals & Pharma",v:90 },{ n:"Vehicles",v:80 },{ n:"Pharmaceuticals",v:75 },{ n:"Electronics",v:70 },{ n:"Food & Beverages",v:50 }],
    imports: [{ n:"Electronics",v:120 },{ n:"Machinery",v:100 },{ n:"Vehicles",v:90 },{ n:"Energy & Fuels",v:80 },{ n:"Chemicals & Pharma",v:75 },{ n:"Food & Agriculture",v:70 }],
  },
  "FRA": {
    exports: [{ n:"Aircraft",v:80 },{ n:"Vehicles",v:75 },{ n:"Machinery",v:70 },{ n:"Chemicals & Pharma",v:65 },{ n:"Pharmaceuticals",v:60 },{ n:"Food & Wine",v:55 }],
    imports: [{ n:"Energy & Fuels",v:120 },{ n:"Electronics",v:100 },{ n:"Machinery",v:85 },{ n:"Vehicles",v:80 },{ n:"Chemicals",v:65 },{ n:"Food & Agriculture",v:55 }],
  },
  "NLD": {
    exports: [{ n:"Machinery",v:150 },{ n:"Chemicals & Pharma",v:130 },{ n:"Electronics",v:120 },{ n:"Food & Agriculture",v:100 },{ n:"Energy & Fuels",v:90 },{ n:"Pharmaceuticals",v:80 }],
    imports: [{ n:"Energy & Fuels",v:160 },{ n:"Electronics",v:130 },{ n:"Machinery",v:120 },{ n:"Chemicals",v:100 },{ n:"Food & Agriculture",v:80 },{ n:"Vehicles",v:70 }],
  },
  "KOR": {
    exports: [{ n:"Electronics",v:200 },{ n:"Machinery",v:120 },{ n:"Vehicles",v:80 },{ n:"Chemicals",v:60 },{ n:"Ships",v:50 },{ n:"Steel & Metals",v:40 }],
    imports: [{ n:"Energy & Fuels",v:130 },{ n:"Electronics",v:100 },{ n:"Machinery",v:90 },{ n:"Chemicals",v:70 },{ n:"Food & Agriculture",v:50 },{ n:"Metals",v:40 }],
  },
  "ITA": {
    exports: [{ n:"Machinery",v:130 },{ n:"Vehicles",v:80 },{ n:"Food & Beverages",v:70 },{ n:"Chemicals & Pharma",v:60 },{ n:"Electronics",v:50 },{ n:"Fashion & Apparel",v:45 }],
    imports: [{ n:"Energy & Fuels",v:120 },{ n:"Machinery",v:80 },{ n:"Vehicles",v:70 },{ n:"Electronics",v:60 },{ n:"Chemicals",v:50 },{ n:"Food & Agriculture",v:40 }],
  },
  "CAN": {
    exports: [{ n:"Energy & Fuels",v:180 },{ n:"Vehicles",v:80 },{ n:"Metals & Minerals",v:70 },{ n:"Food & Agriculture",v:60 },{ n:"Machinery",v:55 },{ n:"Chemicals",v:45 }],
    imports: [{ n:"Vehicles",v:100 },{ n:"Electronics",v:90 },{ n:"Machinery",v:80 },{ n:"Energy & Fuels",v:60 },{ n:"Chemicals",v:55 },{ n:"Food & Agriculture",v:50 }],
  },
  "BEL": {
    exports: [{ n:"Chemicals & Pharma",v:120 },{ n:"Machinery",v:90 },{ n:"Vehicles",v:70 },{ n:"Electronics",v:60 },{ n:"Food & Beverages",v:50 },{ n:"Pharmaceuticals",v:45 }],
    imports: [{ n:"Energy & Fuels",v:90 },{ n:"Chemicals",v:85 },{ n:"Machinery",v:80 },{ n:"Electronics",v:70 },{ n:"Vehicles",v:60 },{ n:"Food & Agriculture",v:50 }],
  },
  "MEX": {
    exports: [{ n:"Vehicles",v:130 },{ n:"Electronics",v:100 },{ n:"Machinery",v:90 },{ n:"Energy & Fuels",v:60 },{ n:"Food & Agriculture",v:55 },{ n:"Metals",v:45 }],
    imports: [{ n:"Electronics",v:120 },{ n:"Machinery",v:110 },{ n:"Vehicles",v:100 },{ n:"Chemicals",v:70 },{ n:"Energy & Fuels",v:60 },{ n:"Food & Agriculture",v:50 }],
  },
  "RUS": {
    exports: [{ n:"Energy & Oil",v:250 },{ n:"Natural Gas",v:50 },{ n:"Metals",v:60 },{ n:"Food & Grain",v:35 },{ n:"Chemicals",v:30 },{ n:"Machinery",v:25 }],
    imports: [{ n:"Machinery",v:55 },{ n:"Electronics",v:50 },{ n:"Vehicles",v:40 },{ n:"Chemicals",v:35 },{ n:"Food & Agriculture",v:30 },{ n:"Metals",v:25 }],
  },
  "SAU": {
    exports: [{ n:"Crude Oil",v:260 },{ n:"Refined Products",v:40 },{ n:"Chemicals",v:25 },{ n:"Plastics",v:20 },{ n:"Food",v:15 },{ n:"Metals",v:10 }],
    imports: [{ n:"Machinery",v:45 },{ n:"Vehicles",v:35 },{ n:"Electronics",v:30 },{ n:"Food & Agriculture",v:25 },{ n:"Chemicals",v:20 },{ n:"Metals",v:15 }],
  },
  "SGP": {
    exports: [{ n:"Electronics",v:180 },{ n:"Machinery",v:120 },{ n:"Chemicals & Pharma",v:80 },{ n:"Energy & Fuels",v:60 },{ n:"Pharmaceuticals",v:40 },{ n:"Food & Beverages",v:30 }],
    imports: [{ n:"Electronics",v:150 },{ n:"Machinery",v:110 },{ n:"Energy & Fuels",v:90 },{ n:"Chemicals",v:60 },{ n:"Food & Agriculture",v:40 },{ n:"Metals",v:30 }],
  },
  "IND": {
    exports: [{ n:"Food & Agriculture",v:50 },{ n:"Textiles & Apparel",v:45 },{ n:"Pharmaceuticals",v:30 },{ n:"Chemicals",v:28 },{ n:"Electronics",v:25 },{ n:"Machinery",v:22 }],
    imports: [{ n:"Energy & Fuels",v:200 },{ n:"Electronics",v:90 },{ n:"Machinery",v:80 },{ n:"Gold",v:60 },{ n:"Chemicals",v:55 },{ n:"Metals",v:50 }],
  },
  "AUS": {
    exports: [{ n:"Iron Ore",v:100 },{ n:"Coal",v:90 },{ n:"LNG",v:80 },{ n:"Food & Agriculture",v:40 },{ n:"Gold",v:30 },{ n:"Metals",v:25 }],
    imports: [{ n:"Machinery",v:60 },{ n:"Electronics",v:55 },{ n:"Vehicles",v:50 },{ n:"Energy & Fuels",v:30 },{ n:"Chemicals",v:30 },{ n:"Food & Beverages",v:25 }],
  },
  "ESP": {
    exports: [{ n:"Machinery",v:65 },{ n:"Vehicles",v:60 },{ n:"Food & Wine",v:55 },{ n:"Chemicals & Pharma",v:45 },{ n:"Electronics",v:40 },{ n:"Pharmaceuticals",v:35 }],
    imports: [{ n:"Energy & Fuels",v:100 },{ n:"Machinery",v:70 },{ n:"Vehicles",v:65 },{ n:"Electronics",v:60 },{ n:"Chemicals",v:50 },{ n:"Food & Agriculture",v:45 }],
  },
  "BRA": {
    exports: [{ n:"Food & Soybeans",v:100 },{ n:"Iron Ore",v:40 },{ n:"Energy & Fuels",v:35 },{ n:"Chemicals",v:30 },{ n:"Machinery",v:25 },{ n:"Vehicles",v:20 }],
    imports: [{ n:"Machinery",v:55 },{ n:"Electronics",v:45 },{ n:"Energy & Fuels",v:40 },{ n:"Chemicals",v:35 },{ n:"Vehicles",v:30 },{ n:"Food & Agriculture",v:25 }],
  },
  "THA": {
    exports: [{ n:"Electronics",v:80 },{ n:"Machinery",v:60 },{ n:"Vehicles",v:50 },{ n:"Food & Agriculture",v:35 },{ n:"Chemicals",v:25 },{ n:"Metals",v:20 }],
    imports: [{ n:"Electronics",v:70 },{ n:"Machinery",v:60 },{ n:"Energy & Fuels",v:55 },{ n:"Metals",v:35 },{ n:"Chemicals",v:30 },{ n:"Food & Agriculture",v:25 }],
  },
  "TWN": {
    exports: [{ n:"Electronics",v:280 },{ n:"Machinery",v:80 },{ n:"Chemicals",v:30 },{ n:"Metals",v:20 },{ n:"Plastics",v:15 },{ n:"Food & Beverages",v:10 }],
    imports: [{ n:"Electronics",v:120 },{ n:"Energy & Fuels",v:70 },{ n:"Machinery",v:60 },{ n:"Chemicals",v:40 },{ n:"Metals",v:35 },{ n:"Food & Agriculture",v:25 }],
  },
  "CHE": {
    exports: [{ n:"Pharmaceuticals",v:100 },{ n:"Chemicals",v:80 },{ n:"Machinery",v:70 },{ n:"Electronics",v:50 },{ n:"Watches & Jewels",v:30 },{ n:"Food & Beverages",v:25 }],
    imports: [{ n:"Machinery",v:65 },{ n:"Electronics",v:55 },{ n:"Pharmaceuticals",v:50 },{ n:"Energy & Fuels",v:45 },{ n:"Vehicles",v:40 },{ n:"Food & Agriculture",v:35 }],
  },
  "POL": {
    exports: [{ n:"Machinery",v:70 },{ n:"Electronics",v:60 },{ n:"Vehicles",v:55 },{ n:"Food & Agriculture",v:40 },{ n:"Chemicals",v:35 },{ n:"Metals",v:30 }],
    imports: [{ n:"Electronics",v:65 },{ n:"Machinery",v:60 },{ n:"Energy & Fuels",v:55 },{ n:"Vehicles",v:50 },{ n:"Chemicals",v:40 },{ n:"Food & Agriculture",v:30 }],
  },
  "SWE": {
    exports: [{ n:"Machinery",v:55 },{ n:"Vehicles",v:45 },{ n:"Electronics",v:35 },{ n:"Chemicals & Pharma",v:30 },{ n:"Food & Beverages",v:20 },{ n:"Metals",v:18 }],
    imports: [{ n:"Electronics",v:45 },{ n:"Machinery",v:40 },{ n:"Energy & Fuels",v:35 },{ n:"Vehicles",v:30 },{ n:"Chemicals",v:25 },{ n:"Food & Agriculture",v:20 }],
  },
  "ZAF": {
    exports: [{ n:"Gold & Precious",v:30 },{ n:"Minerals & Mining",v:25 },{ n:"Coal",v:20 },{ n:"Food & Agriculture",v:10 },{ n:"Chemicals",v:8 },{ n:"Machinery",v:6 }],
    imports: [{ n:"Machinery",v:25 },{ n:"Electronics",v:20 },{ n:"Energy & Fuels",v:15 },{ n:"Chemicals",v:12 },{ n:"Vehicles",v:10 },{ n:"Food & Agriculture",v:8 }],
  },
  "NGA": {
    exports: [{ n:"Crude Oil",v:45 },{ n:"Natural Gas",v:8 },{ n:"Food & Agriculture",v:3 },{ n:"Chemicals",v:2 },{ n:"Metals",v:2 },{ n:"Other",v:2 }],
    imports: [{ n:"Machinery",v:12 },{ n:"Electronics",v:10 },{ n:"Food & Agriculture",v:8 },{ n:"Chemicals",v:7 },{ n:"Vehicles",v:6 },{ n:"Energy & Fuels",v:5 }],
  },
  "EGY": {
    exports: [{ n:"Energy & Fuels",v:12 },{ n:"Food & Cotton",v:8 },{ n:"Chemicals",v:6 },{ n:"Metals",v:5 },{ n:"Textiles",v:4 },{ n:"Machinery",v:3 }],
    imports: [{ n:"Energy & Fuels",v:18 },{ n:"Food & Agriculture",v:14 },{ n:"Machinery",v:12 },{ n:"Electronics",v:10 },{ n:"Chemicals",v:8 },{ n:"Metals",v:7 }],
  },
  "ARG": {
    exports: [{ n:"Food & Soybeans",v:35 },{ n:"Energy & Fuels",v:10 },{ n:"Metals",v:8 },{ n:"Vehicles",v:6 },{ n:"Chemicals",v:5 },{ n:"Machinery",v:4 }],
    imports: [{ n:"Machinery",v:14 },{ n:"Electronics",v:10 },{ n:"Energy & Fuels",v:8 },{ n:"Chemicals",v:8 },{ n:"Vehicles",v:7 },{ n:"Food & Agriculture",v:5 }],
  },
  "IDN": {
    exports: [{ n:"Coal",v:40 },{ n:"Metals & Nickel",v:35 },{ n:"Palm Oil",v:28 },{ n:"Electronics",v:25 },{ n:"Machinery",v:20 },{ n:"LNG",v:15 }],
    imports: [{ n:"Machinery",v:45 },{ n:"Electronics",v:40 },{ n:"Energy & Fuels",v:35 },{ n:"Chemicals",v:25 },{ n:"Food & Agriculture",v:20 },{ n:"Metals",v:18 }],
  },
  "NOR": {
    exports: [{ n:"Crude Oil",v:170 },{ n:"Natural Gas",v:60 },{ n:"Machinery",v:20 },{ n:"Metals",v:15 },{ n:"Fish & Seafood",v:12 },{ n:"Chemicals",v:12 }],
    imports: [{ n:"Machinery",v:25 },{ n:"Electronics",v:20 },{ n:"Vehicles",v:15 },{ n:"Energy & Fuels",v:12 },{ n:"Food & Agriculture",v:10 },{ n:"Chemicals",v:8 }],
  },
  "TUR": {
    exports: [{ n:"Machinery",v:50 },{ n:"Textiles & Apparel",v:45 },{ n:"Vehicles",v:40 },{ n:"Food & Agriculture",v:30 },{ n:"Chemicals",v:25 },{ n:"Metals",v:20 }],
    imports: [{ n:"Energy & Fuels",v:80 },{ n:"Electronics",v:55 },{ n:"Machinery",v:50 },{ n:"Chemicals",v:45 },{ n:"Metals",v:40 },{ n:"Vehicles",v:35 }],
  },
  "IRN": {
    exports: [{ n:"Crude Oil",v:35 },{ n:"Chemicals",v:5 },{ n:"Food & Agriculture",v:4 },{ n:"Metals",v:3 },{ n:"Textiles",v:2 },{ n:"Other",v:2 }],
    imports: [{ n:"Machinery",v:12 },{ n:"Food & Agriculture",v:10 },{ n:"Electronics",v:8 },{ n:"Chemicals",v:7 },{ n:"Metals",v:6 },{ n:"Vehicles",v:5 }],
  },
  "ARE": {
    exports: [{ n:"Crude Oil",v:180 },{ n:"Gold & Jewels",v:80 },{ n:"Electronics",v:50 },{ n:"Machinery",v:45 },{ n:"Chemicals",v:30 },{ n:"Food & Agriculture",v:20 }],
    imports: [{ n:"Gold & Jewels",v:70 },{ n:"Electronics",v:65 },{ n:"Machinery",v:55 },{ n:"Vehicles",v:50 },{ n:"Chemicals",v:35 },{ n:"Food & Agriculture",v:30 }],
  },
  "MYS": {
    exports: [{ n:"Electronics",v:130 },{ n:"Energy & Fuels",v:40 },{ n:"Machinery",v:35 },{ n:"Palm Oil",v:20 },{ n:"Chemicals",v:20 },{ n:"Metals",v:15 }],
    imports: [{ n:"Electronics",v:100 },{ n:"Machinery",v:50 },{ n:"Energy & Fuels",v:35 },{ n:"Chemicals",v:25 },{ n:"Food & Agriculture",v:20 },{ n:"Metals",v:18 }],
  },
  "VNM": {
    exports: [{ n:"Electronics",v:180 },{ n:"Machinery",v:60 },{ n:"Textiles & Apparel",v:40 },{ n:"Footwear",v:25 },{ n:"Food & Agriculture",v:20 },{ n:"Chemicals",v:12 }],
    imports: [{ n:"Electronics",v:160 },{ n:"Machinery",v:65 },{ n:"Metals",v:30 },{ n:"Textiles & Fabric",v:25 },{ n:"Chemicals",v:20 },{ n:"Plastics",v:18 }],
  },
  "PHL": {
    exports: [{ n:"Electronics",v:40 },{ n:"Machinery",v:8 },{ n:"Food & Agriculture",v:6 },{ n:"Chemicals",v:5 },{ n:"Metals",v:4 },{ n:"Textiles",v:3 }],
    imports: [{ n:"Electronics",v:25 },{ n:"Energy & Fuels",v:22 },{ n:"Machinery",v:18 },{ n:"Food & Agriculture",v:12 },{ n:"Chemicals",v:10 },{ n:"Metals",v:8 }],
  },
  "CHL": {
    exports: [{ n:"Copper",v:45 },{ n:"Food & Wine",v:15 },{ n:"Energy & Fuels",v:8 },{ n:"Chemicals",v:7 },{ n:"Metals",v:6 },{ n:"Machinery",v:5 }],
    imports: [{ n:"Energy & Fuels",v:20 },{ n:"Machinery",v:16 },{ n:"Electronics",v:12 },{ n:"Vehicles",v:10 },{ n:"Chemicals",v:9 },{ n:"Food & Agriculture",v:8 }],
  },
  "COL": {
    exports: [{ n:"Energy & Oil",v:25 },{ n:"Food & Coffee",v:10 },{ n:"Chemicals",v:5 },{ n:"Metals",v:4 },{ n:"Textiles",v:4 },{ n:"Machinery",v:3 }],
    imports: [{ n:"Machinery",v:14 },{ n:"Electronics",v:10 },{ n:"Energy & Fuels",v:8 },{ n:"Vehicles",v:8 },{ n:"Chemicals",v:7 },{ n:"Food & Agriculture",v:6 }],
  },
  "PER": {
    exports: [{ n:"Copper & Metals",v:25 },{ n:"Food & Agriculture",v:8 },{ n:"Energy & Fuels",v:7 },{ n:"Gold",v:5 },{ n:"Chemicals",v:4 },{ n:"Textiles",v:3 }],
    imports: [{ n:"Machinery",v:11 },{ n:"Electronics",v:9 },{ n:"Energy & Fuels",v:7 },{ n:"Chemicals",v:6 },{ n:"Vehicles",v:5 },{ n:"Food & Agriculture",v:5 }],
  },
  "PAK": {
    exports: [{ n:"Textiles & Apparel",v:18 },{ n:"Food & Agriculture",v:4 },{ n:"Chemicals",v:2 },{ n:"Metals",v:2 },{ n:"Leather",v:1 },{ n:"Machinery",v:1 }],
    imports: [{ n:"Energy & Fuels",v:15 },{ n:"Electronics",v:8 },{ n:"Machinery",v:8 },{ n:"Food & Agriculture",v:7 },{ n:"Chemicals",v:6 },{ n:"Metals",v:5 }],
  },
  "BGD": {
    exports: [{ n:"Garments & Apparel",v:45 },{ n:"Food & Agriculture",v:4 },{ n:"Leather Goods",v:2 },{ n:"Electronics",v:1 },{ n:"Chemicals",v:1 },{ n:"Jute Products",v:1 }],
    imports: [{ n:"Textiles & Fabric",v:15 },{ n:"Energy & Fuels",v:14 },{ n:"Food & Agriculture",v:10 },{ n:"Machinery",v:8 },{ n:"Electronics",v:8 },{ n:"Chemicals",v:6 }],
  },
};
