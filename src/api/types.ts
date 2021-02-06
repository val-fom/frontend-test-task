export type ResponseData<D> = {
  data?: D;
  error?: ResponseError;
};

export interface ResponseError {
  errors?: string[];
  modelErrors?: Record<string, string[]>;
  message?: string;
}
