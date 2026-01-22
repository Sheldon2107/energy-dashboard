import pandas as pd
import random
from datetime import datetime, timedelta
import os

# Make sure data folder exists
os.makedirs("data", exist_ok=True)

# Equipment list
equipment_ids = ["PUMP-01", "COMP-01", "GEN-01"]

rows = []
start_time = datetime.now() - timedelta(hours=5)  # last 5 hours

for i in range(300):  # 300 data points
    timestamp = start_time + timedelta(minutes=i)
    equipment = random.choice(equipment_ids)
    
    # Generate realistic values
    energy = round(random.uniform(50, 300), 2)           # kWh
    carbon = round(energy * random.uniform(0.2, 0.4), 2) # kg CO2
    cost = round(energy * 0.5, 2)                        # RM

    rows.append([
        timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        equipment,
        energy,
        carbon,
        cost
    ])

# Create DataFrame
df = pd.DataFrame(rows, columns=[
    "timestamp", "equipment_id", "energy", "carbon", "cost"
])

# Save to CSV
df.to_csv("data/sensor_data.csv", index=False)
print("✅ Sensor data generated successfully.")