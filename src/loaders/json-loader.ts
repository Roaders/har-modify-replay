
import { HAR } from "../entities/har";
import { Observable, bindNodeCallback } from "rxjs";
import { map } from "rxjs/operators";
import { readFile } from "fs";

export function loadJson<T>(path: string): Observable<T>{

    return bindNodeCallback(readFile)(path)
        .pipe(
            map(buffer => buffer.toString()),
            map(fileContent => JSON.parse(fileContent))
        )
}
