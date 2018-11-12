
import { loadJson } from "./loaders/json-loader";
import { HAR } from "./entities/har";
import { getArgs, printHelp } from "./helpers/commandLineArgs";
import { replayRequests } from "./helpers/har-replay";
import { map, filter, take, tap, mergeMap } from "rxjs/operators";

const args = getArgs();

if (args.help) {
    printHelp();
    process.exit();
}

const archivePath = args.archive;

if (archivePath == null) {
    console.log(`No archive path defined. Please sepcify using --archive=`);
    process.exit();
} else {

    loadJson<HAR>(archivePath)
        .pipe(
            map(har => har.log.entries.filter(e => e.request.url.indexOf("dateRange") > 0)),
            map(entries => entries.map(e => e.request)),
            filter(requests => requests.length > 0),
            map(requests => requests[0]),
            mergeMap(replayRequests)
        )
        .subscribe(result => console.log(JSON.stringify(result.data, undefined, 4)));
}

