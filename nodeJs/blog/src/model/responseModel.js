class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = message
            data = null
            message = null
        }

        this.data = data
        this.message = message
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.status = 200
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message, status) {
        super(data, message)
        this.status = status
    }
}

module.exports = { SuccessModel, ErrorModel }
