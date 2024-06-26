import { setToken } from "../auth/auth";
import { AlertStatus, LoginInput } from "../types/types";
import { getAxiosInstance } from "./axios-instance";
import { fetchCustomer } from "./fetch-customer";

export const login = async (payload: LoginInput, setNotification: any) => {
  try {
    const { data: token } = await getAxiosInstance().post("auth/login", payload);

    setToken(token);

    await fetchCustomer();

    setNotification({
      message: "Succesfully Logged In...",
      status: AlertStatus.SUCCESS,
    });

    window.location.reload()
  } catch (error: any) {

    let errorMessage = "";

    if (error.response.data?.message) {
      errorMessage = error.response.data.message;
    } else {
      errorMessage = error.response.data || "Failed to login";
    }

    setNotification({ message: errorMessage, status: AlertStatus.ERROR });
  }
};
