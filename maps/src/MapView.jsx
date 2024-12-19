import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import './style.css';
import 'leaflet/dist/leaflet.css';

// קומפוננטה להצגת מפה עם מיקום נתון
const MapView = ({ latitude, longitude }) => {
    // יצירת מערך של קואורדינטות למיקום הנוכחי
    const location = [latitude, longitude];

    // קומפוננטה פנימית לעדכון התצוגה של המפה כאשר המיקום משתנה
    const SetViewOnChange = ({ lat, lon }) => {
        const map = useMap(); // קבלת אובייקט המפה באמצעות useMap
        map.setView([lat, lon], map.getZoom()); // עדכון התצוגה למיקום החדש ושמירת רמת הזום הנוכחית
        return null; // לא מציגה שום דבר
    };

    return (
        <div id='map-container'> {/* מכולה עבור המפה */}
            <MapContainer center={location} zoom={13} style={{ height: '500px', width: '100%' }}>
                {/* שכבת האריחים של המפה מבוססת OpenStreetMap */}
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* הצגת סמן (Marker) במיקום הנוכחי */}
                <Marker position={location}>
                </Marker>
                {/* קריאה לקומפוננטה לעדכון התצוגה כאשר הקואורדינטות משתנות */}
                <SetViewOnChange lat={latitude} lon={longitude} />
            </MapContainer>
        </div>
    );
};

export default MapView;
