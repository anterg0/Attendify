import { createVacationRequest, getMyRequests, getUnreviewedRequests } from "../services/requestService/requestService";

class requestRepository {
    async getURequests() {
        return await getUnreviewedRequests();
    }
    async createVacationRequest(startDate, endDate) {
        return await createVacationRequest(startDate, endDate);
    }
    async getRequests() {
        return await getMyRequests();
    }
  }
  
export default requestRepository;