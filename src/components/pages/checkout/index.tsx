import { useEffect, useState } from "react";
import { Cards, useAxiosPrivate } from "../../../../sdk";
import { Card } from "./_components/card";
import { Loader } from "lucide-react";

const CheckoutPage = () => {
  const axios = useAxiosPrivate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [cards, setCards] = useState<Cards | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchCards = async () => {
      setLoading(true);
      try {
        const { data } = await axios(`/checkout`, {
          withCredentials: true,
          signal: controller.signal,
        });

        isMounted && setCards(data?.data?.allCards);
      } catch (error: any) {
        // console.log(error?.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axios]);

  if (loading) {
    return (
      <div className="loader md:h-screen w-full flex flex-col justify-center items-center bg-neutral-100">
        <Loader className="animate-spin w-8 h-8 text-orange-600" />
        <span className="text-sm">Please wait...</span>
      </div>
    );
  }

  if (!isMounted) {
    return null;
  }

  if (!cards.length) {
    return <p className="p-10 py-16">No cards available yet</p>;
  }

  return (
    <div className="p-10 py-16">
      <div className="flex flex-col sm:flex-row gap-8 flex-wrap">
        {cards.length &&
          cards.map((card) => (
            <Card {...card} key={card.trackingId} setCards={setCards} />
          ))}
      </div>
    </div>
  );
};

export default CheckoutPage;
