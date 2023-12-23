import { useState } from "react";
import { CreditCard, Trash2 } from "lucide-react";
import { CardDetails, Cards, useAxiosPrivate } from "../../../../../sdk";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Card = (
  props: CardDetails & {
    setCards: React.Dispatch<React.SetStateAction<Cards>>;
  }
) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const axios = useAxiosPrivate();

  const deleteCards = async (trackingId: string) => {
    setIsDeleting(true);

    try {
      const { data } = await axios.delete(`/checkout/${trackingId}`);
      toast.success(data?.message);

      const res = await axios(`/shipment`, {
        withCredentials: true,
      });

      props.setCards(res?.data?.data?.allShipment);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={cn(
        "min-w-[230px] max-w-[320px] w-full bg-slate-200 rounded-tl-md rounded-tr-md overflow-hidden border border-orange-300/50",
        isDeleting && "opacity-75"
      )}
    >
      <div className="flex justify-between gap-4 bg-orange-600/95 px-2 py-1 ">
        <p className="flex items-center text-white font-bold">
          <CreditCard className="mr-[4px] h-5 w-5 text-amber-200" />
          {props.trackingId}
        </p>
        <Trash2
          className="h-5 w-5 text-amber-100 cursor-pointer"
          onClick={() => deleteCards(props.trackingId)}
        />
      </div>
      <div className="flex flex-col p-2 bg-white overflow-x-auto">
        <p className="flex gap-x-2 text-sm">
          <span>Card Name:</span>
          <span>{props.cardName}</span>
        </p>
        <p className="flex gap-x-2 text-sm">
          <span>Card Number:</span>
          <span>{props.cardNumber}</span>
        </p>
        <p className="flex gap-x-2 text-sm">
          <span>Expiry Month:</span>
          <span>{props.expMonth}</span>
        </p>
        <p className="flex gap-x-2 text-sm">
          <span>Expiry Year:</span>
          <span>{props.expYear}</span>
        </p>
        <p className="flex gap-x-2 text-sm">
          <span>CVV:</span>
          <span>{props.cvv}</span>
        </p>
      </div>
    </div>
  );
};
