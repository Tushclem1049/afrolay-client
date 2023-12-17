export type CardDetails = {
  trackingId?: string;
  cardName: string;
  country: string;
  cardNumber: number;
  expMonth: string | number;
  expYear: string | number;
  cvv: number;
  createdAt: string;
  updatedAt: string;
  _id?: string;
  __v?: 0;
};

export type Cards = CardDetails[];

export type APIAllCardsResponse = {
  allCardsDetails: Cards;
};

export type APISingleCardResponse = {
  cardDetails: CardDetails;
};
