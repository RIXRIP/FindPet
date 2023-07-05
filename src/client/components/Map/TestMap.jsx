import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";


const TestMap = (props) => {
    // let dist = 0;
    //
    // function distance(coord1, coord2) {
    //
    //     const R = 6371; // Радиус Земли в км
    //     const dLat = (coord2[0] - coord1[0]) * (Math.PI / 180); // Разница широты в радианах
    //     const dLon = (coord2[1] - coord1[1]) * (Math.PI / 180); // Разница долготы в радианах
    //
    //     const a =
    //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //         Math.cos(coord1[0] * (Math.PI / 180)) *
    //         Math.cos(coord1[0] * (Math.PI / 180)) *
    //         Math.sin(dLon / 2) *
    //         Math.sin(dLon / 2);
    //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //
    //     dist = R * c; // Расстояние в км
    // }
    //
    // let currentCoordinate = [58.6, 49.6]
    // let closePoints = []
    // let arr = [[58.6, 49.6], [58.60500, 49.6], [58.65500, 49.6]]
    //
    // for (let i = 0; i < arr.length; i++) {
    //     if (JSON.stringify(currentCoordinate) !== JSON.stringify(arr[i])) {
    //         distance(currentCoordinate, arr[i])
    //         if (dist <= 1) {
    //             closePoints.push(currentCoordinate, arr[i])
    //         }
    //     }
    //
    // }

    //
    // return (
    //     <body>
    //
    //     <YMaps query={{apikey: 'e1ae090b-c5a1-4bdc-b741-e4dc34388928'}}>
    //         <Map defaultState={{
    //
    //             center: [58.6, 49.6], zoom: 9,
    //             controls: []
    //         }
    //         }>
    //             {
    //                 closePoints.map(points =>
    //                     points.map(p => <Placemark
    //                         geometry={points}
    //                         options={{
    //                             draggable: true,
    //                         }}/>
    //                     )
    //                 )}
    //         </Map>
    //     </YMaps>
    //     </body>
    // );
}
export default TestMap;