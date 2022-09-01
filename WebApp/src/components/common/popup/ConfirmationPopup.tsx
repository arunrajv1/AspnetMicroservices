import React from 'react';
import "../../../style/PopupStyle.scss";

const ConfirmationPopup = ({onClose, onConfirmChoice, text}: any) => {
    const handleOkClick=(e: any)=>{
        if(e.target.id == "btn_confirm")
            onConfirmChoice(true);
        onClose(false);
    }
    const onCloseModal=(e: any)=>{
        if(e.target.id == "container" || e.target.id=="btn_cancel")
            onClose(false);
    }
  return (
    <div id='container' onClick={onCloseModal} className="containerBackgroundBlur">
      <div className="bg-white p-2 rounded w-72">
        <h1 className="font-semibold text-center text-xl text-gray-700">
          Confirm
        </h1>
        <p className="text-center text-gray-700 mb-5">{text}</p>

        <div className="text-center">
            <button onClick={handleOkClick} id='btn_confirm' className='rounded px-4 py-2 text-white bg-blue-700'>Confirm</button>
            <button onClick={onCloseModal} id='btn_cancel' className='rounded px-4 py-2 ml-4 text-white bg-red-600'>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPopup