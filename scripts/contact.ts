"use strict"; // Enforce stricter parsing and error handling in your code

namespace core { // Define a namespace for encapsulation

    export class Contact {
        // Private properties to hold contact information
        private _fullName:string;
        private _contactNumber:string;
        private _emailAddress:string;

        // Constructor to initialize the contact properties
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this._fullName = fullName;
            this._contactNumber = contactNumber;
            this._emailAddress = emailAddress;
        }

        // Getter for fullName
        public get fullName():string {
            return this._fullName;
        }

        // Setter for fullName
        public set fullName(value:string) {
            this._fullName = value;
        }

        // Getter for contactNumber
        public get contactNumber():string {
            return this._contactNumber;
        }

        // Setter for contactNumber
        public set contactNumber(value:string) {
            this._contactNumber = value;
        }

        // Getter for emailAddress
        public get emailAddress():string {
            return this._emailAddress;
        }

        // Setter for emailAddress
        public set emailAddress(value:string) {
            this._emailAddress = value;
        }

        // Method to return a string representation of the contact
        public toString(): string {
            return `FullName ${this._fullName}\n
        ContactNumber ${this._contactNumber}\n
        EmailAddress ${this._emailAddress}`;
        }

        /**
         * Serialize the contact information for storing in local storage.
         * Returns a serialized string or null if properties are missing.
         */
        public serialize():string|null {
            if (this._fullName !== "" && this._contactNumber !== "" && this._emailAddress !== "") {
                return `${this._fullName}, ${this._contactNumber}, ${this._emailAddress}`;
            }
            console.error("One or more of the contact properties are missing or invalid");
            return null;
        }

        /**
         * Deserialize to load and set the contact properties from a given string.
         * Expects a comma-separated values string.
         */
        public deserialize(data:string) {
            let propertyArray = data.split(",");
            this._fullName = propertyArray[0].trim();
            this._contactNumber = propertyArray[1].trim();
            this._emailAddress = propertyArray[2].trim();
        }
    }
}