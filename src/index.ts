
import { loadJson } from "./loaders/json-loader";
import { HAR } from "./entities/har";
import { getArgs, printHelp } from "./helpers/commandLineArgs";
import { replayRequests } from "./helpers/har-replay";

const args = getArgs();

if(args.help){
    printHelp();
    process.exit();
}

const archivePath = args.archive;

if(archivePath == null){
    console.log(`No archive path defined. Please sepcify using --archive=`);
    process.exit();
} else {

    loadJson<HAR>(archivePath)
      .subscribe(har => {
        replayRequests(har.log.entries.filter(e => e.request.url.indexOf("dateRange") > 0).map(r => r.request));
      });
}

