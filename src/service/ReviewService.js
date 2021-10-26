import axios from "axios";


const baseurl = "http://localhost:8080/api";

class ReviewService {


    getResturants(){
      return  axios.get(`${baseurl}/restaurants`);
    }
 
    createReview(id){
      const config = {
        headers: {Authorization : "Bearer " + sessionStorage.getItem("user")}
       };

      return  axios.post(`${baseurl}/add/review/${id}`,{
        config
      })
    }
}


export default new ReviewService();