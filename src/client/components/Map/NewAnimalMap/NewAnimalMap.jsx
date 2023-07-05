import {YMaps, Map, Circle} from '@pbe/react-yandex-maps';
import styles from "../Map.module.scss"

const NewAnimalMap = (props) => {


    return <YMaps query={{apikey: 'e1ae090b-c5a1-4bdc-b741-e4dc34388928'}}>
        <div>
            <Map className={styles.map} defaultState={{
                center: [58.6, 49.6], zoom: 9,
                controls: []
            }}
            >
                <Circle
                    geometry={[props.coordinate, props.size]}
                    options={{
                        draggable: true,
                        fillColor: "#DB709377",
                        strokeColor: "#990066",
                        strokeOpacity: 0.8,
                        strokeWidth: 5,
                    }}
                    onDragEnd={e => props.setNewCoordinate(e.get('target').geometry.getCoordinates())}
                />
            </Map>

            Область поиска:
            <button className={styles.button} value={250} onClick={e => props.circleSize(e)}>+</button>
            <input type={"number"} value={props.size} onChange={e => props.inputSize(e)} className={styles.inputSize}/>
            <button className={styles.button} value={-250} onClick={e => props.circleSize(e)}>-</button>

        </div>
    </YMaps>


};

export default NewAnimalMap;