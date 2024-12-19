import { useState } from 'react'; // ייבוא הוק לשמירת סטייט

import './style.css'; // ייבוא קובץ ה-CSS לעיצוב

// קומפוננטה לטופס חיפוש עם אפשרות לבחור כתובת ולהגדיר קואורדינטות
const SearchForm = ({ setCoordinates }) => {

    const [query, setQuery] = useState(''); // סטייט למעקב אחר הערך שהמשתמש מקליד בשדה החיפוש
    const [suggestions, setSuggestions] = useState([]); // סטייט לאחסון כתובות מוצעות לחיפוש

    // פונקציה לטיפול בשינוי הקלט בשדה החיפוש
    const inputChange = (e) => {
        const value = e.target.value; // ערך הטקסט שהמשתמש הקליד
        setQuery(value); // עדכון הסטייט של שדה החיפוש
        if (value.length > 2) // ביצוע חיפוש רק אם הטקסט מכיל יותר משני תווים
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=5`) // בקשת נתונים מממשק OpenStreetMap
                .then((response) => {
                    if (!response.ok) // בדיקה אם התגובה מהשרת תקינה
                        throw new Error('Network response was not ok'); // זריקת שגיאה אם יש בעיה בתגובה
                    return response.json(); // המרת התגובה לפורמט JSON
                })
                .then((data) => {
                    setSuggestions(data); // עדכון הסטייט עם התוצאות שהתקבלו
                })
                .catch((error) => {
                    console.error('Fetch error:', error); // הדפסת שגיאה אם הבקשה נכשלה
                });
    }

    // פונקציה לטיפול בבחירת כתובת מהרשימה
    const addressSelect = (address) => {
        setQuery(address.display_name); // עדכון שדה החיפוש עם השם של הכתובת שנבחרה
        setCoordinates({
            lat: parseFloat(address.lat), // הגדרת קו רוחב
            lon: parseFloat(address.lon), // הגדרת קו אורך
        });
    }

    return (
        <form> {/* טופס עם שדות למילוי מידע על משתמש */}
            <label>
                user name: {/* שדה להזנת שם המשתמש */}
                <input type="text" name="username" />
            </label>
            <label>
                address for search: {/* שדה חיפוש כתובת */}
                <input type="text" placeholder="enter address to search" value={query} onChange={inputChange} />
            </label>
            <ul> {/* רשימת כתובות מוצעות */}
                {suggestions.map((address) => (
                    <li key={address.display_name} onClick={() => addressSelect(address)}> {/* לחיצה על פריט תבחר את הכתובת */}
                        {address.display_name}
                    </li>
                ))}
            </ul>
            <label>
                phone: {/* שדה להזנת מספר טלפון */}
                <input type="text" name="phone" />
            </label>
            <label>
                email address: {/* שדה להזנת כתובת אימייל */}
                <input type="email" name="email" />
            </label>
            <label>
                internet connection needed: {/* צ'קבוקס לציון אם נדרשת חיבור לאינטרנט */}
                <input type="checkbox" name="Internet" />
            </label>
            <label>
                kitchen needed: {/* צ'קבוקס לציון אם נדרשת מטבח */}
                <input type="checkbox" name="kitchen" />
            </label>
            <label>
                coffeeMachine needed: {/* צ'קבוקס לציון אם נדרשת מכונת קפה */}
                <input type="checkbox" name="coffeeMachinecoffeeMachine" />
            </label>
            <label>
                number of rooms: {/* שדה להזנת מספר החדרים הנדרש */}
                <input type="number" name="rooms" />
            </label>
            <label>
                distance: {/* שדה להזנת מרחק */}
                <input type="text" name="distance" />
            </label>
        </form>
    );
}

export default SearchForm; // ייצוא הקומפוננטה לשימוש בקבצים אחרים
