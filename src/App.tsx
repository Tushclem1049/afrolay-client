import { Routes, Route } from "react-router-dom";

import * as _ from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<_.AppLayout />}>
        {/* public routes  */}
        <Route element={<_.AuthLayout />}>
          <Route path="/" element={<_.HomePage />} />
          <Route path="sign-in" element={<_.SignInPage />} />
          <Route
            path="account/forgot-password"
            element={<_.ForgotPassword />}
          />
          <Route
            path="account/reset-password"
            element={<_.ResetPasswordPage />}
          />
        </Route>

        {/* protected routes */}
        <Route element={<_.PersistLogin />}>
          <Route element={<_.RequireAuth />}>
            <Route element={<_.DashBoardLayout />}>
              <Route path="/dashboard">
                <Route path="shipment" element={<_.ShipmentPage />} />
                <Route path="shipment/new" element={<_.AddShipmentPage />} />
                <Route
                  path="shipment/edit/:id"
                  element={<_.EditShipmentPage />}
                />
                <Route path="checkout-details" element={<_.CheckoutPage />} />
                <Route path="profile" element={<_.ProfilePage />} />
              </Route>
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
