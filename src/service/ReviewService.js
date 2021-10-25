import axios from "axios";


const baseurl = "http://localhost:8080/api";

class ReviewService {


    getResturants(){
      return  axios.get(`${baseurl}/restaurants`);
    }
 
    createReview(review){
      const config = {
        headers: {Authorization : "Bearer" + sessionStorage.getItem("user")}
       };

      return  axios.post(`${baseurl}/add/review/${review.id}`,
            review
      ,{
        config
      })
    }
}


export default new ReviewService();