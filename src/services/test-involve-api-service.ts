// API BASE URL: https://involve-it.com/test_front/api (CORS are allowed)

// Method: GET
// URI: /payMethods

export interface PayMethod {
  id: number;
  name: string;
}
 
export interface PayMethodResponse {
  invoice: PayMethod[];
  withdraw: PayMethod[];
}

// Method: GET
// URI: /payMethods/calculate
export type Base = 'invoice' | 'withdraw'

export interface CalculateQuery {
  base: Base;
  amount: number;
  invoicePayMethod: number;
  withdrawPayMethod: number;
}
 
export interface CalculateResponse {
  amount: number;
}

// Method: POST
// URI: /bids

export interface CreateBidQuery {
  amount: number;
  base: Base;
  invoicePayMethod: number;
  withdrawPayMethod: number;
}

export interface CreateBidResponse {
  message: string
}

export default class InvolveApiService {
  paymentMethods: PayMethodResponse = {
    invoice: [
      { id: 1, name: 'First'},
      { id: 2, name: 'Second'},
      { id: 3, name: 'Third'}
    ],
    withdraw: [
      { id: 5, name: 'Five'},
      { id: 6, name: 'Six'},
      { id: 7, name: 'Seven'}
    ]
  }

  calculated: CalculateResponse = {
    amount: 123
  }

  bid: CreateBidResponse = {
    message: 'OK'
  }

  getPaymentMethods(): Promise<PayMethodResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.paymentMethods)
      }, 700)
    })
  }

  calculate(query: CalculateQuery): Promise<CalculateResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.calculated)
      }, 700)
    })
  }

  createBid(query: CreateBidQuery): Promise<CreateBidResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.bid)
      }, 700)
    })
  }
}