export interface IModal {
  type?: string,
  message?: string,
  formState?: any,
  onClose: (value: boolean) => void
}