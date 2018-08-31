## Objects

<dl>
<dt><a href="#initialize">initialize</a> : <code>object</code></dt>
<dd><p>initializes all materialcss javascript</p>
</dd>
<dt><a href="#regServiceWorker">regServiceWorker</a> : <code>object</code></dt>
<dd><p>registers service worker into browser sessions</p>
</dd>
<dt><a href="#firestore">firestore</a> : <code>object</code></dt>
<dd><p>creating firestore connection</p>
</dd>
<dt><a href="#vueObjects">vueObjects</a> : <code>object</code></dt>
<dd><p>creating vue objects</p>
</dd>
<dt><a href="#serviceWorker">serviceWorker</a> : <code>object</code></dt>
<dd><p>onfiguration and initialisation of the service worker (sw)</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#clickFunctions">clickFunctions()</a></dt>
<dd><p>Method to initialize all click functions</p>
</dd>
<dt><a href="#clickFunctions">clickFunctions()</a></dt>
<dd><p>Method to toggle dialog</p>
</dd>
</dl>

<a name="initialize"></a>

## initialize : <code>object</code>
initializes all materialcss javascript

**Kind**: global namespace  

* [initialize](#initialize) : <code>object</code>
    * [.AutoInit()](#initialize.AutoInit)
    * [.fixed-action-btn()](#initialize.fixed-action-btn)
    * [.datepicker()](#initialize.datepicker)

<a name="initialize.AutoInit"></a>

### initialize.AutoInit()
Method to auto-initialize all javascript elements

**Kind**: static method of [<code>initialize</code>](#initialize)  
<a name="initialize.fixed-action-btn"></a>

### initialize.fixed-action-btn()
Method to disable hover element of button

**Kind**: static method of [<code>initialize</code>](#initialize)  
<a name="initialize.datepicker"></a>

### initialize.datepicker()
Method to enable autoclose after a date is picked in datepicker

**Kind**: static method of [<code>initialize</code>](#initialize)  
<a name="regServiceWorker"></a>

## regServiceWorker : <code>object</code>
registers service worker into browser sessions

**Kind**: global namespace  

* [regServiceWorker](#regServiceWorker) : <code>object</code>
    * [.serviceWorker(serviceWorker)](#regServiceWorker.serviceWorker)
    * [.register()](#regServiceWorker.register)
    * [.update()](#regServiceWorker.update)

<a name="regServiceWorker.serviceWorker"></a>

### regServiceWorker.serviceWorker(serviceWorker)
**Kind**: static method of [<code>regServiceWorker</code>](#regServiceWorker)  

| Param | Type | Description |
| --- | --- | --- |
| serviceWorker | <code>object</code> | detection test to make sure service workers are supported before trying to register one |

<a name="regServiceWorker.register"></a>

### regServiceWorker.register()
function to register the service worker for this site

**Kind**: static method of [<code>regServiceWorker</code>](#regServiceWorker)  
**Throws**:

- <code>error</code> catch rejected promise


| Param | Type |
| --- | --- |
| service-worker.js | <code>javascript</code> | 

<a name="regServiceWorker.update"></a>

### regServiceWorker.update()
updates reg. and cache with button click

**Kind**: static method of [<code>regServiceWorker</code>](#regServiceWorker)  
<a name="firestore"></a>

## firestore : <code>object</code>
creating firestore connection

**Kind**: global namespace  

* [firestore](#firestore) : <code>object</code>
    * [.config](#firestore.config) : <code>list</code>
    * [.firestore](#firestore.firestore) : <code>object</code>
    * [.firestoreConnection()](#firestore.firestoreConnection) ⇒ <code>object</code>
    * [.Vueuse(VueFirestore)](#firestore.Vueuse)
    * [.initializeApp(config)](#firestore.initializeApp)

<a name="firestore.config"></a>

### firestore.config : <code>list</code>
force Vue to use VueFirestore.js for compatibility

**Kind**: static property of [<code>firestore</code>](#firestore)  
<a name="firestore.firestore"></a>

### firestore.firestore : <code>object</code>
**Kind**: static constant of [<code>firestore</code>](#firestore)  
<a name="firestore.firestoreConnection"></a>

### firestore.firestoreConnection() ⇒ <code>object</code>
**Kind**: static method of [<code>firestore</code>](#firestore)  
**Returns**: <code>object</code> - firestore  
<a name="firestore.Vueuse"></a>

### firestore.Vueuse(VueFirestore)
force Vue to use VueFirestore.js for compatibility

**Kind**: static method of [<code>firestore</code>](#firestore)  

| Param | Type |
| --- | --- |
| VueFirestore | <code>object</code> | 

<a name="firestore.initializeApp"></a>

### firestore.initializeApp(config)
**Kind**: static method of [<code>firestore</code>](#firestore)  

| Param | Type |
| --- | --- |
| config | <code>list</code> | 

<a name="vueObjects"></a>

## vueObjects : <code>object</code>
creating vue objects

**Kind**: global namespace  

* [vueObjects](#vueObjects) : <code>object</code>
    * [.vueObjects()](#vueObjects.vueObjects)
    * [.Vue()](#vueObjects.Vue)
    * [.collection(collection, document)](#vueObjects.collection)
    * [.Vue()](#vueObjects.Vue)
    * [.collection(collection, document)](#vueObjects.collection)
    * [.Vue()](#vueObjects.Vue)
    * [.collection(collection, document)](#vueObjects.collection)
    * [.update(collection, document)](#vueObjects.update)

<a name="vueObjects.vueObjects"></a>

### vueObjects.vueObjects()
creates vue objects to use in

**Kind**: static method of [<code>vueObjects</code>](#vueObjects)  
<a name="vueObjects.Vue"></a>

### vueObjects.Vue()
vue object for coupons today

**Kind**: static method of [<code>vueObjects</code>](#vueObjects)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | default data object |
| cafe | <code>number</code> | number of cafe coupons today |
| cake | <code>number</code> | number of cake coupons today |
| beverage | <code>number</code> | number of beverage coupons today |
| create | <code>object</code> | get data from database on creation |

<a name="vueObjects.collection"></a>

### vueObjects.collection(collection, document)
get data from database (firestore)

**Kind**: static method of [<code>vueObjects</code>](#vueObjects)  
**Throws**:

- <code>error</code> 


| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | name |
| document | <code>string</code> | name |

<a name="vueObjects.Vue"></a>

### vueObjects.Vue()
vue object for coupons nextDays

**Kind**: static method of [<code>vueObjects</code>](#vueObjects)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | default data object |
| cafe | <code>number</code> | number of cafe coupons nextDays |
| cake | <code>number</code> | number of cake coupons nextDays |
| beverage | <code>number</code> | number of beverage coupons nextDays |
| create | <code>object</code> | get data from database on creation |

<a name="vueObjects.collection"></a>

### vueObjects.collection(collection, document)
get data from database (firestore)

**Kind**: static method of [<code>vueObjects</code>](#vueObjects)  
**Throws**:

- <code>error</code> 


| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | name |
| document | <code>string</code> | name |

<a name="vueObjects.Vue"></a>

### vueObjects.Vue()
vue object for wishes state

**Kind**: static method of [<code>vueObjects</code>](#vueObjects)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | default data object |
| cafe | <code>number</code> | default state of cafe wish |
| cake | <code>number</code> | default state of cake wish |
| beverage | <code>number</code> | default state of beverage wish |
| create | <code>object</code> | get data from database on creation |

<a name="vueObjects.collection"></a>

### vueObjects.collection(collection, document)
get data from database (firestore)

**Kind**: static method of [<code>vueObjects</code>](#vueObjects)  
**Throws**:

- <code>error</code> 


| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | name |
| document | <code>string</code> | name |

<a name="vueObjects.update"></a>

### vueObjects.update(collection, document)
method to push data to backend (eg. update data)

**Kind**: static method of [<code>vueObjects</code>](#vueObjects)  
**Throws**:

- <code>error</code> 


| Param | Type | Description |
| --- | --- | --- |
| collection | <code>string</code> | name |
| document | <code>string</code> | name |

<a name="serviceWorker"></a>

## serviceWorker : <code>object</code>
onfiguration and initialisation of the service worker (sw)

**Kind**: global namespace  

* [serviceWorker](#serviceWorker) : <code>object</code>
    * [.cacheName](#serviceWorker.cacheName) : <code>string</code>
    * [.filesToCache](#serviceWorker.filesToCache) : <code>array</code>
    * [.install()](#serviceWorker.install)
    * [.fetch()](#serviceWorker.fetch)
    * [.activate()](#serviceWorker.activate)

<a name="serviceWorker.cacheName"></a>

### serviceWorker.cacheName : <code>string</code>
Providing a cache name allows to version files, or separate data from the app shell.

**Kind**: static property of [<code>serviceWorker</code>](#serviceWorker)  
<a name="serviceWorker.filesToCache"></a>

### serviceWorker.filesToCache : <code>array</code>
Array of all files that will be cached

**Kind**: static property of [<code>serviceWorker</code>](#serviceWorker)  
<a name="serviceWorker.install"></a>

### serviceWorker.install()
open the cache with caches.open() and provide a cache name.call cache.addAll(), which takes an array and adds every item to the cache.caution: cache.addAll() is atomic!

**Kind**: static method of [<code>serviceWorker</code>](#serviceWorker)  
<a name="serviceWorker.fetch"></a>

### serviceWorker.fetch()
caches.match() evaluates the web request that triggered the fetch event, and checks to see if it's available in the cache.It then either responds with the cached version, or uses fetch to get a copy from the network.Here it checks if network can be reached and if not, serves either a custom offline page, or the last cache available.The response is passed back to the web page with event.respondWith().

**Kind**: static method of [<code>serviceWorker</code>](#serviceWorker)  
<a name="serviceWorker.activate"></a>

### serviceWorker.activate()
To ensures that service worker updates its cache whenever any of the app shell files change.In order for this to work, you'd need to increment the cacheName variable at the top of your service worker file.

**Kind**: static method of [<code>serviceWorker</code>](#serviceWorker)  
<a name="clickFunctions"></a>

## clickFunctions()
Method to initialize all click functions

**Kind**: global function  
<a name="clickFunctions"></a>

## clickFunctions()
Method to toggle dialog

**Kind**: global function  
