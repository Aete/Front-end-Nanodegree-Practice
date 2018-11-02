function appViewModel() {
    var self = this;
    //this part if for filter
    this.chosenCategory = ko.observable();
    this.menuView = 0;

    //set the default menu bar as closed
    this.menuicon = ko.observable('');
    this.menuClicked = function () {
        if (self.menuView === 0) {
            this.menuicon('');
            self.menuView = 1;
            menuMove();
        }
        else {
            this.menuicon('');
            self.menuView = 0;
            menuMove();
        }
    };

    // this function is related to moving of navigation menu
    function menuMove() {
        var $menu = $('#menu');
        var $map = $('#map');
        if (self.menuView === 1) {
            $menu.css('left', '0');
            $map.css('width', 'calc(100% - 310px)');
        }
        else {
            $menu.css('left', '-265px');
            $map.css('width', 'calc(100% - 45px)');
        }
    }

    //set the categories
    this.categories = [
        {name: 'All'},
        {name: 'Academy'},
        {name: 'Museum'},
        {name: 'Store'},
        {name: 'Restaurant'}
    ];

    //this part is for map
    this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.360041, lng: -71.094175},
        zoom: 15,
        styles: styles
    });
    //declare marker as empty array
    this.markers = [];
    //put the default markers on the maps
    for (var i = 0; i < loc_defalut.length; i++) {
        var lat = loc_defalut[i].lat;
        var lng = loc_defalut[i].lng;
        var position = new google.maps.LatLng(loc_defalut[i].lat, loc_defalut[i].lng);
        var title = loc_defalut[i].name;
        var category = loc_defalut[i].category;
        var marker = new google.maps.Marker({
            id: i,
            lat : lat,
            lng : lng,
            position: position,
            map: this.map,
            title: title,
            category: category,
            animation: google.maps.Animation.DROP
        });

        this.markers.push(marker);
        //declare variation for infowindow : I bring this sentence from our udacity lecture : front-end developer nanodegree
        var largeInfowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();
        // Reset the Boundary
        bounds.extend(marker.position);
        // show the window when marker was clicked
        marker.addListener('click', function () {
            populateInfoWindow(this, largeInfowindow);
            this.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout((function() {this.setAnimation(null);}).bind(this), 2000);
            this.map.setCenter(marker.position); // change the map center
        });


    }

    //I bring this function from our udacity lecture : front-end developer nanodegree
    function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent('');
            //foursquare id and secret
            var id = "LTEKG3QFXOFQAXBZ01YQBCOSWFP3MD3S42VAPTI40H2UBCMB";
            var secret =
                "A0ROH2C0RKLA422ZZ1ADCYPSPHGKNCVXNOKSEWCUYXB33ZE3";
            // URL for Foursquare API
            var url = 'https://api.foursquare.com/v2/venues/search?ll=' +
                marker.lat + ',' + marker.lng + '&client_id=' +id +
                '&client_secret=' + secret + '&query=' + marker.title +
                '&v=20171223' + '&m=foursquare';
            //get the JSON data
            $.getJSON(url)
                .done(function(data) {
                var result = data.response.venues[0];
                var address = result.location.address? result.location.address : "Information not available";
                var usage = result.categories['0'].name;
                var address2 = result.postalCode? result.postalCode : "Information not available" ;
                var state = result.location.formattedAddress[1]? result.location.formattedAddress[1]:"Information not available";
                infowindow.setContent(
                    '<div class="'+marker.category+'">' +marker.title + '</div>'+
                    '<div>' + address + '</div>'+
                    '<div>' + usage + '</div>'+
                    '<div>' + state + '</div>'
                );
            })
                .fail(function(){
                    alert('FourSquare is not load.');
                });

            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function () {
                infowindow.setMarker = null;
            });
        }
        infowindow.addListener('closeclick', function () {
            infowindow.marker = null;
        });
    }

    //set the empty value for searching keyword
    this.searchKeyword = ko.observable('');
    // this part define searching-result
    this.searchResult = ko.computed(function () {
        var result = [];
        var keyword = self.searchKeyword().toLowerCase();
        if (self.chosenCategory() === undefined || self.chosenCategory().name === "All") {
            for (var i = 0; i < self.markers.length; i++) {
                if (self.markers[i].title.toLowerCase().indexOf(keyword) !== -1) {
                    self.markers[i].setVisible(true);
                    result.push(self.markers[i]);
                }
                else {
                    self.markers[i].setVisible(false);
                }
            }
        }
        else {
            for (var i = 0; i < self.markers.length; i++) {
                if (self.markers[i].title.toLowerCase().indexOf(keyword) !== -1 && self.markers[i].category === self.chosenCategory().name) {
                    self.markers[i].setVisible(true);
                    result.push(self.markers[i]);
                }
                else {
                    self.markers[i].setVisible(false);
                }
            }
        }
        return result;
    }, this);

    //this function get infomation from foursquare


    this.openWindow = function () {
        populateInfoWindow(this, largeInfowindow);
        this.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout((function() {this.setAnimation(null);}).bind(this), 1000);
        this.map.setCenter(new google.maps.LatLng(42.360041, -71.094175)); // change the map center
        for (var i = 0; i < self.markers.length; i++) {
            bounds.extend(self.markers[i].position);
        }
    };
}

function mapError(){
    alert(
        'There was some problem in loading process. Please Check the Javascript Console!'
    );
}

function startApplication(){
    ko.applyBindings(new appViewModel());
}
