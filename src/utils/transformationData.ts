import { getRandomNumberId } from "./randomId";

interface transformNameValue {
  data: any;
  name: string;
  value: string;
}

function uniqueFilter(data: any, key: string) {
  const table = {};
  // @ts-ignore
  return data?.filter((item: any) => !table[item[key]] && (table[item[key]] = 1));
}

export function transformNameValue({ data, name, value }: transformNameValue) {
  const newData = data.map((m: any) => ({
    name: m[name]?.toString() || m[name],
    value: m[value]?.toString() || m[value]
  }));
  return uniqueFilter(newData, "value");
}

// export function transformNameValueCountType(data, valueName, valueValue, valueCount, valueType) {
//   return data.map(m => ({
//     name: m[valueName]?.toString() || m[valueValue],
//     value: m[valueValue]?.toString() || m[valueValue],
//     count: m[valueCount]?.toString() || "-",
//     type: m[valueType]?.toString() || "-"
//   }));
// }

// SmartMode
export function transformSmartModeIn(object: any) {
  const { promotion_time_and_percentage, ...rest } = object;
  let newArray: any[] = [];
  promotion_time_and_percentage.split(";").forEach((item: any) => {
    const params = item.split(":");
    const percent = params[1];
    let time = params[0];
    while (time.length < 4) {
      time = "0" + time;
    }
    const hour = time.slice(0, 2);
    const minute = time.slice(-2);
    const newObject = { id: getRandomNumberId(), time: `${hour}:${minute}`, percent };
    newArray = [...newArray, newObject];
  });
  return { promotion_time_and_percentage: newArray, ...rest };
}

export function transformSmartModeOut(object: any) {
  const { promotion_time_and_percentage, ...rest } = object;
  let newString = "";
  promotion_time_and_percentage.forEach((item: any) => {
    if (!(item.time.length > 0 && item.percent.length > 0)) return;
    if (newString.length > 0) newString += ";";
    let time: string = item.time.replaceAll(":", "");
    while (time.length < 4) {
      time = "0" + time;
    }
    newString += time + ":" + item.percent;
  });
  return { promotion_time_and_percentage: newString, ...rest };
}

// Device
export function transformDeviceOut(object: any) {
  let valueString = "";
  const array = ["phone", "desktop", "tablet"];
  for (const key in object) {
    if (array.includes(key)) {
      if (valueString.length > 0) valueString += ";";
      valueString += object[key];
    }
  }
  return { device: valueString };
}

// TimeSite
export function transformTimeSiteIn(object: any) {
  const {
    emulation_of_inactivity_min,
    emulation_of_inactivity_max,
    emulation_of_inactivity_between_articles_min,
    emulation_of_inactivity_between_articles_max,
    number_of_transitions_min,
    number_of_transitions_max,
    ...rest
  } = object;
  return {
    emulation_of_inactivity: `${emulation_of_inactivity_min}-${emulation_of_inactivity_max}`,
    emulation_of_inactivity_between_articles: `${emulation_of_inactivity_between_articles_min}-${emulation_of_inactivity_between_articles_max}`,
    number_of_transitions: `${number_of_transitions_min}-${number_of_transitions_max}`,
    ...rest
  };
}

// Query
export function transformQueryIn(object: any) {
  const { search, ...rest } = object;
  let transitions: any[] = [];
  const splittedArray = search.split(";");
  for (let i = 0; i < splittedArray.length; i++) {
    const item = splittedArray[i];
    if (i !== 0 && !["true", "false"].includes(item.toLocaleLowerCase())) {
      item?.split(",")?.forEach((itemLink: string) => {
        const newObject = { id: getRandomNumberId(), link: itemLink };
        transitions = [...transitions, newObject];
      });
    }
  }
  return { link: splittedArray[0], transitions, ...rest };
}

export function transformQueryOut(object: any) {
  const { transitions, link, type } = object;
  const isNotEmptyArray = transitions?.length > 0;
  let newString = link + ";True;";
  for (let i = 0; i < transitions.length; i++) {
    const item = transitions[i];
    if (item.link.length === 0) continue;
    if (i !== 0) newString += ",";
    newString += item.link;
  }
  return { props: isNotEmptyArray, link: newString, type };
}

export function transformQueryUpdateOut(object: any) {
  const { transitions, type, ...rest } = object;
  let newString = "";
  for (let i = 0; i < transitions.length; i++) {
    const item = transitions[i];
    if (item.link.length === 0) continue;
    if (i !== 0) newString += ",";
    newString += item.link;
  }
  return { properties: newString, search_for: type, ...rest };
}
export function transformQueryUpdateIn(object: any) {
  const { properties, search_for, ...rest } = object;
  let transitions: any[] = [];
  properties?.split(",")?.forEach((itemLink: string) => {
    const newObject = { id: getRandomNumberId(), link: itemLink };
    transitions = [...transitions, newObject];
  });
  return { transitions, type: search_for, ...rest };
}

// Link
export function transformLinkUpdateIn(object: any) {
  const { spec_links, ...rest } = object;
  let transitions: any[] = [];
  spec_links?.split(",")?.forEach((itemLink: string) => {
    const newObject = { id: getRandomNumberId(), link: itemLink };
    transitions = [...transitions, newObject];
  });
  return { transitions, ...rest };
}

export function transformLinkCreateOut(object: any) {
  const { link, ...rest } = object;
  let newLink = link + "::";
  return { link: newLink, ...rest };
}

export function transformLinkUpdateOut(object: any) {
  const { transitions, ...rest } = object;
  let spec_links: string = "";
  for (let i = 0; i < transitions.length; i++) {
    const item = transitions[i];
    if (item.link.length === 0) continue;
    if (i !== 0) spec_links += ",";
    spec_links += item.link;
  }
  return { ...rest, spec_links };
}
