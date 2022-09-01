import React from 'react';
import "../../../style/PopupStyle.scss";

const AlertPopup = ({onClose, text}: any) => {
    const onCloseModal=(e: any)=>{
        if(e.target.id == "container" || e.target.id=="btn_cancel")
            onClose(false);
    }
  return (
    <div id='container' onClick={onCloseModal} className="containerBackgroundBlur">
      <div className="bg-white p-2 rounded w-72">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Alert
        </h1>
        <p className="text-center text-gray-700 mb-5">{text}</p>

        <div className="text-center">
            <button onClick={onCloseModal} id='btn_cancel' className='rounded px-4 py-2 ml-4 text-white bg-red-600'>Ok</button>
        </div>
      </div>
    </div>
  )
}

export default AlertPopup