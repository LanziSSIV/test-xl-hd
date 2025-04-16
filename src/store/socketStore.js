import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const useSocketStore = defineStore("socketStore", {
    state: () => ({
        socket: null,
        lastBadge: null,
    }),
    actions: {
        initializeSocket() {
            if (!this.socket) {
                console.log(1)
                this.socket = io("http://localhost:3000", {
                    path: "/frontend-socket",
                });

                this.socket.on("frontend.badge-login", (data) => {
                    console.log("ricevuto frontend.badge-login")
                    console.log("ricevuto frontend.badge-login data", data)
                    this.lastBadge = data;
                })


               /* this.socket.on("connect", () => {
                    console.log("Socket connected:", this.socket.id);
                });

                this.socket.on("disconnect", (reason) => {
                    console.warn("Socket disconnected:", reason);
                });

                this.socket.on("backend-response", (data) => {
                    console.log("Received from backend:", data);
                    // Handle global backend responses here, if needed
                });

                this.socket.on("badge-read", (data) => {
                    console.log("Badge read from backend:", data);
                    this.lastBadge = data.badgeNumber; // Store the badge number in the state
                });*/
            }
            console.log(2)

        },

        emitEvent(eventName, payload) {
            if (this.socket) {
                this.socket.emit(eventName, payload);
            } else {
                console.error("Socket not initialized");
            }
        },

        disconnectSocket() {
            if (this.socket) {
                this.socket.disconnect();
                this.socket = null;
            }
        },
    },
});