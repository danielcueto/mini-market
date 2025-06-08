import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GoCheck, GoX } from "react-icons/go";
import { ConfirmDeleteCartProduct } from "./Modal/ConfirmDeleteCartProduct";
import Modal from "./ Modal";

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
  }, [isEditable, quantity]);

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

  const handleCloseForm = () => {
    setIsEditable(false);
    setInputQuantity(String(quantity));
  };

  const handleDeleteItem = () => {
    onClickRemoveItem(id);
    setIsModalOpen(false);
  };

  return (
    <div className="grid grid-cols-4 border-b-[1px] p-2 items-center">
      <div className="flex flex-col items-center">
        <img src={image} alt="None" />
        <p className="md:text-base text-xs">{description}</p>
      </div>
      <div className="flex flex-col justify-center items-center">{price}</div>
      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="flex flex-col items-center w-full"
      >
        <input
          className="text-center w-full"
          value={inputQuantity}
          onChange={handleChangeQuantity}
          onFocus={() => setIsEditable(true)}
          min={1}
          type="number"
        />
        {isEditable && (
          <div>
            <button className="p-2 border-[1px]" type="submit">
              <GoCheck />
            </button>
            <button
              onClick={handleCloseForm}
              className="p-2 border-[1px]"
              type="button"
            >
              <GoX />
            </button>
          </div>
        )}
      </form>

      <div className="flex flex-col justify-center items-center">
        <button onClick={() => setIsModalOpen(true)} type="button">
          <FaTrashAlt />
        </button>
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
