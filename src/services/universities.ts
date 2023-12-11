import connection from "../config";

export class UniversitiesServices {
    async getAllUniv() {
        const { data } = await connection.get("/search?country=indonesia&limit=10/")
        return data
    }
}