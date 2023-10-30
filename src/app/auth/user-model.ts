export class User{
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        public expirationdate : Date
    ){}

    get token(){
        if(!this.expirationdate || new Date()> this.expirationdate)
        {
            return null;
        }
        return this._token
    }
}