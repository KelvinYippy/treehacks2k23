import { useState } from "react"

export const useMultiState = <T, >(object: T) => {

    const [componentState, setComponentState] = useState(object)

    type K = keyof T

    const handleIndividualChange = (property: K, value: T[K]) => {
        setComponentState({
            ...componentState,
            [property]: value
        })
    }

    const handleMultipleChange = (modifiedComponentState: Partial<T>) => {
        setComponentState({
            ...componentState,
            ...modifiedComponentState
        })
    }

    return {
        componentState,
        handleIndividualChange,
        handleMultipleChange
    }

}