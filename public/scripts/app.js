(function () {
    'use strict';

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

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
            // registration worked
            console.log('Registration succeeded.');
            document.getElementById('butRefresh').onclick = function () {
                console.log("but clicked");
                registration.update();
                // TODO -- refresh data only from service worker + get new from server
            };
        }).catch(function (error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
    }
    ;

    // firestore, firebase
    Vue.use(VueFirestore);
    var config = {
        apiKey: "AIzaSyAd-4xN4D6R41psL1MEcjnK9nH_TnAFn-c",
        authDomain: "university-coupon-matching.firebaseapp.com",
        databaseURL: "https://university-coupon-matching.firebaseio.com",
        projectId: "university-coupon-matching",
        storageBucket: "university-coupon-matching.appspot.com",
        messagingSenderId: "693279493028"
    };
    firebase.initializeApp(config);
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

    // get data from datapase
    new Vue({
        el: '#coupons_today',
        data() {
            return {
                cafe: '0',
                cake: '0',
                beverage: '0'
            }
        },
        created() {
            firestore.collection('coupons').doc("coupons_today").get()
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

    new Vue({
        el: '#coupons_nextDays',
        data() {
            return {
                cafe: '0',
                cake: '0',
                beverage: '0'
            }
        },
        created() {
            firestore.collection('coupons').doc("coupons_nextDays").get()
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

    new Vue({
        el: '#wishes',
        data() {
            return {
                cafe: null,
                cake: null,
                beverage: null,
            }
        },
        created() {
            firestore.collection('coupons').doc("wishes").get()
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
        },
        methods: {
            update: function () {
                firestore.collection("coupons").doc("wishes").update({
                    cafe: this.cafe,
                    cake: this.cake,
                    beverage: this.beverage,
                })
                    .then(function () {
                        console.log("Document successfully updated!");
                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }
        }
    });

    var app = {
        addDialog: document.getElementById('addDialog')
    };

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