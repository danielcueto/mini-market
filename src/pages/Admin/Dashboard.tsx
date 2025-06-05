import { IoAddCircleOutline } from "react-icons/io5";
import { ProductTable } from "../../components/ProductTable";

export function Dashboard() {
    return (
        <div className="flex flex-col w-full gap-8 mt-5 md:mt-20">
            <div className="flex justify-end">
                <button className="flex justify-center border-1 items-center gap-2 px-8 md:px-20 lg:px-23 text-sm md:text-lg cursor-pointer">
                <IoAddCircleOutline className="text-lg md:text-2xl font-extrabold"/>
                Create
                </button>
            </div>
            <ProductTable />
            <div className="flex justify-start md:pt-5">
                <button className="border-1 px-2 text-sm md:text-lg cursor-pointer">Order Management</button>
            </div>
        </div>
    )
}