import { Routes, Route } from "react-router-dom";

import * as _ from "./components";

function App() {
  return (
    <Routes>
      <Route element={<_.AppLayout />}>
        {/* public routes  */}
        <Route element={<_.AuthLayout />}>
          <Route index element={<_.HomePage />} />
          <Route path="/sign-in" element={<_.SignInPage />} />
          <Route
            path="/account/forgot-password"
            element={<_.ForgotPassword />}
          />
          <Route
            path="/account/reset-password"
            element={<_.ResetPasswordPage />}
          />
          /dashboard
        </Route>

        {/* protected routes */}
        <Route element={<_.PersistLogin />}>
          <Route element={<_.RequireAuth />}>
            <Route element={<_.DashBoardLayout />}>
              <Route path="/dashboard/shipment" element={<_.ShipmentPage />} />
              <Route
                path="/dashboard/shipment/new"
                element={<_.AddShipmentPage />}
              />
              <Route
                path="/dashboard/shipment/edit/:id"
                element={<_.EditShipmentPage />}
              />
              <Route
                path="/dashboard/checkout-details"
                element={<_.CheckoutPage />}
              />
              <Route path="/dashboard/profile" element={<_.ProfilePage />} />
            </Route>
          </Route>
        </Route>

        {/* catch-all route*/}
        <Route path="*" element={<_.NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
