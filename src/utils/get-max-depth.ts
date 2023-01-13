import { NestedArray } from "../types/NestedArray";

declare global {
    interface Array<T> {
        max(): number;
    }
}


Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

export function getMaxDepth(item: NestedArray<number> | number, level = 0): number {
    if (item instanceof Array){
        return item.map(function(value, index){
            return getMaxDepth(value, level + 1)
        }).max();
    }
    return level;
};