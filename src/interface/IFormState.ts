export interface IFormState {
  validDate: boolean;
  valid: boolean;
  validText: boolean;
  validEmail: boolean;
  validTel: boolean;
  cards: [];
  name: string | number;
  errForm: string;
  success: string;
}
