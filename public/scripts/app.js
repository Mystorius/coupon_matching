/**
 *  @fileOverview main javascript application. It serves five main purposes:
 *  To initialize all materialcss javascript functions.
 *  To register the services worker needed for the progressive web app
 *  To get a connection with the database and create vue objects
 *  To enable .click functions
 *  To show / hide the toggle dialog
 *
 *  @author       Benjamin Pohl
 *
 *  @requires     NPM:firebase
 *  @requires     NPM:firebase-tools
 *  @requires     NPM:Vue
 *  @requires     NPM:VueFirestore
 */

(function () {
    initialize()
    regServiceWorker();
    vueObjects();
    clickFunctions();
    toggleDialog();
})();


/**
 * initializes all materialcss javascript
 * @namespace initialize
 */
function initialize() {
    $(document).ready(function () {
        /**
         * Method to auto-initialize all javascript elements
         * @memberOf initialize
         * @method AutoInit
         */
        M.AutoInit();
        /**
         * Method to disable hover element of button
         * @memberOf initialize
         * @method fixed-action-btn
         */
        $('.fixed-action-btn').floatingActionButton({
            hoverEnabled: false
        });
        /**
         * Method to enable autoclose after a date is picked in datepicker
         * @memberOf initialize
         * @method datepicker
         */
        $('.datepicker').datepicker({
            autoClose: true
        });
    });
};

/**
 * registers service worker into browser sessions
 * @namespace regServiceWorker
 */
function regServiceWorker() {
    /**
     * @memberOf regServiceWorker
     * @method serviceWorker
     * @param serviceWorker {object} detection test to make sure service workers are supported before trying to register one
     */
    if ('serviceWorker' in navigator) {
        /**
         * function to register the service worker for this site
         * @memberOf regServiceWorker
         * @method  register
         * @param service-worker.js {javascript}
         * @throws {error} catch rejected promise
         */
        navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
            console.log('Registration succeeded.');
            document.getElementById('butRefresh').onclick = function () {
                console.log("but clicked");
                /**
                 * updates reg. and cache with button click
                 * @memberOf regServiceWorker
                 * @method  update
                 */
                registration.update();
                // TODO -- refresh data only from service worker + get new from server
            };
        }).catch(function (error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
    }
    ;
};


/**
 * creating firestore connection
 * @namespace firestore
 */
/**
 * @memberOf firestore
 * @method firestoreConnection
 * @return firestore {object}
 */
function firestoreConnection() {
    /**
     * force Vue to use VueFirestore.js for compatibility
     * @memberOf firestore
     * @method Vueuse
     * @param VueFirestore {object}
     */
    Vue.use(VueFirestore);
    /**
     * force Vue to use VueFirestore.js for compatibility
     * @memberOf firestore
     * @var config
     * @type {list}
     */
    var config = {
        apiKey: "AIzaSyAd-4xN4D6R41psL1MEcjnK9nH_TnAFn-c",                  // Auth / General Use
        authDomain: "university-coupon-matching.firebaseapp.com",           // Auth with popup/redirect
        databaseURL: "https://university-coupon-matching.firebaseio.com",   // Realtime Database
        projectId: "university-coupon-matching",                            // Project ID
        storageBucket: "university-coupon-matching.appspot.com",            // Storage
        messagingSenderId: "693279493028"                                   // Cloud Messaging
    };
    /**
     * @memberOf firestore
     * @method initializeApp
     * @param config {list}
     */
    firebase.initializeApp(config);
    /**
     * @memberOf firestore
     * @constant firestore
     * @type {object}
     */
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);

    return firestore
}

/**
 * creating vue objects
 * @namespace vueObjects
 */
/**
 * creates vue objects to use in
 * @memberOf vueObjects
 * @method vueObjects
 */
function vueObjects() {
    var firestore = firestoreConnection();

    /**
     * vue object for coupons today
     * @memberOf vueObjects
     * @method Vue
     * @property {object} data      - default data object
     * @property {number} cafe      - number of cafe coupons today
     * @property {number} cake      - number of cake coupons today
     * @property {number} beverage  - number of beverage coupons today
     * @property {object} create    - get data from database on creation
     */
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
            /**
             * get data from database (firestore)
             * @memberOf vueObjects
             * @method collection
             * @param collection name {string}
             * @param document name {string}
             * @throws {error}
             */
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

    /**
     * vue object for coupons nextDays
     * @memberOf vueObjects
     * @method Vue
     * @property {object} data      - default data object
     * @property {number} cafe      - number of cafe coupons nextDays
     * @property {number} cake      - number of cake coupons nextDays
     * @property {number} beverage  - number of beverage coupons nextDays
     * @property {object} create    - get data from database on creation
     */
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
            /**
             * get data from database (firestore)
             * @memberOf vueObjects
             * @method collection
             * @param collection name {string}
             * @param document name {string}
             * @throws {error}
             */
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

    /**
     * vue object for wishes state
     * @memberOf vueObjects
     * @method Vue
     * @property {object} data      - default data object
     * @property {number} cafe      - default state of cafe wish
     * @property {number} cake      - default state of cake wish
     * @property {number} beverage  - default state of beverage wish
     * @property {object} create    - get data from database on creation
     */
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
            /**
             * get data from database (firestore)
             * @memberOf vueObjects
             * @method collection
             * @param collection name {string}
             * @param document name {string}
             * @throws {error}
             */
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
            /**
             * method to push data to backend (eg. update data)
             * @memberOf vueObjects
             * @method update
             * @param collection name {string}
             * @param document name {string}
             * @throws {error}
             */
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
}

/**
 * Method to initialize all click functions
 * @method clickFunctions
 */
function clickFunctions() {
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
}

/**
 * Method to toggle dialog
 * @method clickFunctions
 */
function toggleDialog() {
    // methods to update / refresh ui elements
    var app = {
        addDialog: document.getElementById('addDialog')
    };

    app.toggleAddDialog = function (visible) {
        if (visible) {
            app.addDialog.classList.remove('hide');
            console.log("show");
        } else {
            app.addDialog.classList.add('hide');
            console.log("hide");
        }
    };
}