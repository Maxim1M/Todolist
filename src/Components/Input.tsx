import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type InputPropsType = {
    callBack: (newTitle: string) => void
}

export const Input = (props: InputPropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTaskk();
        }
    }
    const addTaskk = () => {
        const newTitle = title.trim()
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTaskk}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};
