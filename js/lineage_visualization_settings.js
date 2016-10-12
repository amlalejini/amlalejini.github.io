var zoom_rate = 0.05;
var default_treatment = "baseline-unrestricted";
var lineage_vis_data_fpath = "data/ss200_final_dominant_detailed.csv";
var lineage_vis_settings =
{
  "control-unrestricted": {
    "hr_name": "Control (Constant Environment)",
    "sliced_ranges": [[0, 1000], [47500, 52500], [95000, 100000]],
    "full_ranges": [[0, 100000]],
    "environment_cycle_length": 100000,
    "maximum_update": 100000,
    "environment_codes": ["nandpnotp"],
    "update_label_interval": 500,
  },
  "baseline-unrestricted": {
    "hr_name": "Baseline Changing Environment",
    "sliced_ranges": [[0, 1000], [47500, 52500], [95000, 100000]],
    "full_ranges": [[0, 100000]],
    "environment_cycle_length": 100,
    "maximum_update": 100000,
    "environment_codes": ["nandpnotm", "nandmnotp"],
    "update_label_interval": 500,
  },
  "high-mut-unrestricted": {
    "hr_name": "High Mutation Rate Changing Environment",
    "sliced_ranges": [[0, 1000], [47500, 52500], [95000, 100000]],
    "full_ranges": [[0, 100000]],
    "environment_cycle_length": 100,
    "maximum_update": 100000,
    "environment_codes": ["nandpnotm", "nandmnotp"],
    "update_label_interval": 500,
  },
  "low-mut-unrestricted": {
    "hr_name": "Low Mutation Rate Changing Environment",
    "sliced_ranges": [[5500, 7000], [25000, 27000], [47500, 52500], [95000, 100000]],
    "full_ranges": [[0, 100000]],
    "environment_cycle_length": 100,
    "maximum_update": 100000,
    "environment_codes": ["nandpnotm", "nandmnotp"],
    "update_label_interval": 500,
  },
  "cycle-50-unrestricted": {
    "hr_name": "Rapidly Changing Environment",
    "sliced_ranges": [[0, 1000], [47500, 52500], [95000, 100000]],
    "full_ranges": [[0, 100000]],
    "environment_cycle_length": 50,
    "maximum_update": 100000,
    "environment_codes": ["nandpnotm", "nandmnotp"],
    "update_label_interval": 500,
  },
  "cycle-200-unrestricted": {
    "hr_name": "Slowly Changing Environment",
    "sliced_ranges": [[0, 1000], [47500, 52500], [95000, 100000]],
    "full_ranges": [[0, 100000]],
    "environment_cycle_length": 200,
    "maximum_update": 100000,
    "environment_codes": ["nandpnotm", "nandmnotp"],
    "update_label_interval": 500,
  },
};


lookup_table = {
  "nandpnotp": "CONTROL-ENV",
  "nandpnotm": "ENV-NAND",
  "nandmnotp": "ENV-NOT",
  "tasks_performed": {
    "0000": {"ENV-NAND": "NONE", "ENV-NOT": "NONE"},
    "0001": {"ENV-NAND": "NONE", "ENV-NOT": "NOT"},
    "0010": {"ENV-NAND": "NONE", "ENV-NOT": "NAND"},
    "0011": {"ENV-NAND": "NONE", "ENV-NOT": "BOTH"},
    "0100": {"ENV-NAND": "NOT", "ENV-NOT": "NONE"},
    "0101": {"ENV-NAND": "NOT", "ENV-NOT": "NOT"},
    "0110": {"ENV-NAND": "NOT", "ENV-NOT": "NAND"},
    "0111": {"ENV-NAND": "NOT", "ENV-NOT": "BOTH"},
    "1000": {"ENV-NAND": "NAND", "ENV-NOT": "NONE"},
    "1001": {"ENV-NAND": "NAND", "ENV-NOT": "NOT"},
    "1010": {"ENV-NAND": "NAND", "ENV-NOT": "NAND"},
    "1011": {"ENV-NAND": "NAND", "ENV-NOT": "BOTH"},
    "1100": {"ENV-NAND": "BOTH", "ENV-NOT": "NONE"},
    "1101": {"ENV-NAND": "BOTH", "ENV-NOT": "NOT"},
    "1110": {"ENV-NAND": "BOTH", "ENV-NOT": "NAND"},
    "1111": {"ENV-NAND": "BOTH", "ENV-NOT": "BOTH"}
  }
};
