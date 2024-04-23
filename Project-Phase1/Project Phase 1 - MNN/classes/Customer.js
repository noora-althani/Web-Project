export class Customer{
    //ustomer has a name, surname, shipping address, username, password, and money balance. 
    constructor(firstName, lastName, shipping_address, username, password, money_balance){
        this.firstName = firstName
        this.lastName = lastName
        this.shipping_address = shipping_address
        this.username = username
        this.password = password
        this.money_balance = money_balance
    }
}