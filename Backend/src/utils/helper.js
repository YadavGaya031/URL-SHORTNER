import { nanoid } from "nanoid"

export const generateId = (length) => {
    return nanoid(length)
}
