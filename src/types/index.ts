export interface Resume {
  id: number;
  fileName: string;
  candidateName: string;
  email: string;
  phone?: string;
  extractedText: string;
  parsedData?: string;
}


export interface AuthResponse {
  token: string;
  message: string;
}