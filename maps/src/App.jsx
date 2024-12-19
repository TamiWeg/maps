import { useState, useEffect } from 'react'; 
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg'; 
import './App.css'; 
import SearchForm from './SearchForm'; 
import MapView from './MapView'; 

// הקומפוננטה הראשית של האפליקציה
function App() {
  
  const [coordinates, setCoordinates] = useState({ lat: 32.0853, lon: 34.7818 }); // סטייט לשמירת הקואורדינטות (ברירת מחדל: תל אביב)

  // שימוש ב-useEffect כדי לקבל את מיקום המשתמש בעת טעינת האפליקציה
  useEffect(() => {
    if (navigator.geolocation) { // בדיקה אם הדפדפן תומך ב-Geolocation
      navigator.geolocation.getCurrentPosition(
        (position) => { // במידה והמיקום התקבל בהצלחה
          setCoordinates({
            lat: position.coords.latitude, // עדכון קו רוחב
            lon: position.coords.longitude, // עדכון קו אורך
          });
        },
        (error) => { // טיפול במקרה של שגיאה בקבלת מיקום
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.'); // הודעת שגיאה אם Geolocation לא נתמך
    }
  }, []); // [] מבטיח שהאפקט יבוצע רק פעם אחת, בזמן הרינדור הראשון

  return (
    <div> 
      <h2> Search for a co-working office</h2> 
      <SearchForm setCoordinates={setCoordinates} /> {/* קומפוננטת טופס החיפוש להעברת קואורדינטות */}
      <MapView latitude={coordinates.lat} longitude={coordinates.lon} /> {/* קומפוננטת מפה להצגת המיקום הנוכחי */}
    </div>
  );
}

export default App;
