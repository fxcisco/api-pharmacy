import path from 'path';
import { readFile, createWriteStream } from 'fs';
import { __root__ } from '../config';

interface IProductDocument {
  prodid: string;
  ndc: string;
  prodtype: string;
  propname: string;
  npropname: string;
  dosename: string;
  routename: string;
  labelname: string;
  subname: string;
  actnumstr: string;
  actingunit: string;
  pharmclas: string;
  deasched: string;
}

export class DrugCondenser {
  reducePackages(drugs: IProductDocument[]) {
    const drugHash: any = {};
    const size = drugs.length;

    for (let i = 0; i < size; i++) {
      const item = drugs[i];
      const id = this.generateId(item);
      const groupBy: (keyof IProductDocument)[] = [
        'ndc',
        'prodid',
        'actnumstr',
        'actingunit',
      ];

      if (!drugHash[id]) {
        drugHash[id] = Object.keys(item).reduce(
          (a, c) => {
            const key = c as keyof IProductDocument;
            if (groupBy.includes(c as any)) return a;
            a[c] = item[key];
            return a;
          },
          {
            prodtype: '',
            propname: '',
            npropname: '',
            dosename: '',
            routename: '',
            labelname: '',
            subname: '',
            pharmclas: '',
            deasched: '',
            packages: [],
          } as any
        );
      }

      drugHash[id].packages.push({
        ndc: item['ndc'],
        actnumstr: item['actnumstr'],
        actingunit: item['actingunit'],
      });
    }
    const output = createWriteStream(path.join(__root__, 'data/drugs.json'));
    const values = Object.values(drugHash);
    const num = values.length;

    output.write('[\n' + JSON.stringify(values[0]));
    for (let i = 1; i < num; i++) {
      output.write(',\n' + JSON.stringify(values[i]));
    }
    output.write('\n]')
  }

  async readFile(filename: string) {
    const seedFile = path.resolve(__root__, 'data', filename);
    const packages = await new Promise<any>((res, rej) => {
      readFile(seedFile, 'utf8', (err, data) => {
        if (err) return rej(`Error reading file from disk: ${err}`);
        res(JSON.parse(data));
      });
    });

    this.reducePackages(packages);
  }

  private generateId(item: IProductDocument) {
    const keys: (keyof IProductDocument)[] = [
      'prodtype',
      'npropname',
      'dosename',
      'routename',
      'labelname',
      'pharmclass',
    ] as any;
    return keys.reduce((a, c) => a + item[c], '');
  }
}

const condenser = new DrugCondenser();
condenser.readFile('product.json');