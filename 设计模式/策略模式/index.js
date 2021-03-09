class Normal {
    static pay(amount) {
        return amount
    }
}

class Member {
    static pay(amount) {
        return amount * .9
    }
}

class VIP {
    static pay(amount) {
        return amount * .8
    }
}

class Customer {
    constructor() {
        this.customerType = {
            member: amount => Member.pay(amount),
            vip: amount => VIP.pay(amount),
            normal: amount => Normal.pay(amount)
        }
    }

    pay(kind, amount) {
        try {
            return this.customerType[kind](amount)
        }catch (e) {
            console.log(e.message)
        }
    }
}

const customer = new Customer()
console.log(customer.pay('vip', 1000))
