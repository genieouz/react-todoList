import { compareObject, getValueFromStorage, setValueFromStorage } from "./utils";
import { useMemo, useState, useEffect } from "react";

export function useStorage(value, setter) {
    const [isRecorded, setRecordedState] = useState(true);
    const recordedListKeyName = 'todoList';

    function recordTodoList() {
        setValueFromStorage(recordedListKeyName, value);
        setRecordedState(true);
    }

    const storageIsDifferent = useMemo(() => {

        const storageHasDifferentData = () => {
            const recordedValue = getValueFromStorage(recordedListKeyName);
            return recordedValue && recordedValue.length && !compareObject(recordedValue, value);
        }
        return storageHasDifferentData()

    }, [value]);

    useEffect(() => {
        if (storageIsDifferent) {
            setRecordedState(false);
        }
    }, [storageIsDifferent]);

    useEffect(() => {
        if (storageIsDifferent) {
            setter(getValueFromStorage(recordedListKeyName));
            setRecordedState(true);
        }
    }, []);

    useEffect(() => {
        if (!isRecorded) {
            const handleBeforeUnload = (e) => {
                e.returnValue = 'Des données ne sont pas sauvegardées'
                return 'Des données ne sont pas sauvegardées';
            }

            window.addEventListener('beforeunload', handleBeforeUnload);
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            }
        }
    }, [isRecorded]);

    return {
        recordTodoList
    }
}