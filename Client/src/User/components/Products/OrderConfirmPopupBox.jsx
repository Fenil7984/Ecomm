
export default function OrderConfirmPopupBox({ orderId, email_id }) {
    return (
        <div className="popupBoxStyle">
            <div className="popupContentStyle">
                <h1 className="font-bold">Order Confirmation :</h1>
                <h4 className="font-medium pt-[5px]">Thank you for your order!</h4>
                <p className="pt-[5px]">Your order ID: <strong>{orderId}</strong></p>
                <p className="pt-[5px]">A confirmation email has been sent to: <strong>{email_id}</strong></p>
                <p className="pt-[5px]">Your order will be delivered within 3 to 5 working days.</p>
            </div>
        </div>
    );
}



