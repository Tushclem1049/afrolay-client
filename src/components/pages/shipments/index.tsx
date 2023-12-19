import { Button } from "@/components/ui/button";

import axios from "../../../../sdk/api/config";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const ShipmentPage = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.get("/auth/sign-out", { withCredentials: true });
      toast.success("Logged out");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div>
      shipmentPage
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default ShipmentPage;
