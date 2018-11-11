
import { loadJson } from "./loaders/json-loader";
import { HAR } from "./entiies/har";
import { getArgs, printHelp } from "./helpers/commandLineArgs";

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
      .subscribe(har => har.log.entries.forEach(e => console.log(`${e.request.method}: ${e.request.url}`)));
}

