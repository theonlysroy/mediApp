export class ApiResponse {
    public statusCode: number
    public succees: boolean
    public message: string
    public data: {}

    constructor(statusCode: number, message: string, data?: [] | {}) {
        this.statusCode = statusCode
        this.succees = statusCode >= 200 && statusCode < 400
        this.message = message || ""
        this.data = data || []
    }
}