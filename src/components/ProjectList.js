import Code from "./codes/code";

const ProjectList = {
  "Machine Learning": [
    {
      name: "Fuel Efficiency Predictor",
      image: "/assets/fuel-efficiency.png",
      tags: ["Python", "Pandas", "Matplotlib", "scikit-learn", "Streamlit"],
      files: [
        {
          name: "README.md",
          type: "info",
          content:
            "Built multiple machine learning models to predict vehicle fuel consumption using feature engineering and regression techniques. Deployed the most accurate model as a Streamlit app for real-time fuel efficiency predictions."
        },
        {
          name: "predictor.py",
          type: "code",
          language: "python",
          content:
            "import streamlit as st\nimport pickle\nimport numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# Load the trained model\nmodel_path = 'fuel_consumption_model.pkl'\nwith open(model_path, 'rb') as file:\n  model = pickle.load(file)\n\n# Define the unique values for one-hot encoding\nfuel_categories = ['D (Diesel)', 'E (E85 Ethanol)', 'N (Natural Gas)', 'X (Regular Petrol)', 'Z (Premium Petrol)']\ntransmission_categories = {\n  'A10': 'Automatic (10 gears)',\n  'A3': 'Automatic (3 gears)',\n  'A4': 'Automatic (4 gears)',\n  'A5': 'Automatic (5 gears)',\n  'A6': 'Automatic (6 gears)',\n  'A7': 'Automatic (7 gears)',\n  'A8': 'Automatic (8 gears)',\n  'A9': 'Automatic (9 gears)',\n  'AM5': 'Auto-manual (5 gears)',\n  'AM6': 'Auto-manual (6 gears)',\n  'AM7': 'Auto-manual (7 gears)',\n  'AM8': 'Auto-manual (8 gears)',\n  'AM9': 'Auto-manual (9 gears)',\n  'AS10': 'Automatic with Sport Mode (10 gears)',\n  'AS4': 'Automatic with Sport Mode (4 gears)',\n  'AS5': 'Automatic with Sport Mode (5 gears)',\n  'AS6': 'Automatic with Sport Mode (6 gears)',\n  'AS7': 'Automatic with Sport Mode (7 gears)',\n  'AS8': 'Automatic with Sport Mode (8 gears)',\n  'AS9': 'Automatic with Sport Mode (9 gears)',\n  'AV1': 'Continuously Variable (1 gear)',\n  'AV10': 'Continuously Variable (10 gears)',\n  'AV6': 'Continuously Variable (6 gears)',\n  'AV7': 'Continuously Variable (7 gears)',\n  'AV8': 'Continuously Variable (8 gears)',\n  'M4': 'Manual (4 gears)',\n  'M5': 'Manual (5 gears)',\n  'M6': 'Manual (6 gears)',\n  'M7': 'Manual (7 gears)'\n}\n\n\nvehicle_class_categories = [\n  'COMPACT', 'FULL-SIZE', 'MID-SIZE', 'MINICOMPACT', 'MINIVAN', \n  'PICKUPTRUCK-SMALL', 'PICKUPTRUCK-STANDARD', 'SPECIALPURPOSEVEHICLE',\n  'STATIONWAGON-MID-SIZE', 'STATIONWAGON-SMALL', 'SUBCOMPACT', 'SUV', \n  'SUV-SMALL', 'SUV-STANDARD', 'TWO-SEATER', 'VAN-CARGO', 'VAN-PASSENGER'\n]\n\n# Function to create a one-hot encoded input array for the model\ndef create_input_array(engine_size, cylinders, fuel, transmission, vehicle_class):\n  input_array = np.zeros(53)\n  input_array[0] = engine_size\n  input_array[1] = cylinders\n  \n  if fuel in fuel_categories:\n    fuel_index = fuel_categories.index(fuel) + 2\n    input_array[fuel_index] = 1\n\n  if transmission in transmission_categories:\n    trans_index = transmission_categories.index(transmission) + 7\n    input_array[trans_index] = 1\n  \n  if vehicle_class in vehicle_class_categories:\n    class_index = vehicle_class_categories.index(vehicle_class) + 36\n    input_array[class_index] = 1\n  \n  return input_array\n\n# Define the main function for the Streamlit app\ndef main():\n  st.set_page_config(layout=\"wide\", page_title=\"Fuel Consumption Predictor\")\n  \n  st.markdown(\n    \"\"\"\n    <style>\n      .block-container {\n        padding-top: 2.5rem;  /* Set top padding to zero */\n      }\n    </style>\n    \"\"\",\n    unsafe_allow_html=True\n  )\n\n  st.title(\"Fuel Consumption Predictor\")\n  \n  # Create two columns for layout\n  col1, col2 = st.columns([2, 3])\n\n  with col1:\n    st.markdown(\"<h3 class='subtitle'>Enter Vehicle Details</h3>\", unsafe_allow_html=True)\n    engine_size = st.slider(\"Engine Size (L)\", min_value=1.0, max_value=10.0, step=0.1, value=1.3)\n    cylinders = st.slider(\"Number of Cylinders\", min_value=2, max_value=16, step=1, value=4)\n    fuel = st.selectbox(\"Fuel Type\", options=fuel_categories, index=fuel_categories.index('X (Regular Petrol)'))\n    transmission_list = list(transmission_categories.values())  # Convert dictionary values to a list\n    transmission = st.selectbox(\"Transmission\", options=transmission_list, index=transmission_list.index('Automatic (5 gears)'))\n    vehicle_class = st.selectbox(\"Vehicle Class\", options=vehicle_class_categories, index=vehicle_class_categories.index('SUV'))\n\n    \n    prediction = None  # Initialize prediction variable\n\n    if st.button(\"Predict\"):\n      input_array = create_input_array(engine_size, cylinders, fuel, transmission, vehicle_class)\n      prediction = model.predict([input_array])[0]\n      st.success(f\"The predicted fuel consumption is **{prediction:.2f} L/100 km** or **{100/prediction:.2f} km/L**\")\n    \n    \n\n  # Load CSV data\n  df = pd.read_csv('Fuel_Consumption_2000-2022.csv')\n\n  with col2:\n      \n    st.markdown(\"<h3 class='subtitle'>Engine Size vs Fuel Consumption</h3>\", unsafe_allow_html=True)\n\n    # Create a professional-looking scatter plot using Seaborn\n    fig, ax = plt.subplots(figsize=(10, 6))\n    sns.scatterplot(data=df, x='ENGINE SIZE', y='COMB (L/100 km)', ax=ax, color='#3498db', s=60, label=\"Existing data\")\n    ax.set_xlabel('Engine Size (L)', fontsize=12)\n    ax.set_ylabel('Fuel Consumption (L/100km)', fontsize=12)\n    ax.legend()\n   \n    # Plot only if prediction exists\n    if prediction is not None:\n      ax.plot(engine_size, prediction, 'ro', label='Your Car', markersize=7)\n      ax.legend()\n    \n    st.pyplot(fig)\n\n  st.write(\"---\")\n  st.markdown(\"## Dataset Overview\")\n  st.markdown(\"\"\"\n  The dataset utilized for training the fuel consumption prediction model contains features that help us understand vehicle performance and emissions. Below is a detailed description of each attribute as outlined below:\n\n  | **Attribute**                        | **Description**                                                            |\n  |--------------------------------------|---------------------------------------------------------------------------|\n  | **YEAR**                             | The year the car model was manufactured.                                  |\n  | **MAKE**                             | The manufacturer of the vehicle.                                         |\n  | **MODEL**                            | The specific name or designation of the vehicle model.                   |\n  | **VEHICLE CLASS**                    | The classification of the vehicle type (e.g., Compact, SUV, Sedan, etc.).|\n  | **ENGINE SIZE**                      | The size of the engine, measured in liters.                             |\n  | **CYLINDERS**                        | The total number of cylinders in the engine.                             |\n  | **TRANSMISSION**                     | The type of transmission (e.g., Automatic, Manual).                     |\n  | **FUEL CONSUMPTION (L/100 km)**      | The amount of fuel consumed in urban driving conditions, measured in liters per 100 kilometers. |\n  | **HWY FUEL CONSUMPTION (L/100 km)**  | The amount of fuel consumed on highways, measured in liters per 100 kilometers. |\n  | **COMBINED FUEL CONSUMPTION (L/100 km)** | The overall fuel consumption calculated from both urban and highway driving, measured in liters per 100 kilometers. |\n  | **COMBINED FUEL CONSUMPTION (mpg)** | The overall fuel efficiency, measured in miles per gallon.               |\n  | **EMISSIONS (g/km)**                | The amount of carbon dioxide (CO2) emissions produced, measured in grams per kilometer. |\n  \"\"\")\n\n  st.markdown(\"## Model Details\")\n  st.markdown(\"\"\"\n  The **Fuel Consumption Prediction Model** employs several features to predict fuel efficiency. Key highlights include:\n\n  - **Engine Size**: Larger engine sizes generally correlate with higher fuel consumption.\n  - **Cylinders**: The number of cylinders can influence both performance and efficiency.\n  - **Fuel Type and Transmission**: Different fuel types and transmission modes significantly affect fuel efficiency.\n  \n  This model utilizes advanced algorithms to ensure accurate predictions, with the **XGBoost** algorithm demonstrating optimal performance in terms of accuracy and reliability.\n  \"\"\")\n\n\n# Run the app\nif __name__ == \"__main__\":\n  main()\n"
        }
      ],
      github: "https://github.com/hamzajamil23/fuel-consumption-predictor",
      dataset: "",
      medium: "",
      tableau: ""
    }
  ],
  "Data Visualization": [
    {
      name: "British Airways Review Dashboard",
      image: "/assets/ba-dashboard.png",
      tags: ["Tableau", "LOD", "Customer Sentiment Analysis"],
      files: [
        {
          name: "Dashboard",
          type: "info",
          content:
            "Developed an interactive Tableau dashboard to analyze British Airways customer review data using LOD expressions, filters, and sentiment metrics. Dashboard enables dynamic exploration of satisfaction trends by service categories."
        }
      ],
      github: "",
      dataset: "",
      medium: "",
      tableau: "https://public.tableau.com/app/profile/hamza.jamil5577/viz/BritishairwaysDashboard/Dashboard1"
    }
  ],
  "Excel Job Simulation": [
    {
      name: "JPMorgan Chase Excel Simulation",
      image: "/assets/jpmorgan.png",
      tags: ["Excel", "Data Visualization", "Dashboards", "Pivot Tables", "Power Query", "Macros", "VBA"],
      files: [
        {
          name: "Certificate",
          type: "info",
          content:
            "Completed a virtual job simulation for JPMorgan Chase using Excel. Performed data cleaning, pivot analysis, and Power Query transformations. Automated reports using VBA macros and created interactive dashboards."
        }
      ],
      github: "",
      dataset: "",
      medium: "",
      tableau: ""
    }
  ]
};

export default ProjectList;