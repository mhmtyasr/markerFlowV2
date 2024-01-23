import { useEffect } from "react";
import { useQuery } from "react-query";

import { UseBaseQueryParams } from "./types";
import { notification } from "antd";

const useBaseQuery = <ReqT, ResK, MappingT = ResK>({
  service,
  queryKeys,
  select,
  onSuccess,
  onError,
  enabled = true,
  
}: UseBaseQueryParams<ReqT, ResK, MappingT>) => {
  const { data, isError, isSuccess, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys,
    queryFn: service,
    select: (_data) => {
      return select ? (select(_data as any) as any) : (_data as ResK);
    },
    onSuccess: function (_data: MappingT) {
      if (onSuccess?.callback && _data) {
        onSuccess.callback(_data);
      }
    },
    onError: (_error: any) => {
      if (onError?.callback) {
        onError.callback();
      }
    },
    refetchOnWindowFocus: false,
    enabled,
  });

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
      const _error = error as { unAuthorizedRequest: boolean };
      if (_error.unAuthorizedRequest) {
        window.location.href = "/login";
      }
      if (onError?.message) {
        notification.error({
          message: "Başarılı",
          description: onSuccess?.message || "",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess, isLoading]);

  return { data, isError, isSuccess, isLoading, error, refetch };
};

export default useBaseQuery;
