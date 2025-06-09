import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GoCheck, GoX } from "react-icons/go";
import { ConfirmDeleteCartProduct } from "./Modal/ConfirmDeleteCartProduct";
import Modal from "./Modal";
import { Button } from "./ui/Button";

interface CartRowProps {
  id: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  onClickRemoveItem: (itemId: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
}

export function CartRow({
  id,
  image,
  description,
  price,
  quantity,
  onClickRemoveItem,
  onChangeQuantity,
}: CartRowProps) {
  const [inputQuantity, setInputQuantity] = useState<string>(String(quantity));
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleCloseForm = useCallback(() => {
    setIsEditable(false);
    setInputQuantity(String(quantity));
  }, [quantity]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isEditable &&
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        handleCloseForm();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditable, quantity, handleCloseForm]);

  useEffect(() => {
    setInputQuantity(String(quantity));
  }, [quantity]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedQuantity = parseInt(inputQuantity, 10);

    if (!isNaN(parsedQuantity) && parsedQuantity >= 1) {
      onChangeQuantity(id, parsedQuantity);
      setIsEditable(false);
    }
  };
  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    setInputQuantity(event.target.value);
  };

  const handleDeleteItem = () => {
    onClickRemoveItem(id);
    setIsModalOpen(false);
  };
  return (
    <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="w-16 h-16 flex-shrink-0">
          <img
            src={image}
            alt={description}
            className="w-full h-full object-contain rounded-lg bg-gray-50 dark:bg-gray-700 p-2"
          />
        </div>
        <p className="text-sm text-gray-900 dark:text-white text-center md:text-left line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-center">
        <span className="font-semibold text-[#C6FF00]">
          ${price.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="flex flex-col items-center gap-2"
        >
          <input
            className="w-16 text-center px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C6FF00] focus:border-[#C6FF00] transition-colors"
            value={inputQuantity}
            onChange={handleChangeQuantity}
            onFocus={() => setIsEditable(true)}
            min={1}
            type="number"
          />
          {isEditable && (
            <div className="flex gap-1">
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="p-1 h-8 w-8"
              >
                <GoCheck className="w-4 h-4" />
              </Button>
              <Button
                onClick={handleCloseForm}
                variant="outline"
                size="sm"
                type="button"
                className="p-1 h-8 w-8"
              >
                <GoX className="w-4 h-4" />
              </Button>
            </div>
          )}
        </form>
      </div>

      <div className="flex items-center justify-center">
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <FaTrashAlt className="w-4 h-4" />
        </Button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ConfirmDeleteCartProduct
            onClose={() => setIsModalOpen(false)}
            deleteCartItem={handleDeleteItem}
          />
        </Modal>
      </div>
    </div>
  );
}
