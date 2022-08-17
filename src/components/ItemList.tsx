import {useState} from "react";
import styles from "../app.module.scss";
import {gql, useMutation, useQuery} from "@apollo/client";
import {AddItemMutation, AddItemMutationVariables, GetItemsQuery} from "../generated/graphql";
import classNames from "classnames";

const GET_ITEMS = gql`
    query GetItems {
        items {
            title
            createdAt
            user {
                id
                fullName
            }
        }
    }
`;

const ADD_ITEM = gql`
    mutation AddItem($createItemInput: CreateItemInput!) {
        createItem(createItemInput: $createItemInput){
            createdAt
        }
    }
`;

export function ItemList() {
    const {data, loading} = useQuery<GetItemsQuery>(GET_ITEMS);
    if (loading) {
        return <div className={styles.list}> Loading... </div>
    }
    return (
        <div className={styles.list}>
            {data?.items?.map((item: any) => (
                <div key={item.createdAt} className={styles.listBox}>
                    <div>Date and time: {Intl.DateTimeFormat('en').format(Number(item.createdAt))}</div>
                    <div>Title: {item.title}</div>
                    <div>User: {item.user?.fullName}</div>
                </div>
            ))}
        </div>
    )
}

export function NewItem() {
    const [addItem] = useMutation<AddItemMutation, AddItemMutationVariables>(ADD_ITEM, {
        refetchQueries: [GET_ITEMS]
    });
    const [title, setTitle] = useState('');
    return (
        <div className={styles.center}>
            <label className={styles.title}>New Item</label><br/>
            <input
                type={'text'}
                className={classNames(styles['form-control'], styles.itemTitle)}
                placeholder="Titile"
                value={title}
                onChange={(e) => {
                setTitle(e.target.value)
            }}/><br/>
            <button
                className={classNames(styles.btn, styles.center)}
                onClick={() => {
                addItem({variables: {createItemInput: {title}}});
                setTitle('')
            }}>Add new
            </button>
        </div>
    )
}
