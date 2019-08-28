import $ from "jquery";

export default {
    post(url, data) {
        return $.post({
            url,
            data: JSON.stringify(data),
            contentType: "application/json"
        });
    },
    get(url, data) {
        return $.get(url, data);
    }
};