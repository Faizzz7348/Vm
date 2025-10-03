# Vehicle Management System (VM)

A comprehensive web-based vehicle management system for tracking and managing a fleet of lorries.

## Features

### 1. **Vehicle Table with Images** 🚛
- Display all vehicles in a clean, organized table
- Each vehicle has an emoji image representation
- Shows vehicle ID, type, license plate, kilometers, and status
- Interactive delete functionality for each vehicle

### 2. **Mini Map** 🗺️
- Visual representation of vehicle locations
- Color-coded markers based on vehicle status:
  - 🟢 Green: Active vehicles
  - 🔴 Red: Inactive vehicles
  - 🟡 Yellow: Vehicles under maintenance
- Interactive markers with hover information
- Simulated road network overlay

### 3. **Auto-Generate Kilometers** 📊
- Automatically calculate and add kilometers for active lorry vehicles
- Simulates road travel with random kilometer additions (50-200 km per generation)
- Updates vehicle positions on the map
- Only affects vehicles with "Active" status

### 4. **Database Storage** 💾
- Client-side database using localStorage
- Persistent storage across browser sessions
- Automatic save on all data changes
- JSON-based data structure

## How to Use

1. **Open the Application**
   - Simply open `index.html` in a web browser
   - The system will load with 5 demo vehicles automatically

2. **Add a Vehicle**
   - Click the "Add Lorry" button
   - A new lorry will be created with random data
   - Vehicle appears in both the table and map

3. **Auto-Generate Kilometers**
   - Click "Auto-Generate Kilometers" button
   - System adds kilometers to all active lorries
   - Simulates road travel and updates positions

4. **Delete a Vehicle**
   - Click the "Delete" button next to any vehicle
   - Confirm the deletion
   - Vehicle is removed from database and display

5. **View Statistics**
   - Total Vehicles: Count of all vehicles in system
   - Active Vehicles: Count of vehicles currently active
   - Total Kilometers: Sum of all vehicle kilometers
   - Average Km/Vehicle: Average kilometers per vehicle

## Technical Details

### Files
- `index.html` - Main application interface
- `styles.css` - Styling and responsive design
- `app.js` - Application logic and data management

### Data Structure
Each vehicle contains:
```javascript
{
    id: "LRY-XXXX",           // Unique identifier
    type: "Lorry",            // Vehicle type
    licensePlate: "ABC-1234", // Registration number
    kilometers: 12345,        // Total kilometers driven
    status: "Active",         // Active, Inactive, or Maintenance
    position: {x: "50%", y: "30%"}, // Map position
    timestamp: "ISO date"     // Creation timestamp
}
```

### Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires localStorage support
- Responsive design for mobile and desktop

## Installation

No installation required! Just:
1. Clone or download the repository
2. Open `index.html` in your web browser
3. Start managing your vehicle fleet

## Future Enhancements
- Real-time GPS tracking integration
- Export data to CSV/PDF
- Advanced filtering and search
- Multi-user support with authentication
- Backend API integration
- Route optimization
- Fuel consumption tracking

## License
MIT License - Feel free to use and modify as needed.