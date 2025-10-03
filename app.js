// Vehicle Management System - Main Application Logic

class VehicleManagementSystem {
    constructor() {
        this.vehicles = [];
        this.loadFromDatabase();
        this.init();
    }

    init() {
        // Load existing vehicles
        this.renderVehicles();
        this.updateStatistics();
        this.renderMapMarkers();

        // Event listeners
        document.getElementById('addVehicle').addEventListener('click', () => this.addVehicle());
        document.getElementById('autoGenerateKm').addEventListener('click', () => this.autoGenerateKilometers());

        // Add some demo vehicles if database is empty
        if (this.vehicles.length === 0) {
            this.addDemoVehicles();
        }
    }

    // Database operations using localStorage
    loadFromDatabase() {
        const data = localStorage.getItem('vehicleDatabase');
        if (data) {
            this.vehicles = JSON.parse(data);
        }
    }

    saveToDatabase() {
        localStorage.setItem('vehicleDatabase', JSON.stringify(this.vehicles));
    }

    // Generate random vehicle data
    generateVehicleId() {
        return `LRY-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    generateLicensePlate() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = Math.floor(1000 + Math.random() * 9000);
        const letter1 = letters.charAt(Math.floor(Math.random() * letters.length));
        const letter2 = letters.charAt(Math.floor(Math.random() * letters.length));
        const letter3 = letters.charAt(Math.floor(Math.random() * letters.length));
        return `${letter1}${letter2}${letter3}-${numbers}`;
    }

    getRandomStatus() {
        const statuses = ['Active', 'Inactive', 'Maintenance'];
        return statuses[Math.floor(Math.random() * statuses.length)];
    }

    getRandomPosition() {
        return {
            x: Math.floor(10 + Math.random() * 80) + '%',
            y: Math.floor(10 + Math.random() * 80) + '%'
        };
    }

    // Add a new vehicle
    addVehicle() {
        const position = this.getRandomPosition();
        const vehicle = {
            id: this.generateVehicleId(),
            type: 'Lorry',
            licensePlate: this.generateLicensePlate(),
            kilometers: Math.floor(Math.random() * 50000),
            status: this.getRandomStatus(),
            position: position,
            timestamp: new Date().toISOString()
        };

        this.vehicles.push(vehicle);
        this.saveToDatabase();
        this.renderVehicles();
        this.updateStatistics();
        this.renderMapMarkers();
    }

    // Add demo vehicles for initial display
    addDemoVehicles() {
        const demoCount = 5;
        for (let i = 0; i < demoCount; i++) {
            this.addVehicle();
        }
    }

    // Auto-generate kilometers for all lorries on road (active status)
    autoGenerateKilometers() {
        let updated = 0;
        this.vehicles.forEach(vehicle => {
            if (vehicle.status === 'Active' && vehicle.type === 'Lorry') {
                // Simulate road travel - add random kilometers between 50-200 km
                const additionalKm = Math.floor(50 + Math.random() * 150);
                vehicle.kilometers += additionalKm;
                
                // Update position on map to simulate movement
                vehicle.position = this.getRandomPosition();
                updated++;
            }
        });

        if (updated > 0) {
            this.saveToDatabase();
            this.renderVehicles();
            this.updateStatistics();
            this.renderMapMarkers();
            alert(`✅ Successfully generated kilometers for ${updated} active lorry vehicle(s)!`);
        } else {
            alert('⚠️ No active lorry vehicles found to generate kilometers.');
        }
    }

    // Delete a vehicle
    deleteVehicle(id) {
        if (confirm('Are you sure you want to delete this vehicle?')) {
            this.vehicles = this.vehicles.filter(v => v.id !== id);
            this.saveToDatabase();
            this.renderVehicles();
            this.updateStatistics();
            this.renderMapMarkers();
        }
    }

    // Render vehicles in table
    renderVehicles() {
        const tbody = document.getElementById('vehicleTableBody');
        tbody.innerHTML = '';

        this.vehicles.forEach(vehicle => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="vehicle-image">🚛</div>
                </td>
                <td><strong>${vehicle.id}</strong></td>
                <td>${vehicle.type}</td>
                <td>${vehicle.licensePlate}</td>
                <td>${vehicle.kilometers.toLocaleString()} km</td>
                <td>
                    <span class="status-badge status-${vehicle.status.toLowerCase()}">
                        ${vehicle.status}
                    </span>
                </td>
                <td>
                    <button class="btn btn-danger" onclick="vms.deleteVehicle('${vehicle.id}')">
                        Delete
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Render vehicle markers on mini map
    renderMapMarkers() {
        const map = document.getElementById('miniMap');
        
        // Remove existing markers
        const existingMarkers = map.querySelectorAll('.vehicle-marker');
        existingMarkers.forEach(marker => marker.remove());

        // Add new markers
        this.vehicles.forEach(vehicle => {
            const marker = document.createElement('div');
            marker.className = `vehicle-marker marker-${vehicle.status.toLowerCase()}`;
            marker.style.left = vehicle.position.x;
            marker.style.top = vehicle.position.y;
            marker.innerHTML = '🚛';
            marker.title = `${vehicle.id} - ${vehicle.licensePlate}\n${vehicle.kilometers.toLocaleString()} km\nStatus: ${vehicle.status}`;
            
            map.appendChild(marker);
        });
    }

    // Update statistics
    updateStatistics() {
        const totalVehicles = this.vehicles.length;
        const activeVehicles = this.vehicles.filter(v => v.status === 'Active').length;
        const totalKilometers = this.vehicles.reduce((sum, v) => sum + v.kilometers, 0);
        const avgKilometers = totalVehicles > 0 ? Math.floor(totalKilometers / totalVehicles) : 0;

        document.getElementById('totalVehicles').textContent = totalVehicles;
        document.getElementById('activeVehicles').textContent = activeVehicles;
        document.getElementById('totalKilometers').textContent = totalKilometers.toLocaleString();
        document.getElementById('avgKilometers').textContent = avgKilometers.toLocaleString();
    }
}

// Initialize the application
const vms = new VehicleManagementSystem();
