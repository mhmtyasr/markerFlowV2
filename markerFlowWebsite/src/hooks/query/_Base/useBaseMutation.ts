import { useEffect } from "react";
import { useMutation } from "react-query";

import { UseBaseMutationParams } from "./types";
import { notification } from "antd";

const useBaseMutation = <T, K>({
  service,
  onSuccess,
  onError,
}: UseBaseMutationParams<T, K>) => {
  const { mutate, data, isError, isSuccess, isLoading, error } = useMutation(
    service,
    {
      onSuccess(_data) {
        if (onSuccess?.callback) {
          onSuccess.callback(_data);
        }
      },
      onError(_error) {
        if (onError?.callback) {
          onError.callback();
        }
      },
    }
  );

  useEffect(() => {
    if (isSuccess) {
      if (onSuccess?.message) {
        notification.success({
          message: "Başarılı",
          description: onSuccess?.message || "",
        });
      }
    }
    if (isError) {
      const _error = error as any;
      if (_error.response.status === 401) {
      }
      if (_error.response.status === 500) {
        notification.error({
          message:
            _error.response.data.error.message || "Something went wrong...",
          description: _error.response.data.error.details || "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, isLoading]);

  return { mutate, data, isError, isSuccess, isLoading, error };
};




export default useBaseMutation;
