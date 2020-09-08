import { globals } from "./globals";

export class Guid {

    private static gen(count = 1) {
        let out = '';
        for (let i = 0; i < count; i++) out += ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        return out;
    }

    private value: string;

    protected constructor(guid: string) {
        if (!guid) throw new TypeError('Invalid argument; `value` has no value.');
        this.value = globals.guidDefaultValue;
        if (guid && Guid.isGuid(guid)) this.value = guid;
    }

    static validator = new RegExp(globals.validationPattern, 'i');

    static isGuid = (guid: Guid | string): boolean => guid && (guid instanceof Guid || Guid.validator.test(guid.toString()));

    static create = (): Guid => new Guid([Guid.gen(2), Guid.gen(), Guid.gen(), Guid.gen(), Guid.gen(3)].join('-'));

    static createEmpty = (): Guid => new Guid(globals.guidDefaultValue);

    static parse = (guid: string): Guid => new Guid(guid);

    static raw = (): string => [Guid.gen(2), Guid.gen(), Guid.gen(), Guid.gen(), Guid.gen(3)].join('-');

    static EMPTY = Guid.parse(globals.guidDefaultValue);

    /*
     * Comparing string `value` against provided `guid` will auto-call
     * toString on `guid` for comparison
     */
    equals = (other: Guid): boolean => Guid.isGuid(other) && this.value.toUpperCase() === other.toString().toUpperCase();

    isEmpty = (): boolean => this.value === globals.guidDefaultValue;

    toString = (): string => this.value;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toJSON(): any { return { value: this.value }; }
}
