import path from 'path';
import { createReadStream, createWriteStream } from 'fs';

class DrugParser {
  static parse(filename: string) {
    const input = createReadStream(path.join(__dirname,  '../..', `data/${filename}`));
    const output = createWriteStream(path.join(__dirname,'../..', 'data/product.json'));
    let remaining = '', isHeader = true, headers: any[];

    output.write('[\n');
    input.on('data', function (data) {
      remaining += data;
      var index = remaining.indexOf('\n');
      while (index > -1) {
        const line = remaining.substring(0, index);
        remaining = remaining.substring(index + 1);
        index = remaining.indexOf('\n');

        if (isHeader) {
          headers = line.split(',').map((s) => s.replace(/"/g, ''));
          const headerObj = DrugParser.filterCSV(headers, headers);
          output.write(JSON.stringify(headerObj));
          isHeader = false;
          continue;
        } 

        const parsed = DrugParser.parseCSV(line);
        const filtered = DrugParser.filterCSV(parsed, headers);
        output.write(',\n' + JSON.stringify(filtered));
      }
    });

    input.on('end', function () {
      output.write('\n]\n');
      if (remaining.length > 0) {
        console.log('discarding: ', remaining);
      }
    });
    input.on('error', () => {
      console.log('Error processing file');
    });
  }

  private static parseCSV(line: string) {
    const format = line
      .replace(/,{2,}/g, (match) => {
        return ',' + new Array(match.length - 1).fill(`"."`).join(',') + ',';
      })
      .replace(/\d{1,2}\/\d{1,2}\/\d{1,4}/g, `"."`)
      .split(/","/g)
    return format;
  }
  private static filterCSV(partials: string[], headers: any) {
    var obj: any = {};
    for (let p1 = 0; p1 < 4; p1++) {
      obj[headers[p1]] = partials[p1]?.replace(/"/g, '') || '';
    }
    for (let p2 = 5; p2 < 8; p2++) {
      obj[headers[p2]] = partials[p2]?.replace(/"/g, '') || '';
    }
    for (let p3 = 14; p3 < 20; p3++) {
      obj[headers[p3]] = partials[p3]?.replace(/"/g, '' || '');
    }
    return obj;
  }
}

DrugParser.parse('product.csv');