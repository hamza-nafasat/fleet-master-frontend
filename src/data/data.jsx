import ProfilePic from "../assets/images/settings/driver-profile.png";

export const drivers = [
    {
        name: "Hafidh Suleymani",
        id: 123,
        creationDate: "22-06-2024",
        driverID: 36473,
        licenseExpiry: "22-06-2029",
        assignedTruck: "BMW",
        phone: "+12 345 6789 0",
        profile: ProfilePic,
    },
    {
        name: "Hafidh Suleymani",
        id: 124,
        creationDate: "22-06-2024",
        driverID: 36473,
        licenseExpiry: "22-06-2029",
        assignedTruck: "BMW",
        phone: "+12 345 6789 0",
        profile: ProfilePic,
    },
    {
        name: "Hafidh Suleymani",
        id: 1233,
        creationDate: "22-06-2024",
        driverID: 36473,
        licenseExpiry: "22-06-2029",
        assignedTruck: "BMW",
        phone: "+12 345 6789 0",
        profile: ProfilePic,
    },
    {
        name: "Hafidh Suleymani",
        id: 1236,
        creationDate: "22-06-2024",
        driverID: 36473,
        licenseExpiry: "22-06-2029",
        assignedTruck: "BMW",
        phone: "+12 345 6789 0",
        profile: ProfilePic,
    },
];

export const trucks = [
    {
        name: "BMW",
        fleetNumber: "2342342",
        plateNumber: 36473,
        status: "Connected",
        driver: "Driver 1",
        lastUpdate: "22-06-2024 - 12:09",
        deviceId: "23524",
    },
    {
        name: "Mercedes",
        fleetNumber: "2342343",
        plateNumber: 36474,
        status: "Connected",
        driver: "Driver 2",
        lastUpdate: "22-06-2024 - 12:10",
        deviceId: "23525",
    },
    {
        name: "Volvo",
        fleetNumber: "2342344",
        plateNumber: 36475,
        status: "Disconnected",
        driver: "Driver 3",
        lastUpdate: "22-06-2024 - 12:11",
        deviceId: "23526",
    },
    {
        name: "Scania",
        fleetNumber: "2342345",
        plateNumber: 36476,
        status: "Connected",
        driver: "Driver 4",
        lastUpdate: "22-06-2024 - 12:12",
        deviceId: "23527",
    },
    {
        name: "MAN",
        fleetNumber: "2342346",
        plateNumber: 36477,
        status: "Disconnected",
        driver: "Driver 5",
        lastUpdate: "22-06-2024 - 12:13",
        deviceId: "23528",
    },
    {
        name: "DAF",
        fleetNumber: "2342347",
        plateNumber: 36478,
        status: "Connected",
        driver: "Driver 6",
        lastUpdate: "22-06-2024 - 12:14",
        deviceId: "23529",
    },
    {
        name: "Iveco",
        fleetNumber: "2342348",
        plateNumber: 36479,
        status: "Disconnected",
        driver: "Driver 7",
        lastUpdate: "22-06-2024 - 12:15",
        deviceId: "23530",
    },
    {
        name: "Kenworth",
        fleetNumber: "2342349",
        plateNumber: 36480,
        status: "Connected",
        driver: "Driver 8",
        lastUpdate: "22-06-2024 - 12:16",
        deviceId: "23531",
    },
    {
        name: "Peterbilt",
        fleetNumber: "2342350",
        plateNumber: 36481,
        status: "Disconnected",
        driver: "Driver 9",
        lastUpdate: "22-06-2024 - 12:17",
        deviceId: "23532",
    },
    {
        name: "Mack",
        fleetNumber: "2342351",
        plateNumber: 36482,
        status: "Connected",
        driver: "Driver 10",
        lastUpdate: "22-06-2024 - 12:18",
        deviceId: "23533",
    },
    {
        name: "Freightliner",
        fleetNumber: "2342352",
        plateNumber: 36483,
        status: "Disconnected",
        driver: "Driver 11",
        lastUpdate: "22-06-2024 - 12:19",
        deviceId: "23534",
    },
];

