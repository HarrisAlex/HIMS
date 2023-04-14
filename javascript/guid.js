export class GUID {
    static generate() {
        GUID.lastGUID++;
        return GUID.lastGUID;
    }
}

GUID.lastGUID = 0;