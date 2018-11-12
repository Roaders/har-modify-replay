
import { Request, NameValue } from "../entities/har";
import axios, { AxiosRequestConfig } from "axios";
import { from as observableFrom, Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";

export function replayRequests(request: Request | Request[]) {

    const requests = Array.isArray(request) ? request : [request];

    return observableFrom(requests)
        .pipe(
            mergeMap(replayRequest)
        )
}

function replayRequest(request: Request) {
    console.log(`replay: ${request.method}: ${request.url}`);

    const config: AxiosRequestConfig = {
        method: request.method,
        url: request.url,
        headers: constructHeaderObject(request.headers)
    }

    return observableFrom( axios(config) );
}

function constructHeaderObject(nameValueList: NameValue[]){
    const headers: {[key: string]: string} = {};

    nameValueList
        .filter(pair => pair.name.substr(0,1) != ":")
        .filter(pair => pair.name != "accept-encoding")
        .forEach(pair => headers[pair.name] = pair.value)

    return headers
}