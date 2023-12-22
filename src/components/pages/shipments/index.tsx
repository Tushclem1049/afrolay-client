import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// import { Button } from "@/components/ui/button";

import { TShipments, useAxiosPrivate } from "../../../../sdk";

const ShipmentPage = () => {
  const axios = useAxiosPrivate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [shipments, setShipments] = useState<TShipments | []>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchShipments = async () => {
      setLoading(true);
      try {
        const { data } = await axios(`/shipment`, {
          withCredentials: true,
          signal: controller.signal,
        });

        console.log(data);

        isMounted && setShipments(data?.data?.allShipment);
      } catch (error: any) {
        console.log(error?.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchShipments();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axios]);

  if (!isMounted) {
    return null;
  }

  if (loading) {
    return "please wait...";
  }

  // if (!shipments?.length) {
  //   return <p>You have no active shipments yet</p>;
  // }
  return (
    <div>
      shipmentsPage
      <div>
        {shipments.map((shipment, i) => {
          return (
            <div key={i}>
              <p>{shipment.trackingId}</p>
              <p>{shipment.status.status}</p>
              <p>{shipment.destination.address.addressLocality}</p>
              <Link to={`/dashboard/shipment/edit/${shipment.trackingId}`}>
                edit
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipmentPage;
