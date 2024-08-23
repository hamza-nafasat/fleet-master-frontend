import { loadStripe } from "@stripe/stripe-js";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
    withCredentials: true,
});

const socketEvent = {
    SENSORS_DATA: "SENSORS_DATA",
    WANT_TRACKING_DATA: "WANT_TRACKING_DATA",
    GEOFENCE_TRUCKS_DATA: "GEOFENCE_TRUCKS_DATA",
};

async function init() {
    return await loadStripe(
        "pk_test_51OO6UYFThvHN5fHLhkVUtxgdHrlipp8tQryFJO33Z1APIg0vykNvfhT0NfbRqwwA6MoWU7GzuqSjzvAhmqfHkZEn00VDkiJJ8p"
    );
}
export const stripeLoad = init();
export { socket, socketEvent };
