export function ProductInfo () {
    return (
        <div className="flex flex-col gap-5 p-2 pt-5 md:px-20">
            <div className="flex justify-between gap-3 font-semibold">
                <h1 className="text-xl">Product Title Goes <br /> Here</h1>
                <span>$20</span>
            </div>
            <hr />
            <div className="flex flex-col items-start gap-2">
                <label className="font-semibold" htmlFor="">Quantity</label>
                <select value="" className="px-5 border">
                     <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>
            <hr />
            <div className="flex justify-center">
                <button className="w-full border-2 cursor-pointer">Add To Cart</button>
            </div>
            <hr />
            <article>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </article>
        </div>
    )
}