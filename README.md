# Drug Search API Project &nbsp;&nbsp;&nbsp;<a href="https://www.buymeacoffee.com/fxcisco"><img src="https://img.buymeacoffee.com/button-api/?text=Coffee Me&emoji=&slug=fxcisco&button_colour=643911&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00" height="20"></a>

This drug search api makes use of the NBER drug information files. Before using you will need to obtain the `products.csv` file and convert it into JSON format.

## Live Demo Version
[https://fxcisco-api-pharmacy.herokuapp.com](https://fxcisco-api-pharmacy.herokuapp.com)

## Dependency Resources
* [NBER - National Bureau of Economic Research](https://www.nber.org/research/data/national-drug-code)
* `product.csv` at http://nber.org/fda/ndc/product.csv



## Environment Variables

`.env` in project root

```bash
PORT=5000
MONGO_CLOUD=mongodb://your.mongo-db-uri.com:27017
```


## Installation & Setup

Install dependencies

    $ npm install

Build project

    $ npm run build

Convert and format `product.csv` 

    $ npm run formatter

Run database seeder

    $ npm run seeder:import


## Usage

Start server

    $ npm start


#### Parsed Document Format
```typescript

interface IDrugDocument {
  prodtype    :   string;    // Product Type Name
  propname    :   string;    // Proprietary Name
  npropname   :   string;    // Nonproprietary Name
  dosename    :   string;    // Dosage Form Name
  routename   :   string;    // Route Name
  labelname   :   string;    // Labeler Name
  subname     :   string;    // Substance Name
  pharmclas   :   string;    // Pharm Classes
  deasched    :   string;    // DEA Schedule

  // Packages
  packages: {
    ndc         :   string;    // Product National Drug Code (NDC)
    actnumstr   :   string;    // Active Numerator Strength
    actingunit  :   string;    // Active Indgredient Unit
  }[]
}

```


## Request Endpoints

`POST /api/pharmacy/drugs/search`

```typescript
// application/json
interface SearchRequestBody {
  type: 'name'| 'ndc'| 'dose'| 'label';
  term: string;
  page?: number;
}

```

Request
```bash
echo '{"type": "name", "term": "addera" }' | curl \
  -H "Content-Type: application/json" \
  -d @- https://fxcisco-api-pharmacy.herokuapp.com/api/pharmacy/drugs/search

```

Response
```json

 {

    "metadata": [
        {
            "total": 4,
            "page": 0,
            "limit": 20
        }
    ],
    "data": [
      {
        "_id": "607a3fa8432469342d680fe5",
        "prodtype": "HUMAN PRESCRIPTION DRUG",
        "propname": "Adderall",
        "npropname": "Dextroamphetamine Sulfate, Dextroamphetamine Saccharate, Amphetamine Sulfate and Amphetamine Aspartate",
        "dosename": "CAPSULE, EXTENDED RELEASE",
        "routename": "ORAL",
        "labelname": "Shire US Manufacturing Inc.",
        "subname": "DEXTROAMPHETAMINE SULFATE; DEXTROAMPHETAMINE SACCHARATE; AMPHETAMINE ASPARTATE MONOHYDRATE; AMPHETAMINE SULFATE",
        "pharmclas": "Central Nervous System Stimulant [EPC],Central Nervous System Stimulation [PE],Central Nervous System Stimulant [EPC],Central Nervous System Stimulation [PE],Central Nervous System Stimulant [EPC],Central Nervous System Stimulation [PE],Central Nervous System Stimulant [EPC],Central Nervous System Stimulation [PE]",
        "deasched": "CII",
        "packages": [
          {
              "ndc": "54092-381",
              "actnumstr": "1.25; 1.25; 1.25; 1.25",
              "actingunit": "mg/1; mg/1; mg/1; mg/1"
          },
          {
              "ndc": "54092-383",
              "actnumstr": "2.5; 2.5; 2.5; 2.5",
              "actingunit": "mg/1; mg/1; mg/1; mg/1"
          },
          {
              "ndc": "54092-385",
              "actnumstr": "3.75; 3.75; 3.75; 3.75",
              "actingunit": "mg/1; mg/1; mg/1; mg/1"
          },
          {
              "ndc": "54092-387",
              "actnumstr": "5; 5; 5; 5",
              "actingunit": "mg/1; mg/1; mg/1; mg/1"
          },
          {
              "ndc": "54092-389",
              "actnumstr": "6.25; 6.25; 6.25; 6.25",
              "actingunit": "mg/1; mg/1; mg/1; mg/1"
          },
          {
              "ndc": "54092-391",
              "actnumstr": "7.5; 7.5; 7.5; 7.5",
              "actingunit": "mg/1; mg/1; mg/1; mg/1"
          }
        ]
      },
    ]

 }

```