import { serverTimestamp } from "firebase/firestore";
import { createRequest, getUnreviewedRequests } from "../services/requestService/requestService";

class requestRepository {
    async getURequests() {
        return await getUnreviewedRequests();
    }
    async createDebug() {
        return await createRequest(serverTimestamp(), serverTimestamp(), 'vacation');
    }
  }
  
export default requestRepository;