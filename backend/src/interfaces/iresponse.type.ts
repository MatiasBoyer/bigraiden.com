type IResponse<T> = {
  success: boolean;
  error?: string[];
  data?: T;
};

export { IResponse };
