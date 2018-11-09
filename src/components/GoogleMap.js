import React from 'react';

import './css/googleMap.css';

class GoogleMap extends React.Component {
    state = {
        data: this.props,
        options: {
            zoom: 10,
            center: { lat: 37.3688, lng: -122.0363 }
        }
    }



    renderMap = () => {

        loadScript('https://maps.googleapis.com/maps/api/js?key={Your Google API KEY}&callback=initMap');
        window.initMap = this.initMap;
    }
    componentDidMount() {
        this.renderMap();
        console.log("CDM area GM", this.props);
    }
    componentDidUpdate() {
        this.renderMap();
    }
    componentWillReceiveProps(next) {

        console.log("Update Area GM", next);
        this.setState({
            data: next, options: {
                zoom: 10,
                center: { lat: next.lat, lng: next.lon }
            }
        });
        console.log("Update geo", next.lat);
        this.renderMap();
        // window.initMap;
    }

    initMap = () => {

        // console.log(this.state.data)
        // let options = {
        //     zoom: 10,
        //     center: { lat: 37.3688, lng: -122.0363 }
        // }
        // console.log(props)

        // if (this.state.data.lat) {
        //     options = {
        //         center: { lat: this.state.data.lat, lng: this.state.data.lon }
        //     };
        //     console.log(this.state.data.lat, this.state.data.lon);
        // }

        // var directionsService = new window.google.maps.DirectionsService;//direction
        // var directionsDisplay = new window.google.maps.DirectionsRenderer;//direction
        console.log(this.state.options);
        let map = new window.google.maps.Map(document.getElementById("map"), this.state.options);
        // directionsDisplay.setMap(map);
        // var onChangeHandler = function () {
        //     calculateAndDisplayRoute(directionsService, directionsDisplay);
        // };//direction
        // document.getElementById('start').addEventListener('change', onChangeHandler);//direction
        // document.getElementById('end').addEventListener('change', onChangeHandler);//direction

        //icon image
        let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

        function addMarker(props) {
            let marker = new window.google.maps.Marker({
                position: props.coords,
                map: map
            });

            if (props.iconImg) {
                marker.setIcon(props.iconImg);
            }
            if (props.content) {
                let infoWindow = new window.google.maps.InfoWindow({
                    content: props.content
                });
                marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                });
            }
        }
        let markers = [

            {
                coords: { lat: this.state.data.lat, lng: this.state.data.lon },
                // coords: { lat: this.state.options.center.lat, lng: this.state.options.center.lgn },
                title: this.state.data.city,
                // content: "<h1>Sunnyvale, CA - 94086</h1>"
            }
            // {
            //     coords: { lat: 37.5483, lng: -121.9886 },
            //     content: "<h1>Fremont, CA</h1>"
            // }
        ];

        for (let i = 0; i < markers.length; i++) {
            addMarker(markers[i]);
        }
        window.google.maps.event.addListener(map, "click", (event) => {
            // let latlon = event.latLng;
            // console.log(latlon.lat());
            // console.log(latlon.lng());
            // this.setState({
            //     options: {
            //         zoom: 10,
            //         center: { lat: latlon.lat(), lng: latlon.lng() }
            //     }
            // });
            // console.log(this.state);

            addMarker({
                coords: event.latLng
            });


        });
    }
    // google api directions function
    // calculateAndDisplayRoute(directionsService, directionsDisplay) {
    //     directionsService.route({
    //       origin: document.getElementById('start').value,
    //       destination: document.getElementById('end').value,
    //       travelMode: 'DRIVING'
    //     }, function(response, status) {
    //       if (status === 'OK') {
    //         directionsDisplay.setDirections(response);
    //       } else {
    //         window.alert('Directions request failed due to ' + status);
    //       }
    //     });
    //   }
    render() {
        return (
            <div className="" id="map"></div>
        )
    }
}

function loadScript(url) {
    const index = window.document.getElementsByTagName('script')[0];
    const script = window.document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}

export default GoogleMap;











// <h1>My Google Map</h1>


//     <div id="map"></div>



// 	function initMap() {
//     let options = {
//         zoom: 10,
//         center: { lat: 37.3688, lng: -122.0363 }
//     };

//     let map = new google.maps.Map(document.getElementById("map"), options);

//     //icon image
//     let image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';

//     function addMarker(props) {
//         let marker = new google.maps.Marker({
//             position: props.coords,
//             map: map
//         });

//         if (props.iconImg) {
//             marker.setIcon(props.iconImg);
//         }
//         if (props.content) {
//             let infoWindow = new google.maps.InfoWindow({
//                 content: props.content
//             });
//             marker.addListener('click', () => {
//                 infoWindow.open(map, marker);
//             });
//         }
//     }
//     let markers = [

//         {
//             coords: { lat: 37.3688, lng: -122.0363 },
//             title: "Home",
//             content: "<h1>Sunnyvale, CA - 94086</h1>"
//         },
//         {
//             coords: { lat: 37.5483, lng: -121.9886 },
//             content: "<h1>Fremont, CA</h1>"
//         }
//     ];

//     for (let i = 0; i < markers.length; i++) {
//         addMarker(markers[i]);
//     }
//     google.maps.event.addListener(map, "click", (event) => {
//         addMarker({
//             coords: event.latLng
//         });
//     });
// }
// </script >
// < !--The gogle script below wants YOU to create a fuction called initMap, Must be placed above google script-- >
// < !--this is the key: AIzaSyBvabLAKS9nHIwaLkgGWa2UJZFBGduKGSo-- >
//     <script src="https://maps.googleapis.com/maps/api/js?key={API KEY}&callback=initMap"
//         async defer></script>
// </body >