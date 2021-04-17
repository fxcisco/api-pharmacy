import mongoose, { Model, Document, Schema } from 'mongoose';

export interface IDrugDocument extends Document{
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

export interface IDrugModel extends Model<IDrugDocument> {
  // statics
}

const drugSchema = new Schema<IDrugDocument>({
  
  prodtype: {
    type: String,
    required: true
  },
  propname: {
    type: String,
    required: true
  },
  npropname: {
    type: String,
    required: true
  },
  dosename: {
    type: String,
    required: true
  },
  routename: {
    type: String,
    required: true
  },
  labelname: {
    type: String,
    required: true
  },
  subname: {
    type: String,
    required: true
  },
  pharmclas: {
    type: String,
    required: true
  },
  deasched: {
    type: String,
    required: true
  },
  packages: [{
    ndc: {
      type: String,
      required: true
    },
    actnumstr: {
      type: String,
      required: true
    },
    actingunit: {
      type: String,
      required: true
    },
  }]
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});


export const Drug = mongoose.model<IDrugDocument, IDrugModel>('drug', drugSchema);

