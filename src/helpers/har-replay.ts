
import { Request } from "../entities/har";
import "axios";

export function replayRequests(request: Request | Request[]) {

    const requests = Array.isArray(request) ? request : [request];

    requests.forEach(r => {
        console.log(`Replay: ${r.method}: ${r.url}`);
        console.log(JSON.stringify(r, undefined, 4));
    });
}

function replayRequest(request: Request) {

    switch (request.method) {
        case "GET":
            axios.get
            break;

        case "POST":
            break;

        case "PUT":
            break;

        case "PATCH":
            break;

        case "DELETE":
            break;

        default:
            ensureCompleteness(request.method);
    }

}

function ensureCompleteness(method: never) {

}