export const devices = [
    {
        _id: "23923002",
        createdAt: "05/24/2024 - 12:06",
        name: "tracker one",
        type: "gps",
        uniqueId: "23423423",
        ipAddress: "2342342423",
        assignedTo: {
            _id: "123123",
            truckName: "truck three",
        },
    },
    {
        _id: "232342234",
        createdAt: "05/24/2024 - 12:06",
        name: "tracker one",
        type: "gps",
        uniqueId: "23423423",
        ipAddress: "2342342423",
        assignedTo: {
            _id: "123123",
            truckName: "truck three",
        },
    },
    {
        _id: "234234232",
        createdAt: "05/24/2024 - 12:06",
        name: "tracker one",
        type: "gps",
        uniqueId: "23423423",
        ipAddress: "2342342423",
        assignedTo: {
            _id: "123123",
            truckName: "truck three",
        },
    },
    {
        _id: "2342342",
        createdAt: "05/24/2024 - 12:06",
        name: "tracker one",
        type: "gps",
        uniqueId: "23423423",
        ipAddress: "2342342423",
        assignedTo: {
            _id: "123123",
            truckName: "truck three",
        },
    },
    {
        _id: "23423423",
        createdAt: "05/24/2024 - 12:06",
        name: "tracker one",
        type: "gps",
        uniqueId: "23423423",
        ipAddress: "2342342423",
        assignedTo: {
            _id: "123123",
            truckName: "truck three",
        },
    },
    {
        _id: "23423234",
        createdAt: "05/24/2024 - 12:06",
        name: "tracker one",
        type: "gps",
        uniqueId: "23423423",
        ipAddress: "2342342423",
        assignedTo: {
            _id: "123123",
            truckName: "truck three",
        },
    },
];

export const users = [
    {
        firstName: "Hafidh",
        lastName: "Suleymani",
        id: 123,
        email: "test@gmail.com",
        role: "Admin",
        phone: "+12 345 6789 0",
        profile: ProfilePic,
    },
    {
        firstName: "Hafidh",
        lastName: "Suleymani",
        id: 234,
        email: "test@gmail.com",
        role: "Admin",
        phone: "+12 345 6789 0",
        profile: ProfilePic,
    },
    {
        firstName: "Hafidh",
        lastName: "Suleymani",
        id: 546,
        email: "test@gmail.com",
        role: "Admin",
        phone: "+12 345 6789 0",
        profile: ProfilePic,
    },
    {
        firstName: "Hafidh",
        lastName: "Suleymani",
        id: 678,
        email: "test@gmail.com",
        role: "Admin",
        phone: "+12 345 6789 0",
        profile: ProfilePic,
    },
];

export const roles = [
    {
        role: "Admin",
    },
    {
        role: "Editor",
    },
    {
        role: "User",
    },
    {
        role: "Viewer",
    },
];
export const regions = [
    {
        region: "Africa",
    },
    {
        region: "Asia",
    },
    {
        region: "Europe",
    },
    {
        region: "Central America",
    },
];

export const planCards = [
    {
        title: "Basic Plan",
        price: "$9.99",
        type: "monthly",
        featuresList: [
            "Access to basic content library",
            "Standard video quality",
            "Single device streaming",
            "Community support",
            "Advance Security",
        ],
        description:
            "Perfect for individuals looking to explore our content without committing to a higher tier. Enjoy standard quality streaming and a variety of basic features.",
        bg: "linear-gradient(180deg, #3AA357 0%, #257300 100%)",
        btnBg: "linear-gradient(180deg, #00FF46 0%, #0D742A 165.71%)",
    },
    {
        title: "Standard Plan",
        price: "$19.99",
        type: "yearly",
        featuresList: [
            "Access to basic content library",
            "Standard video quality",
            "Single device streaming",
            "Community support",
            "Advance Security",
        ],
        description:
            "Perfect for individuals looking to explore our content without committing to a higher tier. Enjoy standard quality streaming and a variety of basic features.",
        bg: "linear-gradient(180deg, #40C8A1 0%, #195F9D 100%)",
        btnBg: "linear-gradient(180deg, #3DC1A1 0%, #1A639D 100%)",
    },
    {
        title: "Premium Plan",
        price: "$29.99",
        type: "lifetime",
        featuresList: [
            "Access to basic content library",
            "Standard video quality",
            "Single device streaming",
            "Community support",
            "Advance Security",
        ],
        description:
            "Perfect for individuals looking to explore our content without committing to a higher tier. Enjoy standard quality streaming and a variety of basic features.",
        bg: "linear-gradient(180deg, #FFB827 0%, #EE4967 100%)",
        btnBg: "linear-gradient(180deg, #FFC24A 0%, #EF4C66 161.43%)",
    },
];
