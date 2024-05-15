import { createVacationRequest, getRequests, reviewRequest } from "../services/requestService/requestService";

class requestRepository {
    async createVacationRequest(startDate, endDate) {
        return await createVacationRequest(startDate, endDate);
    }
    async getRequests() {
        return await getRequests();
    }
    async review(userID, requestID, verdict) {
        return await reviewRequest(userID, requestID, verdict);
    }
  }
  
export default requestRepository;