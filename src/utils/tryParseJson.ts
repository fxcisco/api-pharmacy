export function tryParseJSON (jsonString: string){
  try {
      var o = JSON.parse(jsonString);
      if (o && typeof o === "object") {
          return o;
      }
  }
  catch (e) { }
  return false;
};