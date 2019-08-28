<template>
    <form @submit.prevent="saveContact">
        <div class="form-group">
            <label for="first-name-input">First name</label>
            <input v-model="firstName" :class="{ 'is-invalid': isFirstNameEmpty }" ref="firstName"
                   type="text" class="form-control" id="first-name-input" aria-describedby="emailHelp" placeholder="Enter first name">
            <div class="invalid-feedback">
                Please enter first name
            </div>
        </div>
        <div class="form-group">
            <label for="last-name-input">Last name</label>
            <input v-model="lastName" :class="{ 'is-invalid': isLastNameEmpty }"
                   type="text" class="form-control" id="last-name-input" aria-describedby="emailHelp" placeholder="Enter last name">
            <div class="invalid-feedback">
                Please enter last name
            </div>
        </div>
        <div class="form-group">
            <label for="phone-number-input">Phone number</label>
            <input v-model="phoneNumber" :class="{ 'is-invalid': isPhoneEmpty || isPhoneDuplicate }"
                   type="text" class="form-control" id="phone-number-input" aria-describedby="emailHelp" placeholder="Enter phone number">
            <div v-if="isPhoneEmpty" class="invalid-feedback">
                Please enter phone number
            </div>
            <div v-if="isPhoneDuplicate" class="invalid-feedback">
                This phone number is already added
            </div>
        </div>
        <button type="submit" class="btn btn-primary mb-2">Save contact</button>
    </form>
</template>

<script>
    export default {
        props: ["is-phone-exist"],
        data: function () {
            return {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                isFirstNameEmpty: false,
                isLastNameEmpty: false,
                isPhoneEmpty: false,
                isPhoneDuplicate: false
            }
        },
        methods: {
            checkInputs: function () {
                let result = true;

                if (this.firstName === "") {
                    this.isFirstNameEmpty = true;
                    result = false;
                } else {
                    this.isFirstNameEmpty = false;
                }

                if (this.lastName === "") {
                    this.isLastNameEmpty = true;
                    result = false;
                } else {
                    this.isLastNameEmpty = false;
                }

                if (this.phoneNumber === "") {
                    this.isPhoneEmpty = true;
                    result = false;
                } else {
                    this.isPhoneEmpty = false;
                }

                return result;
            },
            saveContact: function () {
                this.isPhoneDuplicate = false;

                if (!this.checkInputs()) {
                    return;
                }

                this.$emit("add-contact", {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    phoneNumber: this.phoneNumber
                });
            }
        },
        watch: {
            isPhoneExist: function () {
                if (this.isPhoneExist === null) {
                    return;
                }

                if (this.isPhoneExist) {
                    this.isPhoneDuplicate = true;
                    return;
                }

                this.$emit("set-is-phone-exist-null");

                this.firstName = "";
                this.lastName = "";
                this.phoneNumber = "";
                this.$refs.firstName.focus();
            }
        }
    }
</script>