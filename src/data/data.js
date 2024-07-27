import axios from "axios"

export const getJsonPlasholterApiData = async() =>{
    try {
       const response = await  axios.get('https://jsonplaceholder.typicode.com/posts')
       return response;
    } catch (error) {
        console.log(error)
    }
}

export const deleteJsonPlasholterApiData = async(id) =>{
    try {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const putJsonPlasholterApiData = async(id)=>{
    try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`)
        return response ;
    } catch (error) {
        console.log(error)
    }
}


export const Demo = async (id, data) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error updating data: ", error);
      throw error;
    }
  };