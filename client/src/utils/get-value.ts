import { Key } from "react";

export function getFirstValueFromSet(set: Set<Key>) {
    const it = set.values();
    const first = it.next();
    return first.value;
}
