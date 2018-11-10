
import { loadJson } from "./loaders/json-loader";
import { HAR } from "./entiies/har";

loadJson<HAR>("load-series.connect.garmin.com.har")
    .subscribe(har => har.log.entries.forEach(e => console.log(`${e.request.method}: ${e.request.url}`)));

