import {  } from "command-line-args";
import commandLineArgs = require("command-line-args");
import {OptionDefinition, Section} from "command-line-usage";
import commandLineUsage = require("command-line-usage");

const optionDefinitions: OptionDefinition[] = [
    { name: 'archive', alias: 'a', description: "the location of the http archive", typeLabel: "path" },
    { name: 'help', alias: 'h', type: Boolean, description: "Print this usage guide" },
]

const sections: Section[] = [
    {
        header: "har-modify-replay",
        content: "A command line tool to replay and optionally modify a series of http requests in an archive"
    },
    {
        header: "Options",
        optionList: optionDefinitions
    }
];

export interface ICommandLineArgs{
    help: boolean;
    archive?: string;
}

export function getArgs(): ICommandLineArgs{
    const args = commandLineArgs(optionDefinitions);

    return {
        ...args,
        help: args.help || false
    }
}

export function printHelp(){
    console.log(commandLineUsage(sections));
}
