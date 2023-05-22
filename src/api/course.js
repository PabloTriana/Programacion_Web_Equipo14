import { ENV } from "../utils"


export class Courses {
    baseApi = ENV.BASE_API;


    //crear cursos

    async createCourse(accessToken, data) {
        try {

            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if (data.file) {
                formData.append("miniature", data.file);
            }

            //peticion
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}`
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 201) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    async getCourses(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const url = `${this.baseApi}/${ENV.API_ROUTES.COURSE}?${pageFilter}&${limitFilter}`

            const response = await fetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw (error)
        }
    }
}