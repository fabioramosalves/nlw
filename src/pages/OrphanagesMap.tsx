import React, {useEffect, useState} from 'react';
import mapMarckerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';

import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import { FiPlus, FiArrowRight } from 'react-icons/fi';

import {Link} from 'react-router-dom';
import mapIcon from '../utils/mapIcons';
import api from '../services/api';

interface Orphanage{
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    console.log (orphanages);

    useEffect(()=> {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });
    }, []);

    return (
     <div id="page-map">
         <aside>
             <header>
                 <img src={mapMarckerImg} alt="" />
                 <h2>Escolha um orfanato no mapa</h2>
                 <p>Muitas crianças estão esperando a sua visita :)</p>
             </header>

             <footer>
                 <strong>Mauá</strong>
                 <span>São Paulo</span>
             </footer>
         </aside>
         <Map     
            center={[-23.6578535,-46.4296952]}
            zoom={15}
            style={{width: '100%', height: '100%'}}
         >
             <TileLayer
             url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
             
             {
                 orphanages.map(orphanage => {
                return (
                    <Marker 
                    key={orphanage.id}
                    icon={mapIcon}
                    position= {[orphanage.latitude, orphanage.longitude]}       
                    >
                    <Popup closeButton={false} minWidth={240} maxHeight={240}
                    className="map-popup"
                    >
                        {orphanage.name}
                        <Link to={`/Orphanages/${orphanage.id}`}>
                            <FiArrowRight size={20} color="#FFF"/>
                        </Link>
                    </Popup>
                 </Marker>
                )
            })}
        </Map>

        <Link to="/orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#FFF"/>
        </Link>

     </div>
    );
}

export default OrphanagesMap;