import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})

export class UuidService{
    constructor(){}

    getuuid():string{
        return crypto.randomUUID()
    }
}