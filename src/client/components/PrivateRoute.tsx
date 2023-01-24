import * as React from "react";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { GET } from "../services/api-service";

/* HOOK REACT EXAMPLE */
const PrivateRoute = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  useEffect(() => {
    GET("/auth/token_status")
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false))
      .finally(() => setHasChecked(true));
  }, []);

  if (!hasChecked) return <></>;

  if (!isValid) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRoute;
