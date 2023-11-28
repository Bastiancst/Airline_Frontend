export class PassengerInfo {
    constructor(
        public clientId: string,
        public flightPlanningId: string,
        public name: string,
        public lastName: string,
        public identityDocument: string,
        public age: number,
        public address: string,
        public phoneNumber: string,
        public email: string,
        public seatNumber: number,
        public isCopyDocumentEmail: boolean   
    ){}
} 