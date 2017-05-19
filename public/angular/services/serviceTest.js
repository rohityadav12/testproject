test_app.service('ServiceTest', function () {

    var value;

    this.getValue = function () {
        return value;
    };

    this.setValue = function (val) {
        value = val;
    };
});
