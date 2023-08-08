import React from 'react';

const PlaceOrderBtnDisabled = () => {
    return (
        <div>
            <button
                disabled={true}
                aria-label='Button disabled, complete the form first!'
                className={'default-btn-style-4 d-block w-100 mt-3'}
                style={{ backgroundColor: 'gray' }}
            >
                Complete the form.
            </button>
        </div>
    );
};

export default PlaceOrderBtnDisabled;
