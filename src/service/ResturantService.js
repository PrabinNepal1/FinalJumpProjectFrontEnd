import axios from "axios";


const baseurl = "http://52.15.184.114:8080/api";

class ResturantService {


    getResturants(){
      return  axios.get(`${baseurl}/restaurants`);
    }
 
    createResturant(resturant){
      return  axios.post(`${baseurl}/restaurant/add`, resturant)
    }
}


export default new ResturantService();