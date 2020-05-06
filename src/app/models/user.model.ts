export class User {
  constructor(
        public firstName : string,
        public lastName : string,
        public emailAddress : string,
        public drinkPreference : string,
        public hobbies? : string[]
    ) {}
}