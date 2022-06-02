/**
 * Its Types (e.g. enums) + constants :)
 */
export interface AnswerType {
    text: string
    class_name: string
    is_positive: boolean
    id: number
    uuid: string
    count: number
    inc_number?: number
    comment?: string
}
export function isAnswerArrayType(answerlist: any): answerlist is AnswerType[] { // User-Defined Type Guard ensures that data returned from server has the right format. And allows us to use the data in our setState method. Type Guard is better than using 'as' to just force a value to be a specific type (since it might not be) and that would create "undetectable" bugs
    return answerlist.length > 0 && answerlist[0].text !== undefined;
}

// For reference (another way of doing TypeGuard):
interface Book {
    id: number;
    author: string;
    publisher?: string;
}
export const isBook = (element: unknown): element is Book => //element is Book is a type predicate, where element must be a parameter from the current function signature.
    hasAttributes(element, ["author", "id"]) &&
    typeof element.author === "string" &&
    typeof element.id === "number"; 

// Generic function to check for existence of parameters on an object.
export const hasAttributes = <T extends string>(
    element: unknown,
    attributes: T[]
): element is Record<T, unknown> => {
    if (element === undefined || element === null) {
        return false;
    }
    return attributes.every((attribute) => //return true if every attribute exists on element
        Object.prototype.hasOwnProperty.call(element, attribute)
    );
};