export const BIKE_GRAPH = {
    "nodes": [
        {
            "id": "279",
            "labels": [
                "Bike"
            ],
            "properties": {
                "weight": 10
            }
        },
        {
            "id": "280",
            "labels": [
                "Wheel"
            ],
            "properties": {
                "spokes": 3
            }
        },
        {
            "id": "281",
            "labels": [
                "Wheel"
            ],
            "properties": {
                "spokes": 32
            }
        }
    ],
    "relationships": [
        {
            "id": "215",
            "type": "HAS",
            "startNode": "279",
            "endNode": "280",
            "properties": {
                "position": 1
            }
        },
        {
            "id": "216",
            "type": "HAS",
            "startNode": "279",
            "endNode": "281",
            "properties": {
                "position": 2
            }
        }
    ]
};
