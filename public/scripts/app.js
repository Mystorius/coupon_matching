(function () {
    'use strict';

    // register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () {
                console.log('Service Worker Registered');
            });
    }

    // firestore, firebase
    var config = {
        apiKey: "",
        authDomain: "university-coupon-matching.firebaseapp.com",
        databaseURL: "https://university-coupon-matching.firebaseio.com",
        projectId: "university-coupon-matching",
    };
    firebase.initializeApp(config);
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

    // get data from datapase
    var coupons_today = new Vue({
        el: '#coupons_today',
        data() {
            return {
                cafe: '0',
                cake: '0',
                beverage: '0'
            }
        },
        created() {
            firebase.firestore().collection('coupons').doc("coupons_today").get()
                .then(doc => {
                    if (doc) {
                        var data = doc.data()
                        this.cafe = data.cafe
                        this.cake = data.cake
                        this.beverage = data.beverage
                    } else {
                        console.log('No document exists')
                    }
                }).catch(error => {
                console.log('Error: ' + error)
            })
        }
    });

    var coupons_nextDays = new Vue({
        el: '#coupons_nextDays',
        data() {
            return {
                cafe: '0',
                cake: '0',
                beverage: '0'
            }
        },
        created() {
            firebase.firestore().collection('coupons').doc("coupons_nextDays").get()
                .then(doc => {
                    if (doc) {
                        var data = doc.data()
                        this.cafe = data.cafe
                        this.cake = data.cake
                        this.beverage = data.beverage
                    } else {
                        console.log('No document exists')
                    }
                }).catch(error => {
                console.log('Error: ' + error)
            })
        }
    });

    var app = {
        addDialog: document.getElementById('addDialog')
    };

    // initialization
    $(document).ready(function () {
        M.AutoInit();
        $('.fixed-action-btn').floatingActionButton({
            hoverEnabled: false
        });
        $('.datepicker').datepicker({
            autoClose: true
        });
    });

    // add some event listeners
    document.getElementById('butRefresh').addEventListener('click', function () {
        console.log("but clicked");
        // TODO -- refresh data only from service worker
    });

    // add click functions
    $('#addCafe').click(function () {
        $("#selectOptions").find('option:eq(0)').prop('selected', true);
        $('select').formSelect();
    });

    $('#addBeverage').click(function () {
        $("#selectOptions").find('option:eq(1)').prop('selected', true);
        $('select').formSelect();
    });

    $('#addPastry').click(function () {
        $("#selectOptions").find('option:eq(2)').prop('selected', true);
        $('select').formSelect();
    });

    $("#selectOptions").attr('selected', 'selected');


    // methods to update / refresh ui elements
    app.toggleAddDialog = function (visible) {
        if (visible) {
            app.addDialog.classList.remove('hide');
            console.log("show");
        } else {
            app.addDialog.classList.add('hide');
            console.log("hide");
        }
    };

})();