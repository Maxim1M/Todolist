import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }

    return (
            edit ?
            <input value={newTitle} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/>
            : <span onDoubleClick={onBlurHandler}>{props.title}</span>
    );
};
