/*
Header Comments:
Name: Jaden Parris, Nathaniel Mais
Student ID: 100774161 and <100843860>
Date of completion: April 13th, 2024
*/

namespace core {

    export class User {
        private _displayName: string;
        private _emailAddress: string;
        private _username: string;
        private _password: string;

        // Getter and setter for 'displayName'
        get displayName(): string {
            return this._displayName;
        }
        set displayName(value: string) {
            this._displayName = value;
        }

        // Getter and setter for 'emailAddress'
        get emailAddress(): string {
            return this._emailAddress;
        }
        set emailAddress(value: string) {
            this._emailAddress = value;
        }

        // Getter and setter for 'username'
        get username(): string {
            return this._username;
        }
        set username(value: string) {
            this._username = value;
        }

        // Getter and setter for 'password'
        get password(): string {
            return this._password;
        }
        set password(value: string) {
            this._password = value;
        }

        // Method to convert user object to a string representation
        toString(): string {
            return `Display Name: ${this._displayName}\nEmail Address: ${this._emailAddress}\nUsername: ${this._username}`;
        }

        // Method to convert user object to JSON
        toJSON(): object {
            return {
                DisplayName: this._displayName,
                EmailAddress: this._emailAddress,
                Username: this._username,
                Password: this._password
            };
        }

        // Method to populate user object from JSON data
        fromJSON(data: { DisplayName: string; EmailAddress: string; Username: string; Password: string }): void {
            this._displayName = data.DisplayName;
            this._emailAddress = data.EmailAddress;
            this._username = data.Username;
            this._password = data.Password;
        }

        // Method to serialize user object to a comma-separated string
        serialize(): string | null {
            if (this._displayName !== "" && this._emailAddress !== "" && this._username !== "") {
                return `${this._displayName}, ${this._emailAddress}, ${this._username}`;
            }
            console.error("Failed to serialize, one or more user attributes were missing");
            return null;
        }

        // Method to deserialize user object from a comma-separated string
        deserialize(data: string): void {
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
        }

        // Constructor for the User class
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }
    }
}