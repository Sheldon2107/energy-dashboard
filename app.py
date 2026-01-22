from flask import Flask, render_template, jsonify
import pandas as pd
import os

app = Flask(__name__)

CSV_FILE = "data/sensor_data.csv"

@app.route("/")
def dashboard():
    return render_template("index.html")

@app.route("/api/data")
def get_data():
    if os.path.exists(CSV_FILE):
        try:
            df = pd.read_csv(CSV_FILE)
            required_cols = ["timestamp", "equipment_id", "energy", "carbon", "cost"]
            if all(col in df.columns for col in required_cols):
                df = df.rename(columns={"equipment_id": "equipment"})
                data = df.to_dict(orient="records")
                return jsonify(data)
            else:
                missing = [col for col in required_cols if col not in df.columns]
                return jsonify({"error": f"CSV missing columns: {missing}"}), 500
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        return jsonify({"error": "CSV file not found"}), 404

if __name__ == "__main__":
    # Use PORT from environment variable (Render provides this)
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)