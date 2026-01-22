const equipmentSelect = document.getElementById("equipmentSelect");
const energyEl = document.getElementById("energy");
const carbonEl = document.getElementById("carbon");
const costEl = document.getElementById("cost");
const ctx = document.getElementById("energyChart").getContext("2d");

let energyChart;

// Fetch list of equipment and populate select
async function loadEquipment() {
    try {
        const res = await fetch("/api/data");
        
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Check if data is an array
        if (!Array.isArray(data)) {
            console.error("Expected array but got:", data);
            equipmentSelect.innerHTML = "<option value=''>No data available</option>";
            return;
        }

        // Get unique equipment names
        const equipmentNames = [...new Set(data.map(d => d.equipment))];

        equipmentSelect.innerHTML = "<option value=''>Select Equipment</option>";
        equipmentNames.forEach(name => {
            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;
            equipmentSelect.appendChild(option);
        });

    } catch (err) {
        console.error("Failed to load equipment:", err);
        equipmentSelect.innerHTML = "<option value=''>Error loading data</option>";
    }
}

// Update metrics and chart based on selected equipment
async function updateDashboard(equipment) {
    if (!equipment) return;

    try {
        const res = await fetch("/api/data");
        
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Check if data is an array
        if (!Array.isArray(data)) {
            console.error("Expected array but got:", data);
            return;
        }

        // Filter data for selected equipment
        const filtered = data.filter(d => d.equipment === equipment);

        if (filtered.length === 0) {
            energyEl.textContent = "0.00 kWh";
            carbonEl.textContent = "0.00 kg CO₂";
            costEl.textContent = "RM 0.00";
            return;
        }

        // Update cards
        const totalEnergy = filtered.reduce((sum, d) => sum + parseFloat(d.energy || 0), 0);
        const totalCarbon = filtered.reduce((sum, d) => sum + parseFloat(d.carbon || 0), 0);
        const totalCost = filtered.reduce((sum, d) => sum + parseFloat(d.cost || 0), 0);

        energyEl.textContent = totalEnergy.toFixed(2) + " kWh";
        carbonEl.textContent = totalCarbon.toFixed(2) + " kg CO₂";
        costEl.textContent = "RM " + totalCost.toFixed(2);

        // Prepare chart data - convert timestamps to Date objects
        const labels = filtered.map(d => new Date(d.timestamp));
        const energies = filtered.map(d => parseFloat(d.energy || 0));

        // Destroy old chart if exists
        if (energyChart) energyChart.destroy();

        energyChart = new Chart(ctx, {
            type: "line",
            data: {
                labels,
                datasets: [{
                    label: "Energy (kWh)",
                    data: energies,
                    borderColor: "#3b82f6",
                    backgroundColor: "rgba(59,130,246,0.2)",
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: "time",
                        time: {
                            tooltipFormat: "HH:mm:ss",
                            unit: "minute",
                            displayFormats: {
                                minute: "HH:mm"
                            }
                        },
                        title: {
                            display: true,
                            text: "Time"
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Energy (kWh)"
                        }
                    }
                }
            }
        });

    } catch (err) {
        console.error("Failed to update dashboard:", err);
    }
}

// Event listener for equipment selection
equipmentSelect.addEventListener("change", e => {
    const equipment = e.target.value;
    updateDashboard(equipment);
});

// Initial load
loadEquipment();