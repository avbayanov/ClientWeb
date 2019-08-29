<template>
    <div class="batch-delete-popup" :class="{ 'active': isSidebarActive }">
        <div class="container batch-delete-container">
            <p class="batch-delete-text">
                You chose {{ checked.length }}
                contact<span v-if="checked.length > 1">s</span>
            </p>
            <button @click="doRemove" type="button" id="batch-delete-button" class="btn btn-danger batch-delete-button">Delete</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["checked", "isSidebarActive"],
        template: "#batch-remove-popup-template",
        methods: {
            doRemove: function () {
                this.$emit("remove-checked");
            }
        }
    };
</script>