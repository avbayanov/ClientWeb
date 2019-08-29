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

<style lang="scss">
    @import "../stylesheets/sidebarWidth";

    .batch-delete-popup {
        position: fixed;
        left: $sidebarWidth;
        bottom: 0;
        z-index: 50;

        @include fullWidthWithoutSidebar;

        background-color: #fff;
        box-shadow:0 0 10px rgba(0, 0, 0, 0.1);
        transition: all 0.4s;
    }

    @media (max-width: 768px) {
        .batch-delete-popup {
            left: 0;
            width: 100%;
        }

        .batch-delete-popup.active {
            left: $sidebarWidth;
            @include fullWidthWithoutSidebar;
        }
    }

    .batch-delete-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
        align-content: space-around;
    }

    .batch-delete-text {
        margin: 14px 0;
    }

    .batch-delete-button {
        padding: 6px;
    }
</style>