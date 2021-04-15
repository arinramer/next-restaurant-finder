import Modal from "./modal";
import { useState } from "react";

export default function Restaurant(props) {
    const [modalopen, setModalOpen] = useState(false)
    if(modalopen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return (
        <div className="flex flex-col w-64 m-3 p-5 rounded transition shadow-md">
            <p className="text-2xl mb-4">{props.store.restaurant_name}</p>
            <div><img className="h-5 w-5 my-4" src="/static/location.png"/><a className="text-blue-700" href={`http://maps.google.com/?q=${props.store.address.formatted}`}>{props.store.address.formatted}</a></div>
            <div><img className="h-5 w-5 my-4" src="/static/phone.png"/><a className="text-blue-700" href={`tel:${props.store.restaurant_phone}`}>{props.store.restaurant_phone}</a></div>
            <div className="mt-4 mb-auto">{props.store.restaurant_website.substring(0, 8) == "http:///" ? null : <a className="underline text-blue-700" href={props.store.restaurant_website}>Website</a>}</div>
            <input className="justify-end focus:outline-none px-4 mt-4 bg-indigo-500 p-2 rounded-lg text-white hover:bg-indigo-400 transition shadow hover:shadow-lg" type="submit" value="Reviews" onClick={() => setModalOpen(true)}/>
            {modalopen ? <Modal store={props.store} toggle={setModalOpen}/> : null}
        </div>
    )
}