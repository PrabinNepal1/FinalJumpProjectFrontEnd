import axios from "axios";


const baseurl = "http://52.15.184.114:8080/api";

class ReviewService {


    getResturants(){
      return  axios.get(`${baseurl}/restaurants`);
    }
 
    createReview(id, rating, description){
      
      const token = sessionStorage.getItem("user")
      const jwtToken = JSON.parse(token)["jwt"]
      

      const config = {
        Authorization : "Bearer " + jwtToken
       };

      return  axios.post(`${baseurl}/add/review/${id}`,{
          rating,
          description
      },{
        headers: config
      })
    }
}


export default new ReviewService();