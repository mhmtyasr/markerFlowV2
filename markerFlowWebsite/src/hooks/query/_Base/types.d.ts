export type UseBaseMutationParams<ReqT, ResK,MappingT = ResK> = {
  onSuccess?: {
    message?: string;
    callback?: (param: ResK) => void;
  };
  onLoading?: {
    message?: string;
    callback?: () => void;
  };
  onError?: {
    message?: string;
    callback?: () => void;
  };
  service: (data: ReqT) => Promise<MappingT>;
};

export type UseBaseQueryParams<ReqT, ResK, MappingT> = {
  queryKeys: any;
  onSuccess?: {
    message?: string;
    callback?: (param: MappingT) => void;
  };
  onError?: {
    message?: string;
    callback?: () => void;
  };
  service: ({queryKey}: {queryKey: [string, ReqT]}) => Promise<ResK>;
  enabled?: boolean;
  select?: (data: ResK) => MappingT;
};
