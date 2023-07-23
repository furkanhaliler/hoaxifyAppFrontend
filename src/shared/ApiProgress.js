import { useState, useEffect } from "react";
import axios from "axios";

export const useApiProgress = (apiPath) => {
  const [pendingApiCall, setPendingApiCall] = useState(false);

  useEffect = () => {
    let requestInterceptor, responseInterceptor;

    const updateApicallFor = (url, inProgress) => {
      if (url === apiPath) {
        setPendingApiCall(inProgress);
      }
    };

    const registerInterceptors = () => {
      requestInterceptor = axios.interceptors.request.use((request) => {
        updateApicallFor(request.url, true);
        return request;
      });

      responseInterceptor = axios.interceptors.response.use(
        (response) => {
          updateApicallFor(response.config.url, false);
          return response;
        },
        (error) => {
          updateApicallFor(error.config.url, false);
          throw error;
        }
      );
    };

    const unregisterInterceptors = () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

    registerInterceptors();

    return function unmount() {
      unregisterInterceptors();
    };
  };

  return pendingApiCall;
};
