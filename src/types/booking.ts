export interface PlanTripFormData {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  category: string;
  travelDate: string;
  duration: string;
  guests: number;
  budget: string;
  specialRequests: string;
}

export interface BookingInquiry {
  id: string;
  referenceNumber: string;
  formData: PlanTripFormData;
  tourId?: string;
  tourTitle?: string;
  submittedAt: string;
  status: 'received' | 'in_review' | 'confirmed';
}

export type FormValidationErrors = Partial<Record<keyof PlanTripFormData, string>>;
