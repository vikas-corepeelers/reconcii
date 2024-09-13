import AxiosInstance from "../Utils/AxiosInstance"
export async function requestCallPost(apiName, data) {
    return await AxiosInstance.post(apiName, data, {
      headers: {
        'access-token': localStorage.getItem("token"),
      },
    })
      .then(response => {
        return {
          status: true,
          message: '',
          data: response.data,
        };
      })
      .catch(err => {
        // console.log('==err-=====',err);
        return {
          status: false,
          message: err,
          data: null,
        };
      });
}

export async function requestCallPut(apiName, data) {
    return await AxiosInstance.put(apiName, data, {
      headers: {
        'access-token': localStorage.getItem("token"),
      },
    })
      .then(response => {
        return {
          status: true,
          message: '',
          data: response.data,
        };
      })
      .catch(err => {
        return {
          status: false,
          message: err.toString(),
          data: null,
        };
      });
}

// API request call, get method
export async function requestCallGet(apiName,body) {
    return await AxiosInstance.get(apiName, {
      headers: {
        'access-token': localStorage.getItem("token"),
      },
      params: body,
    })
      .then(response => {
        return {
          status: true,
          message: '',
          data: response.data,
        };
      })
      .catch(err => {
        return {
          status: false,
          message: err,
          data: null,
        };
      });
}

export async function requestCallDelete(apiName,body) {
    return await AxiosInstance.delete(apiName, {
      headers: {
        'access-token': localStorage.getItem("token"),
      },
      params: body,
    })
      .then(response => {
        return {
          status: true,
          message: '',
          data: response.data,
        };
      })
      .catch(err => {
        return {
          status: false,
          message: err,
          data: null,
        };
      });
}

