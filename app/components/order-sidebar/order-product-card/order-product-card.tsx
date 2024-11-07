import Image from "next/image";

interface OrderProductType {
  params: {
    src: string;
    alt: string;
    title: string;
    customAttribute: string;
    price: number;
    discount: number;
    amount: number;
    type: "checkout" | "complete";
  };
}

export default function OrderProduct({ params }: OrderProductType) {
  return (
    <div className="flex flex-col gap-8 mt-8">
      <div className="flex flex-row gap-6 text-xs">
        <div className="relative w-32 h-auto aspect-square lg:h-16 lg:w-28 xl:h-20 2xl:h-24">
          <Image
            src={params.src}
            alt={params.alt}
            sizes="auto auto"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 mr-4 justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-bold">{params.title}</p>
            <p
              className={
                params.type === "checkout"
                  ? ""
                  : "text-[var(--input-text-clr)] opacity-70"
              }
            >
              {params.customAttribute}
            </p>
          </div>

          {params.type === "checkout" ? (
            <div className="flex flex-row items-center justify-between">
              {params.discount === 0 ? (
                <p>{params.price} ₴</p>
              ) : (
                <div className="flex flex-col gap-1">
                  <p>{params.price - params.discount} ₴</p>
                  <p className="line-through text-[var(--input-text-clr)] opacity-70">
                    {params.price} ₴
                  </p>
                </div>
              )}
              <div className="h-6 w-fit text-xs px-2 border border-[var(--input-clr)] bg-white flex items-center gap-3 font-bold text-black">
                <button>-</button>
                <div>1</div>
                <button>+</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-1">
                <p className="font-bold">Price:</p>
                <p className="text-[var(--input-text-clr)] opacity-70">
                  {params.price - params.discount} ₴
                </p>
              </div>
              <div className="flex flex-row gap-1">
                <p className="font-bold">Quantity:</p>
                <p className="text-[var(--input-text-clr)] opacity-70">
                  {params.amount} pcs
                </p>
              </div>
              <p className="font-bold">
                {params.amount * (params.price - params.discount)} ₴
              </p>
            </div>
          )}

          {params.type === "checkout" && (
            <p className="text-[var(--input-text-clr)] underline decoration-dashed underline-offset-4">
              Remove
            </p>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}
