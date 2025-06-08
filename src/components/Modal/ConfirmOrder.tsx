interface ConfirmOrderProps {
    onConfirmOrder: () => void;
    onClose: () => void;
}

export function ConfirmOrder({ onConfirmOrder, onClose }: ConfirmOrderProps) {

    const handleConfirmOrder= () => {
        onConfirmOrder();
        onClose();
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 max-w-md w-full mx-auto bg-white rounded">
            <h2 className="text-base md:text-lg lg:text-xl font-bold mb-4 text-center md:text-left">Confirm Order</h2>
            <p className="text-sm md:text-base mb-4 text-center md:text-left">
               Confirm your Cart Items?
            </p>
            <div className="flex flex-col sm:flex-row justify-center sm:justify-end gap-3">
                <button onClick={handleConfirmOrder} className="px-4 py-2 text-sm md:text-base bg-blue-500 text-white rounded cursor-pointer">
                    Confirm
                </button>
            </div>
        </div>
    );
}
