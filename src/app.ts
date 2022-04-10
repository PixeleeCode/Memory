import Timer from "./lib/Timer.js";
import Memory from "./lib/Memory.js";

// Initialisation du Timer
const timer = new Timer("#timer");

// Initialisation du Memory
new Memory(20, timer);
